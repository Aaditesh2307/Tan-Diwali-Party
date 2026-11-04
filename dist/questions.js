/* Host question bank. These are intentionally never previewed on the prize board.
   Edit a prompt, answer, or note here to customize a future game. Keep IDs unique.
   Browser-local host game: hidden during normal play, not encrypted from source inspection. */
const VALUES = [100, 250, 500, 1000, 2000, 2500];
const CATEGORIES = [
  {id:'geography', name:'Geography', subtitle:'A little world of wonder', icon:'globe', questions:[
    {q:'Your friend’s entire Instagram is suddenly beaches, rice terraces and Bali. Which country are they in?', a:'Indonesia', note:'Bali is an Indonesian island.'},
    {q:'You’re on a K-pop pilgrimage to Seoul. Which country’s capital have you landed in?', a:'South Korea', note:'Accept the Republic of Korea.'},
    {q:'Istanbul is famously a city on two continents. Name both.', a:'Europe and Asia', note:'The Bosphorus separates the city’s European and Asian sides. Both continents are needed.'},
    {q:'Which independent country is completely surrounded by South Africa?', a:'Lesotho', note:'Lesotho is an enclave within South Africa. Eswatini also borders Mozambique, so it does not qualify.'},
    {q:'Point Nemo is the ocean spot farthest from any land. In which ocean would you find it?', a:'The Pacific Ocean', note:'It is in the South Pacific, about 2,688 km from the nearest land.', source:'https://oceanservice.noaa.gov/facts/nemo.html'},
    {q:'Which island country has territory in all four hemispheres: northern, southern, eastern and western?', a:'Kiribati', note:'Its islands straddle both the Equator and the 180° meridian.', source:'https://visitkiribati.travel/wp-content/uploads/2019/05/Kiribati-Travel-Information-2019.pdf'}
  ]},
  {id:'diwali', name:'Diwali & Festivals', subtitle:'Lights, legends & laddoos', icon:'diya', questions:[
    {q:'Which goddess of wealth and prosperity is traditionally worshipped during Lakshmi Puja on Diwali?', a:'Goddess Lakshmi', note:'Accept Lakshmi or Laxmi.'},
    {q:'In the Ramayana tradition, Diwali celebrates Rama’s return to which city after exile?', a:'Ayodhya', note:'Rama returns to Ayodhya with Sita and Lakshmana.'},
    {q:'Which festival begins the traditional five-day Diwali celebrations and is associated with buying gold and silver?', a:'Dhanteras', note:'Also called Dhanatrayodashi.', source:'https://www.incredibleindia.gov.in/en/festivals-and-events/diwali'},
    {q:'For Jains, Diwali marks the nirvana of which Tirthankara?', a:'Lord Mahavira', note:'Mahavira is the 24th Jain Tirthankara.', source:'https://www.indianheritage.gov.sg/en/-/media/ihc2023/education/downloadable-resources/pdf/deepavali-resources-for-primary-school-final.pdf'},
    {q:'Bandi Chhor Divas, observed by Sikhs around Diwali, commemorates the release of which Sikh Guru from Gwalior Fort?', a:'Guru Hargobind', note:'He is the sixth Sikh Guru. Accept Guru Hargobind Sahib.', source:'https://www.incredibleindia.gov.in/en/festivals-and-events/diwali'},
    {q:'In the North Indian Hindu calendar tradition, the main Diwali night falls on which lunar phase, and in which month?', a:'Amavasya (new moon) in Kartik', note:'Both parts are needed. Accept Kartika or Karttika for the month.', source:'https://www.delhitourism.gov.in/dt/festivals/diwali.html'}
  ]},
  {id:'runnerups', name:'Runner Ups', subtitle:'Second place. Main character.', icon:'medal', questions:[
    {q:'Neil Armstrong took the first steps. Who was the second person to walk on the Moon?', a:'Buzz Aldrin', note:'Accept Edwin Aldrin. Both walked on the Moon during Apollo 11 in 1969.', source:'https://nasa.gov/wp-content/uploads/static/history/alsj/a11/a11.crew.html'},
    {q:'Australia won the 2023 ICC Men’s ODI Cricket World Cup. Which team finished as runners-up?', a:'India', note:'Australia beat India in the final in Ahmedabad.', source:'https://www.icc-cricket.com/news/awesome-australia-beat-india-to-win-the-icc-mens-cricket-world-cup'},
    {q:'Argentina lifted the trophy in 2022. Which country finished second in that men’s FIFA World Cup?', a:'France', note:'The final finished 3–3 after extra time; Argentina won the penalty shoot-out.', source:'https://www.uefa.com/news/0274-14ce5c537085-08c45b3067c4-1000--world-cup-results/'},
    {q:'Usain Bolt won the men’s 100 metres at London 2012. Which Jamaican sprinter took silver?', a:'Yohan Blake', note:'Blake ran 9.75 seconds in the final.', source:'https://worldathletics.org/results/olympic-games/2012/the-xxx-olympic-games-6999193/men/100-metres/final/result'},
    {q:'Yuri Gagarin was the first human to orbit Earth. Who was the second?', a:'Gherman Titov', note:'Accept German Titov. His Vostok 2 mission orbited Earth in August 1961. Alan Shepard’s earlier flight was suborbital.', source:'https://www.nasa.gov/wp-content/uploads/2015/04/636007main_rocketspeoplevolume3-ebook.pdf'},
    {q:'Roald Amundsen’s party reached the South Pole first. Which British explorer led the second party to reach it, in January 1912?', a:'Robert Falcon Scott', note:'Accept Robert Scott or Captain Scott. The question asks for the leader of the second expedition, rather than the second individual.', source:'https://www.southpole.aq/activities/historic.html'}
  ]},
  {id:'trivia', name:'Trivia', subtitle:'Chronically curious energy', icon:'spark', questions:[
    {q:'Every December, everyone suddenly becomes a music critic. What is Spotify’s annual personalised listening recap called?', a:'Spotify Wrapped', note:'Accept Wrapped.'},
    {q:'In Stranger Things, what is the name of the dark alternate dimension connected to Hawkins?', a:'The Upside Down', note:'No bonus points for the dramatic voice.'},
    {q:'What fictional metal powers Wakanda’s technology and is used in Black Panther’s suit?', a:'Vibranium', note:'Adamantium is associated with Wolverine and is not the answer.'},
    {q:'Your charger says USB. What do those three letters actually stand for?', a:'Universal Serial Bus', note:'All three words are needed.'},
    {q:'Before it became Minecraft, what was the game’s original working title?', a:'Cave Game', note:'Markus Persson used the working title Cave Game during early development.', source:'https://www.minecraft.net/en-us/article/the-future-of-minecrafts-development'},
    {q:'Before Google was Google, what was Larry Page and Sergey Brin’s early search engine called?', a:'BackRub', note:'It referred to the analysis of backlinks. Accept Back Rub.', source:'https://about.google/company-info/our-story/'}
  ]},
  {id:'quotes', name:'Who Said This?', subtitle:'Iconic words. Iconic people.', icon:'quote', questions:[
    {q:'“How you doin’?”\n\nWhich Friends character made this their signature line?', a:'Joey Tribbiani', note:'Accept Joey. Actor: Matt LeBlanc.'},
    {q:'“We were on a break!”\n\nWhich Friends character keeps making this defence?', a:'Ross Geller', note:'Accept Ross. Actor: David Schwimmer.'},
    {q:'“You’re fired!”\n\nWhich businessman made this his catchphrase while hosting The Apprentice?', a:'Donald Trump', note:'Accept Trump. This asks about the original US host.'},
    {q:'“I’mma let you finish…”\n\nWho interrupted Taylor Swift with these words at the 2009 MTV Video Music Awards?', a:'Kanye West', note:'Accept Kanye or Ye. He interrupted her Best Female Video acceptance speech.'},
    {q:'“I’m not superstitious, but I am a little stitious.”\n\nName the character and the TV show.', a:'Michael Scott — The Office', note:'Both the character and the show are needed. Actor: Steve Carell; the US version of The Office.'},
    {q:'“I am the one who knocks!”\n\nGive the character’s full name and the TV show.', a:'Walter White — Breaking Bad', note:'Both the full character name and the show are needed. Accept Heisenberg as an alternative character name. Actor: Bryan Cranston.'}
  ]}
];
CATEGORIES.forEach(category => category.questions.forEach((question, i) => { question.id = `${category.id}-${VALUES[i]}`; question.value = VALUES[i]; question.category = category.id; }));
if (typeof module !== 'undefined') module.exports = {VALUES, CATEGORIES};
