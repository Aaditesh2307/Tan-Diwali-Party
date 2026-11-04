/* Local host question bank, revision 5: familiar sports, cinema and festivals.
   The Jain and Wimbledon questions are preserved. Quotes use longer excerpts,
   with answers and background hidden until the host reveals them. */
const QUESTION_SET = 'sports-cinema-2026-11-v5';
const VALUES = [100,250,500,1000,2000,2500];
const DIFFICULTIES = ["easy","easy-plus","medium","hard","very-hard","expert"];
const CATEGORIES = [
  {id:"geography", name:"Geography", subtitle:"A little world of wonder", icon:"globe", questions:[
    {"q":"What is the capital of Japan?","a":"Tokyo","note":"Accept Tokyo."},
    {"q":"Which country is home to the city of Marrakech?","a":"Morocco","note":"Accept Morocco. Marrakech is also spelt Marrakesh."},
    {"q":"What is the capital of Australia?","a":"Canberra","note":"Accept Canberra."},
    {"q":"In which city is the Yas Marina Formula 1 circuit?","a":"Abu Dhabi","note":"Accept Abu Dhabi. The circuit is on Yas Island. The city is required, rather than just the UAE.","source":"https://www.formula1.com/en/information/abu-dhabi-yas-marina-circuit-yas-island.4YtOtpaWvaxWvDBTItP7s6"},
    {"q":"Which two countries share the world’s longest international land border?","a":"Canada and the United States","note":"Both are required. Accept USA, US or America for the United States."},
    {"q":"Name the three South American countries through which the Equator passes.","a":"Ecuador, Colombia and Brazil","note":"All three are required. Order does not matter."}
  ]},
  {id:"diwali", name:"Diwali & Festivals", subtitle:"Lights, legends & laddoos", icon:"diya", questions:[
    {"q":"Which goddess is worshipped for wealth and prosperity during Diwali?","a":"Lakshmi","note":"Accept Lakshmi, Laxmi or Goddess Lakshmi."},
    {"q":"What is the traditional name for the colourful decorative patterns made on floors during Diwali?","a":"Rangoli","note":"Accept rangoli. Regional equivalents such as kolam or alpana are also acceptable."},
    {"q":"Which festival traditionally begins the five-day Diwali celebrations?","a":"Dhanteras","note":"Accept Dhanteras or Dhanatrayodashi.","source":"https://www.incredibleindia.gov.in/en/festivals-and-events/diwali"},
    {"q":"For Jains, Diwali commemorates the nirvana of which spiritual teacher?","a":"Lord Mahavira","note":"Accept Mahavira, Mahavir or Lord Mahavir.","source":"https://www.indianheritage.gov.sg/en/-/media/ihc2023/education/downloadable-resources/pdf/deepavali-resources-for-primary-school-final.pdf"},
    {"q":"What does the Sanskrit word Deepavali literally mean?","a":"A row of lamps","note":"Accept a row, line or series of lamps or lights. The general phrase “festival of lights” alone is not the literal meaning."},
    {"q":"In the North Indian Hindu calendar tradition, Diwali falls in which month and on which lunar phase?","a":"Kartik — Amavasya (new moon)","note":"Both are required. Accept Kartika or Karttika, and new moon, no-moon night or Amavasya.","source":"https://www.delhitourism.gov.in/dt/festivals/diwali.html"}
  ]},
  {id:"runnerups", name:"Runner Ups", subtitle:"Second place. Main character.", icon:"medal", questions:[
    {"q":"Who was the second person to walk on the Moon?","a":"Buzz Aldrin","note":"Accept Buzz Aldrin or Edwin Aldrin. He walked on the Moon during Apollo 11 in 1969.","source":"https://nasa.gov/wp-content/uploads/static/history/alsj/a11/a11.crew.html"},
    {"q":"Who was the second Indian to win an individual Olympic gold medal?","a":"Neeraj Chopra","note":"He won the men’s javelin at the Tokyo 2020 Games, held in 2021.","source":"https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1743629"},
    {"q":"Which country finished as runner-up in the 2018 men’s FIFA World Cup?","a":"Croatia","note":"Accept Croatia."},
    {"q":"Which team finished as runner-up in the 2016 Indian Premier League?","a":"Royal Challengers Bangalore","note":"Accept RCB or Royal Challengers Bengaluru; the franchise used Bangalore in its name in 2016.","source":"https://www.iplt20.com/news/article/match-report-final-rcb-vs-srh"},
    {"q":"Who finished runner-up in the 2021 Formula 1 World Drivers’ Championship, and which team did he drive for?","a":"Lewis Hamilton — Mercedes","note":"Both are required. Accept Hamilton, and Mercedes or Mercedes-AMG.","source":"https://www.formula1.com/en/results/2021/drivers"},
    {"q":"Who was the runner-up in the 2019 Wimbledon men’s singles final, and which country did he represent?","a":"Roger Federer — Switzerland","note":"Both are required. Accept Federer for the player.","source":"https://www.wimbledon.com/pdf/Compendium_2021.pdf"}
  ]},
  {id:"trivia", name:"Trivia", subtitle:"Chronically curious energy", icon:"spark", questions:[
    {"q":"In Minecraft, which mob explodes when it approaches a player?","a":"Creeper","note":"Accept creeper. A charged creeper is also acceptable."},
    {"q":"What is the name of Manchester United’s home stadium?","a":"Old Trafford","note":"Accept Old Trafford. The nickname “The Theatre of Dreams” is also acceptable.","source":"https://www.manutd.com/en/visit-old-trafford"},
    {"q":"In Zindagi Na Milegi Dobara, which country do the three friends travel through?","a":"Spain","note":"Accept Spain.","source":"https://www.excelmovies.com/films/zindagi-na-mile-dobara/"},
    {"q":"In 3 Idiots, what is Rancho’s real name?","a":"Phunsukh Wangdu","note":"Accept Phunsukh Wangdu, Phunsuk Wangdu or a clearly recognisable pronunciation. Do not require exact spelling."},
    {"q":"Which three trophies did Manchester United win in their 1998–99 treble season?","a":"Premier League, FA Cup and UEFA Champions League","note":"All three are required. Accept the English league title for Premier League and Champions League or European Cup for UEFA Champions League. Order does not matter.","source":"https://www.manutd.com/en/news/juan-mata-reflects-on-man-united-treble-success"},
    {"q":"Name all six Infinity Stones in the Marvel films.","a":"Space, Mind, Reality, Power, Time and Soul","note":"All six are required. Order does not matter. Colours alone do not identify the stones.","source":"https://www.marvel.com/comics/discover/958/infinity-stones"}
  ]},
  {id:"quotes", name:"Who Said This?", subtitle:"Iconic words. Iconic people.", icon:"quote", questions:[
    {"q":"“Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hain, Senorita.”\n\nName the actor who says this.","a":"Shah Rukh Khan","note":"Accept Shah Rukh Khan, Shahrukh Khan or SRK. He plays Raj in Dilwale Dulhania Le Jayenge.","source":"https://www.youtube.com/watch?v=lfuAN-o6H0Q"},
    {"q":"“A guy opens his door and gets shot, and you think that of me? No. I am the one who knocks!”\n\nName the character.","a":"Walter White","note":"Accept Walter White, Walter or Heisenberg. The character is from Breaking Bad; the series name is not required at this value."},
    {"q":"“I’m not great at the advice. Can I interest you in a sarcastic comment?”\n\nName the character and the series.","a":"Chandler Bing — Friends","note":"Both the character and series are required. Accept Chandler for the character."},
    {"q":"“I knew exactly what to do. But in a much more real sense, I had no idea what to do.”\n\nName the character and the series.","a":"Michael Scott — The Office","note":"Both are required. Accept Michael. This refers to the US version of the series."},
    {"q":"“I could stand in the middle of Fifth Avenue and shoot somebody, and I wouldn’t lose any voters.”\n\nWho said this?","a":"Donald Trump","note":"Accept Donald Trump or Trump. The line was spoken at a campaign rally in January 2016.","source":"https://www.realclearpolitics.com/video/2016/01/23/trump_i_could_stand_in_the_middle_of_fifth_avenue_and_shoot_somebody_and_i_wouldnt_lose_any_voters.html"},
    {"q":"“Every time someone steps up and says who they are, the world becomes a better, more interesting place.”\n\nName the speaker, the series and the character being addressed.","a":"Captain Raymond Holt — Brooklyn Nine-Nine — Rosa Diaz","note":"All three are required. Accept Captain Holt, Raymond Holt or Holt; Brooklyn Nine-Nine or B99; and Rosa or Rosa Diaz. The exchange takes place in the episode Game Night.","source":"https://theninenine.com/quotes/episode/510/Game-Night/"}
  ]}
];
CATEGORIES.forEach(category => category.questions.forEach((question, i) => { question.id = `${category.id}-${VALUES[i]}`; question.value = VALUES[i]; question.difficulty = DIFFICULTIES[i]; question.category = category.id; }));
if (typeof module !== 'undefined') module.exports = {QUESTION_SET, VALUES, DIFFICULTIES, CATEGORIES};
