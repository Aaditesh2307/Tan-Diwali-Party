'use strict';
const STORAGE_KEY = 'diwali-showdown-challenge-v2';
const THEME_KEY = 'diwali-showdown-theme';
const DEFAULT_NAMES = ['Team Patakha', 'Team Phuljhadi'];
const allQuestions = CATEGORIES.flatMap(c => c.questions);
const byId = new Map(allQuestions.map(q => [q.id,q]));
const $ = id => document.getElementById(id);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = value => Number(value).toLocaleString('en-IN');
const newState = (names = DEFAULT_NAMES) => ({version:2, questionSet:QUESTION_SET, names:[...names], turn:0, history:[], active:null, revealed:false});
function validState(s) {
  return s && s.version === 2 && s.questionSet === QUESTION_SET && Array.isArray(s.names) && s.names.length === 2 && s.names.every(n => typeof n === 'string' && n.trim() && n.length <= 26) && [0,1].includes(s.turn) && Array.isArray(s.history) && s.history.length <= 30 && new Set(s.history.map(h=>h.id)).size === s.history.length && s.history.every(h=>byId.has(h.id) && [0,1].includes(h.team) && typeof h.correct === 'boolean' && [0,1].includes(h.previousTurn)) && (s.active === null || (byId.has(s.active) && !s.history.some(h=>h.id === s.active))) && typeof s.revealed === 'boolean';
}
let state = newState();
let storageAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if(validState(saved)) state = saved;
  else {
    // New questions start a fresh board; retain names from the earlier question set.
    const previous = saved || JSON.parse(localStorage.getItem('diwali-showdown-v1'));
    if (Array.isArray(previous?.names) && previous.names.length === 2 && previous.names.every(n => typeof n === 'string' && n.trim() && n.length <= 26)) state = newState(previous.names);
  }
} catch { /* A fresh game also recovers from malformed browser data. */ }
let seconds = 30, interval = null, deadline = null, toastTimeout;
let lastOpenedTile = null;
const icons = {
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6h14M5 18h14"/>',
  diya:'<path d="M3 13h18c-1 6-4 8-9 8s-8-2-9-8Z"/><path d="M12 12c-5-4-3-7 1-11-1 5 5 7-1 11Z"/><path d="M7 16c3 2 7 2 10 0"/>',
  medal:'<circle cx="12" cy="14" r="7"/><path d="m5 2 4 6m10-6-4 6M9 2l3 5 3-5M12 10l1.2 2.5 2.8.4-2 1.9.5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-1.9 2.8-.4Z"/>',
  spark:'<path d="m12 2 2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6ZM20 2v4m-2-2h4M3 19v3m-1.5-1.5h3"/>',
  quote:'<path d="M10 5H4v8h4c0 3-1 4-4 6m16-14h-6v8h4c0 3-1 4-4 6"/>'
};
function scores() {return state.history.reduce((s,h)=>{if(h.correct) s[h.team]+=byId.get(h.id).value;return s;},[0,0]);}
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); storageAvailable=true; }
  catch { storageAvailable=false; }
  $('save-status').textContent = storageAvailable ? 'Progress saved on this device' : 'Progress is not saved in this browser';
}
function notify(message) {clearTimeout(toastTimeout);$('toast').textContent=message;$('toast').classList.add('visible');toastTimeout=setTimeout(()=>$('toast').classList.remove('visible'),3500);}
function render() {
  const totals = scores(), completed = new Map(state.history.map(h=>[h.id,h]));
  for(let i=0;i<2;i++) {
    $(`team-name-${i}`).textContent=state.names[i];$(`score-${i}`).textContent=money(totals[i]);
    $(`team-card-${i}`).classList.toggle('is-active',state.turn===i && state.history.length<30);
    $(`turn-tag-${i}`).hidden=state.turn!==i || state.history.length===30;
    const attempts=state.history.filter(h=>h.team===i), wins=attempts.filter(h=>h.correct).length;
    $(`team-stat-${i}`).textContent=attempts.length ? `${wins} correct · ${attempts.length} played` : i===0 ? 'Ready to make some noise' : 'A little spark goes a long way';
  }
  $('done-count').textContent=state.history.length;
  $('board-title').replaceChildren();
  if(state.history.length===30) {const b=document.createElement('button');b.className='text-btn';b.style.fontSize='13px';b.textContent='All played. See the final results ↗';b.onclick=showResults;$('board-title').append(b);}
  else {const s=document.createElement('span');s.textContent=state.names[state.turn];$('board-title').append(s,', pick your prize.');}
  $('undo-btn').disabled=!state.history.length;
  $('board-grid').innerHTML=CATEGORIES.map(c=>`<div class="category"><div class="category-heading"><span class="category-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${icons[c.icon]}</svg></span><h3>${c.name}</h3><p>${c.subtitle}</p></div>${c.questions.map(q=>{
    const h=completed.get(q.id);
    return h ? `<button class="prize-tile done ${h.correct?'correct':''} team-${h.team}" disabled aria-label="${c.name}, ${q.value} rupees, completed by ${escapeHTML(state.names[h.team])}, ${h.correct?'correct':'wrong'}"><span class="done-amount">${h.correct?'✓':'×'} <span class="rupee">₹</span>${money(q.value)}</span><span class="done-label">${h.correct?escapeHTML(state.names[h.team]):'NO POINTS · PLAYED'}</span></button>` : `<button class="prize-tile" data-question="${q.id}" aria-label="${c.name}, ${q.value} rupees"><span class="rupee">₹</span>${money(q.value)}<span class="tile-arrow" aria-hidden="true">↗</span></button>`;
  }).join('')}</div>`).join('');
}
function openQuestion(id) {
  if(state.active || !byId.has(id) || state.history.some(h=>h.id===id)) return;
  lastOpenedTile=id;state.active=id;state.revealed=false;seconds=30;save();renderQuestion();$('question-dialog').showModal();
}
function renderQuestion() {
  const q=byId.get(state.active);if(!q)return;
  const category=CATEGORIES.find(c=>c.id===q.category);
  $('question-content').innerHTML=`<div class="question-inner"><div class="dialog-top"><span class="eyebrow">THE SPOTLIGHT IS YOURS</span><button class="close-btn" id="close-question" aria-label="Return question to board">×</button></div><div class="question-meta"><span class="prize-pill">₹${money(q.value)}</span><span>for ${escapeHTML(state.names[state.turn])}</span><span class="question-category">${category.name}</span></div><h2 class="question-text" id="question-title">${escapeHTML(q.q).replace(/\n/g,'<br>')}</h2>${state.revealed?`<div class="answer-box"><p class="eyebrow">THE ANSWER IS</p><h3>${escapeHTML(q.a)}</h3><p>${escapeHTML(q.note)}</p></div><p class="host-reminder">Host, you make the call. Correct adds ₹${money(q.value)}; wrong adds ₹0.</p>`:'<p class="answer-hint">Say your answer out loud. Host, reveal when everyone is ready.</p>'}</div><div class="question-footer"><div class="timer-controls"><div><span class="timer-label">OPTIONAL TIMER</span><span class="timer" id="timer" role="timer" aria-label="Seconds remaining">${seconds===0?'0:00':`0:${String(seconds).padStart(2,'0')}`}</span></div><button class="timer-btn" id="timer-toggle" aria-label="${interval?'Pause':'Start'} timer" title="${interval?'Pause':'Start'} timer">${interval?'Ⅱ':'▶'}</button><button class="timer-btn" id="timer-reset" aria-label="Reset timer" title="Reset timer">↶</button></div>${state.revealed?'<div class="verdict-actions"><button class="wrong-btn" id="wrong-btn">× Wrong</button><button class="correct-btn" id="correct-btn">✓ Correct</button></div>':'<button class="primary-btn" id="reveal-btn">Reveal answer <span>↗</span></button>'}</div>`;
  $('question-dialog').setAttribute('aria-labelledby','question-title');
  $('close-question').onclick=cancelQuestion;
  $('timer-toggle').onclick=toggleTimer;$('timer-reset').onclick=()=>{stopTimer();seconds=30;updateTimer();};
  if(state.revealed){$('wrong-btn').onclick=()=>judge(false);$('correct-btn').onclick=()=>judge(true);}
  else $('reveal-btn').onclick=()=>{stopTimer();state.revealed=true;save();renderQuestion();$('correct-btn').focus();};
  updateTimer();
}
function stopTimer(){if(interval)clearInterval(interval);interval=null;deadline=null;}
function updateTimer(){const t=$('timer');if(t){t.textContent=`0:${String(seconds).padStart(2,'0')}`;t.classList.toggle('is-low',seconds<=10);}const b=$('timer-toggle');if(b){b.textContent=interval?'Ⅱ':'▶';b.setAttribute('aria-label',`${interval?'Pause':'Start'} timer`);b.title=`${interval?'Pause':'Start'} timer`;}}
function toggleTimer(){if(interval){seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));stopTimer();updateTimer();return;}if(seconds===0)seconds=30;deadline=Date.now()+seconds*1000;interval=setInterval(()=>{seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));if(seconds===0){stopTimer();notify('Time’s up! Host, reveal the answer when you’re ready.');}updateTimer();},200);updateTimer();}
function closeQuestionDialog(){stopTimer();$('question-dialog').close();state.active=null;state.revealed=false;save();if(lastOpenedTile)document.querySelector(`[data-question="${lastOpenedTile}"]`)?.focus();}
function cancelQuestion(){const wasRevealed=state.revealed;if(wasRevealed){notify('The answer is revealed. Mark Correct or Wrong to complete this question.');return;}closeQuestionDialog();notify('Question returned to the board. Same team’s turn.');}
function judge(correct) {
  if(!state.active || !state.revealed)return;
  const q=byId.get(state.active), team=state.turn;
  if(state.history.some(h=>h.id===q.id))return;
  state.history.push({id:q.id,team,correct,previousTurn:state.turn});state.turn=1-state.turn;
  closeQuestionDialog();render();
  notify(correct?`${state.names[team]} earns ₹${money(q.value)}!`:`No points this time. ${state.names[state.turn]} picks next.`);
  if(state.history.length===30)showResults();
}
function undo(){if(!state.history.length || state.active)return;const last=state.history.pop();state.turn=last.previousTurn;save();render();notify('Last turn undone. The question is available again.');}
function showResults(){const totals=scores();const tie=totals[0]===totals[1],winner=totals[0]>totals[1]?0:1;$('winner-title').textContent=tie?'A sparkling tie!':`${state.names[winner]} wins!`;$('winner-subtitle').textContent=tie?'Equal points. Equal bragging rights. Happy Diwali!':'The lights are bright. The bragging rights are brighter. Happy Diwali!';$('final-scores').innerHTML=state.names.map((n,i)=>`<div class="final-score"><span>${escapeHTML(n)}</span><strong>₹${money(totals[i])}</strong></div>`).join('');if(!$('finish-dialog').open)$('finish-dialog').showModal();}
$('board-grid').addEventListener('click',e=>{const tile=e.target.closest('[data-question]');if(tile)openQuestion(tile.dataset.question);});
$('undo-btn').onclick=undo;
$('question-dialog').addEventListener('cancel',e=>{e.preventDefault();cancelQuestion();});
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());
document.querySelectorAll('dialog:not(#question-dialog)').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom)d.close();}}));
function applyTheme(theme) {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#171a19' : '#faf6ef';
  $('theme-btn').setAttribute('aria-pressed', String(dark));
  $('theme-btn').setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  $('theme-btn').title = `Switch to ${dark ? 'light' : 'dark'} mode`;
}
$('theme-btn').onclick=()=>{
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem(THEME_KEY, theme); } catch { /* The current session can still switch themes. */ }
};
applyTheme(document.documentElement.dataset.theme || 'dark');
$('help-btn').onclick=()=>$('help-dialog').showModal();
$('settings-btn').onclick=()=>{for(let i=0;i<2;i++){$(`name-input-${i}`).value=state.names[i];$('turn-select').options[i].textContent=state.names[i];}$('turn-select').value=state.turn;$('settings-dialog').showModal();};
$('settings-form').onsubmit=e=>{e.preventDefault();const names=[$('name-input-0').value.trim(),$('name-input-1').value.trim()];if(names.some(n=>!n)){notify('Give both teams a name first.');return;}if(names[0].toLowerCase()===names[1].toLowerCase()){notify('Choose different names so everyone knows whose turn it is.');return;}state.names=names;state.turn=Number($('turn-select').value);save();render();$('settings-dialog').close();notify('Teams are ready. Let’s play!');};
$('new-game-btn').onclick=()=>$('reset-dialog').showModal();
$('confirm-reset').onclick=()=>{stopTimer();state=newState(state.names);seconds=30;save();render();$('reset-dialog').close();notify('Fresh board. Fresh scores. Same big energy.');};
$('fullscreen-btn').onclick=async()=>{try{if(document.fullscreenElement){await document.exitFullscreen();}else{await document.documentElement.requestFullscreen();}}catch{notify('Fullscreen isn’t available here. Open the site in your browser to use it.');}};
document.addEventListener('fullscreenchange',()=>{$('fullscreen-btn').setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen');});
// Keep another tab in this browser in sync; each browser/device has its own game.
window.addEventListener('storage',e=>{if(e.key===THEME_KEY && ['dark','light'].includes(e.newValue)){applyTheme(e.newValue);return;}if(e.key!==STORAGE_KEY || !e.newValue)return;try{const next=JSON.parse(e.newValue);if(!validState(next))return;stopTimer();state=next;render();if(state.active){seconds=30;renderQuestion();if(!$('question-dialog').open)$('question-dialog').showModal();}else if($('question-dialog').open)$('question-dialog').close();}catch{}});
render();save();
if(state.active){lastOpenedTile=state.active;renderQuestion();$('question-dialog').showModal();}
