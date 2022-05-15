//import TileMap from "./TileMap.js";

//arrays
var carto = []
var users = []
var questions = []
var weather = []
var Effects = []
var currentLocation = []
var paintArray = []
var PaletteArray = []
var currentQuestions = []
var currentEffects = []
var players = []
var npcArray = []
var currentNPCs = []
var inventory = []
var monsters = []
var selectEffects = []

//Google Sheet Queries
var sheetName = 'Global'
var scale = 'Select *'
var parentID = 0
var uniqueID = 0
var savedID = 0

var mousex
var mousey
var Pmousex
var Pmousey
var xList = []
var yList = []
var fps = []
var x = 0
var y = 0 

var rx = 0
var ry = 0
var rz = 0

var Px = 0
var Py = 0

var rLocation
var rCategory
var currentWeather
var textAcontents
var textBcontents
var textCcontents
var textDcontents
var textEcontents

var paintColour

var rFill
var rUser

var lastLoop = new Date();
var visible = window.toolbar.visible;
var isTyping 

var activeElement
var paintCheck = 0
var flashing = 0
var gridColour = "rgb(0, 90, 0, 1)"
var backImageMod = 1
var backImageYMod = 0
var backImageXMod = 0
var backImageRotate


const Season = document.getElementById("Season")
const Time = document.getElementById("Time") 
const Player = document.getElementById('Player')

var currentPlayer



var rUsername = 'Gaia' //prompt("What is your name?");
document.addEventListener('DOMContentLoaded',permMap);

const randColor = () =>  {
  return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}





//-----------------------------------------------------------------------------
function setFlashing(){

  //console.log('Flashing is currently ' + flashing)

  flashing ++
  
  if (flashing == 3){
  
  flashing = 0
  
  }



}


//-----------------------------------------------------------------------------
//gridLOOP
//Two loops, one that updates all the time, one that updates onclick

function gridLoop() {
  //Variables
  var thisLoop = new Date();
  fps = Math.floor(1000 / (thisLoop - lastLoop));
  lastLoop = thisLoop;

  //Draw The Map  
  loopMap()
  InvIDLoop()
  

  //Persistent User Effects
}

//Something to do with how long each loop is...

//ONCE
document.getElementById('user').value = rUsername
document.getElementById('wrapper').scrollLeft += 0 //screen.width/10*6;
document.getElementById('sheetName').value = sheetName
document.getElementById('mapData_isWeather').value = "0";
document.getElementById('mapData_isEffect').value = "0";
document.getElementById('mapData_isNPC').value = "0";
document.getElementById('mapData_isInventory').value = "0";
document.getElementById('mapData_isNewItem').value = "1";

checkSidebar()
LoadPlayers()

setInterval(gridLoop, 1000 / 60);
setInterval(setFlashing, 1500);



//-----------------------------------------------------------------------------
//FUNCTION TO IMPORT MAP DATA FROM SPREADSHEET

function LoadMap(){
 

 //Connection to Google Sheet
//Sheet URL between /d/ and /edit/
const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`

//SPECIFICS THAT CHANGE
const query = scale

//AGGREGATE
const url = `${base}&sheet=${sheetName}&tq=${query}`;
//const output = document.querySelector('.output');
console.log('')
console.log('++++++++LOAD_CARTO+++++++++++')
console.log('Connection to ' + sheetName + ' has been made.');
console.log(scale + ' from ' + sheetName)
console.log('parentID is ' + parentID)

//carto = []

fetch(url)
.then(res => res.text())
.then(rep => {
  //console.log(rep);
    //clean the return so it is usable
  const jsData = JSON.parse(rep.substr(47).slice(0,-2));
  //console.log(jsData);
  const colz = [];
  
  
  jsData.table.cols.forEach((heading)=>{

    if(heading.label){
         colz.push(heading.label.toLowerCase().replace(/\s/g,''));
    } 

  })

   jsData.table.rows.forEach((main)=>{
     //console.log(main);
     const row = {};
     colz.forEach((ele,ind) =>{
    // console.log(ele,ind);
      //iferror syntax here;
      row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
    })
    carto.push(row)
   }) 
     

})

console.log('Rows returned from '+ sheetName + ' ' + carto.length)
filterCarto()



}

//-----------------------------------------------------------------------------
//FUNCTION TO IMPORT MAP DATA FROM SPREADSHEET

function LoadUsers(){

  //Connection to Google Sheet
 //Sheet URL between /d/ and /edit/
 const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
 const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
 //SPECIFICS THAT CHANGE
 const sheet = 'Users'
 const qu = 'Select *';
 const query = qu
 //AGGREGATE
 const url = `${base}&sheet=${sheet}&tq=${query}`;
 //const output = document.querySelector('.output');
 console.log('')
 console.log('++++++++LOAD USERS+++++++++++')
 console.log('Connection to ' + sheet + ' has been made.');
 console.log(qu + ' from ' + sheet)


//const empty = users => users.length = 0;
//empty(users)
 
 fetch(url)
 .then(res => res.text())
 .then(rep => {
   //console.log(rep);
     //clean the return so it is usable
   const jsData = JSON.parse(rep.substr(47).slice(0,-2));
   //console.log(jsData);
   const colz = [];
   
   
   jsData.table.cols.forEach((heading)=>{
 
     if(heading.label){
          colz.push(heading.label.toLowerCase().replace(/\s/g,''));
     } 
 
   })
 
    jsData.table.rows.forEach((main)=>{
      //console.log(main);c
      const row = {};
      colz.forEach((ele,ind) =>{
     // console.log(ele,ind);
       //iferror syntax here;
       row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
     })
     users.push(row)
    }) 
      
 
 })
 
 console.log('Rows returned from Users ' + users.length)
 
 console.table(users)

 users = []
 
 }
 
 //-----------------------------------------------------------------------------
//FUNCTION TO IMPORT CATEGORY DATA FROM SPREADSHEET

function LoadQuestions(){

  //Connection to Google Sheet
 //Sheet URL between /d/ and /edit/
 const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
 const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
 //SPECIFICS THAT CHANGE
 const sheet = 'Questions'
 const category = document.getElementById('Category').value
 console.log('')
 console.log('+++++++++LOAD QUESTIONS++++++++++')
 console.log('Category is ' + category + '.');
 const qu = 'Select *' ;
 const query = qu
 //AGGREGATE
 const url = `${base}&sheet=${sheet}&tq=${query}`;
 //const output = document.querySelector('.output');

 console.log('Connection to ' + sheet + ' has been made.');
 console.log(qu + ' from ' + sheet)
 

 
 fetch(url)
 .then(res => res.text())
 .then(rep => {
   //console.log(rep);
     //clean the return so it is usable
   const jsData = JSON.parse(rep.substr(47).slice(0,-2));
   //console.log(jsData);
   const colz = [];
   
   
   jsData.table.cols.forEach((heading)=>{
 
     if(heading.label){
          colz.push(heading.label.toLowerCase().replace(/\s/g,''));
     } 
 
   })
 
    jsData.table.rows.forEach((main)=>{
      //console.log(main);
      const row = {};
      colz.forEach((ele,ind) =>{
      //console.log(ele,ind);
       //iferror syntax here;
       row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
     })
     questions.push(row)
    }) 
      
 
 })}

 function getQuestions(){
 
 //console.log(questions.length + ' Rows returned from Questions')
 //console.table(questions)
 //console.table('Category is ' + currentLocation[0].category)
 
 currentQuestions = questions.filter(obj => obj.category == currentLocation[0].category )
 console.table(currentQuestions)


 document.getElementById('QA').value  = currentQuestions[0].qa
 document.getElementById('QB').value = currentQuestions[0].qb
 document.getElementById('QC').value  = currentQuestions[0].qc
 document.getElementById('QD').value  = currentQuestions[0].qd
 document.getElementById('QE').value  = currentQuestions[0].qe

 document.getElementById('Reading_QA').innerHTML  = currentQuestions[0].qa
 document.getElementById('Reading_QB').innerHTML  = currentQuestions[0].qb
 document.getElementById('Reading_QC').innerHTML  = currentQuestions[0].qc
 document.getElementById('Reading_QD').innerHTML  = currentQuestions[0].qd
 document.getElementById('Reading_QE').innerHTML  = currentQuestions[0].qe


if( document.getElementById('Reading_QA').value != "" ){

  document.getElementById("Reading_QA").style.display = "block";
  document.getElementById("AskQA").style.display = "block";
  
 
}

if( document.getElementById('Reading_QB').value != "" ){

  document.getElementById("Reading_QB").style.display = "block";
  document.getElementById("AskQB").style.display = "block";
  
}
  
if( document.getElementById('Reading_QC').value != "" ){

  document.getElementById("Reading_QC").style.display = "block";
  document.getElementById("AskQC").style.display = "block";
    
}

if( document.getElementById('Reading_QD').value != "" ){

  document.getElementById("Reading_QD").style.display = "block";
  document.getElementById("AskQD").style.display = "block";
      
}

if( document.getElementById('Reading_QE').value != "" ){

  document.getElementById("Reading_QE").style.display = "block";
  document.getElementById("AskQE").style.display = "block";
        
}

}

//-----------------------------------------------------------------------------
//FUNCTION TO IMPORT WEATHER DATA FROM SPREADSHEET

Season.innerHTML = "";

 
 Season[Season.length] = new Option("Spring","Spring")
 Season[Season.length] = new Option("Summer","Summer")
 Season[Season.length] = new Option("Autumn","Autumn")
 Season[Season.length] = new Option("Winter","Winter")
 Season[Season.length] = new Option("Misc.","Misc.")

Time.innerHTML = "";


 Time[Time.length] = new Option("Dawn","Dawn")
 Time[Time.length] = new Option("Morning","Morning")
 Time[Time.length] = new Option("Noon","Noon")
 Time[Time.length] = new Option("Afternoon","Afternoon")
 Time[Time.length] = new Option("Evening","Evening")
 Time[Time.length] = new Option("Dusk","Dusk")
 Time[Time.length] = new Option("Night","Night")
 Time[Time.length] = new Option("Midnight","Midnight")
 Time[Time.length] = new Option("Misc.","Misc.")
 
function LoadWeather(){

  //Connection to Google Sheet
 //Sheet URL between /d/ and /edit/
 const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
 const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`

 //SPECIFICS THAT CHANGE
 const sheet = 'Weather'
 const query = 'Select *';

 //AGGREGATE
 const url = `${base}&sheet=${sheet}&tq=${query}`;
 //const output = document.querySelector('.output');

console.log('')
console.log('++++++++LOAD WEATHER+++++++++++')

 console.log('Connection to ' + sheet + ' has been made.');
  
 fetch(url)
 .then(res => res.text())
 .then(rep => {
   //console.log(rep);
     //clean the return so it is usable
   const jsData = JSON.parse(rep.substr(47).slice(0,-2));
   //console.log(jsData);
   const colz = [];
      
   jsData.table.cols.forEach((heading)=>{
 
     if(heading.label){
          colz.push(heading.label.toLowerCase().replace(/\s/g,''));
     } 
 
   })
 
    jsData.table.rows.forEach((main)=>{
      //console.log(main);
      const row = {};
      colz.forEach((ele,ind) =>{
      //console.log(ele,ind);
       //iferror syntax here;
       row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
     })
     weather.push(row)
    }) 
  
 })

 console.log(weather.length + ' rows have returned.');

 

 //for(var i = 0; i < weather.length; i++) {
  
  //Season[Season.length] = new Option(weather[i].season,weather[i].season)
 
 
 //}



 //const Times = weather.filter(obj => obj.season == Season.value )
 //console.table(Times)


// for(var i = 0; i < Times.length; i++) {
  
//  Time[Time.length] = new Option(Times[i].day,Times[i].day)

//}

//weather = []

}

function randomEffects(){

  console.log('')
  console.log('+++++++++ randEffects ++++++++++')
  

  var seed = document.getElementById('effectEntries')
  var options = currentEffects.length 
  const choice = Math.floor(Math.random() * options)
  
  var seedChildren = seed.children;
   
   // set the value of the dropdown to a random option
   seed.value = seedChildren[choice].value; 

  fillEffectDescriptions()
   //fillWeatherEntrySelection()
  
}

function randomWeather(){

  console.log('')
  console.log('+++++++++ randomWeather ++++++++++')
  

  var seed = document.getElementById('weatherEntries')
  var options = currentWeather.length 
  const choice = Math.floor(Math.random() * options)
  
  var seedChildren = seed.children;
   
   // set the value of the dropdown to a random option
   seed.value = seedChildren[choice].value; 

   fillWeatherDescriptions()
   //fillWeatherEntrySelection()
  
}

function getWeather(){

 console.log('')
 console.log('+++++++++ GET WEATHER ++++++++++')
 console.log('Rows returned from Weather ' + weather.length)
 console.log('Currently a ' + Season.value + "'s " + Time.value)
 //console.table(weather)

 currentWeather = weather.filter(obj => obj.season == Season.value && obj.day == Time.value)
 console.table(currentWeather)

 fillWeatherEntrySelection()
 fillWeatherDescriptions()

 randomWeather()

}

document.getElementById('Season').onchange = function () {
 

  //Time.innerHTML = "";

  //const Times = weather.filter(obj => obj.season == Season.value )
  //console.table(Times)
 
  //for(var i = 0; i < Times.length; i++) {
   
   //Time[Time.length] = new Option(Times[i].day,Times[i].day)

 // }
  
  fillWeatherEntrySelection()
  fillWeatherDescriptions()
}

function setcurrentWeather() {

  var weatherEntry = document.getElementById('weatherEntries').value;
  currentWeather = weather.filter(obj => obj.name == weatherEntry)
  console.table(currentWeather)
  console.log('currentWeather updated.')



}

function fillWeatherEntrySelection(){


  var weatherEntries = document.getElementById('weatherEntries')

  weatherEntries.innerHTML = "";
  
  const weatherNames = weather.filter(obj => obj.season == Season.value && obj.day == Time.value)
 
  for(var i = 0; i < weatherNames.length; i++) {
  
  weatherEntries[weatherEntries.length] = new Option(weatherNames[i].name,weatherNames[i].name)

}

 weatherEntries[weatherEntries.length] = new Option("New Entry","New Entry")



}

document.getElementById('weatherEntries').onchange = function () {

  fillWeatherDescriptions()
  
  
  }

  function fillWeatherDescriptions(){

    setcurrentWeather()

    const Description = document.getElementById('WeatherDesc');
    const Modifier =    document.getElementById('WeatherMod');
    const Reaction =    document.getElementById('WeatherReact');
    const Name =        document.getElementById('weatherEntries');
    const Title =       document.getElementById('WeatherName')
    
    
    if( Name.value == "New Entry"){

      Description.value = ""
      Modifier.value =   "" 
      Reaction.value = ""
      Title.value = ""

    }else{
    
    Description.value = currentWeather[0].description
    
    Modifier.value = currentWeather[0].modifier
  
    Reaction.value = currentWeather[0].reaction

    Title.value = currentWeather[0].name

    }

  }

  document.getElementById('Time').onchange = function () {
    
    fillWeatherEntrySelection()
    
    getWeather()

    fillWeatherDescriptions()
    
    }
 
  document.getElementById('EditWeather').onclick = function () {

    document.getElementById('Weather').style.display = "block";
    document.getElementById('EditorButtons').style.display = "none";
    fillWeatherEntrySelection()
    fillWeatherDescriptions()

  }

  document.getElementById('HideEditWeather').onclick = function () {

    document.getElementById('Weather').style.display = "none";
    document.getElementById('EditorButtons').style.display = "block";
  }

     //-----------------------------------------------------------------------------
//LOCATION STUFF

document.getElementById('editLocation').onclick = function () {

  document.getElementById('LocationEditor').style.display = "block";
  document.getElementById('EditorButtons').style.display = "none";


}

document.getElementById('hideLocationEditor').onclick = function () {

  document.getElementById('LocationEditor').style.display = "none";
  document.getElementById('EditorButtons').style.display = "block";

}

   //-----------------------------------------------------------------------------
//NPC STUFF

document.getElementById('editNPCs').onclick = function () {

  document.getElementById('NPCs').style.display = "block";
  
  document.getElementById('EditorButtons').style.display = "none";

  fillNPCQuestions()
  fillNPCDescriptions()


}

document.getElementById('hideEditNPCs').onclick = function () {

  document.getElementById('NPCs').style.display = "none";

  document.getElementById('EditorButtons').style.display = "block";
}



//FUNCTION TO IMPORT NPC DATA FROM SPREADSHEET
function LoadNPCs(){

  //Connection to Google Sheet
 //Sheet URL between /d/ and /edit/
 const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
 const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`

 //SPECIFICS THAT CHANGE
 const sheet = 'NPCs'
 const query = 'Select *';

 //AGGREGATE
 const url = `${base}&sheet=${sheet}&tq=${query}`;
 //const output = document.querySelector('.output');
 console.log('')
 console.log('+++++++++LOAD NPCs++++++++++')

 fetch(url)
 .then(res => res.text())
 .then(rep => {
   //console.log(rep);
     //clean the return so it is usable
   const jsData = JSON.parse(rep.substr(47).slice(0,-2));
   //console.log(jsData);
   const colz = [];
      
   jsData.table.cols.forEach((heading)=>{
 
     if(heading.label){
          colz.push(heading.label.toLowerCase().replace(/\s/g,''));
     } 
 
   })
 
    jsData.table.rows.forEach((main)=>{
      //console.log(main);
      const row = {};
      colz.forEach((ele,ind) =>{
      //console.log(ele,ind);
       //iferror syntax here;
       row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
     })
     npcArray.push(row)
    }) 
  
 })

 }

 function getNPCs(){

  let currentCategory = document.getElementById("Category").value

  console.log('')
  console.log('+++++++++ GET NPCS ++++++++++')
  console.log('Rows returned from NPCs ' + npcArray.length)
  console.log('Category is ' + sheetName + ' ' + currentCategory)

  if( sheetName == "Global"){

    currentNPCs = npcArray.filter(obj => obj.scale == sheetName)

  }else if(sheetName == "Local"){

    currentNPCs = npcArray.filter(obj => obj.category == currentCategory && obj.scale == sheetName)

  }else if(sheetName == "Dungeon"){

    currentNPCs = npcArray.filter(obj => obj.scale == sheetName) //

  }
 
 
  console.log('Rows returned from Filter ' + currentNPCs.length)
  //console.table(currentNPCs)
 
 

 }

 function fillNPCDropdowns(){


  var NPCEntries = document.getElementById('npcEntries')

  var oneNPC = document.getElementById('oneNPC')
  var twoNPC = document.getElementById('twoNPC')
  var threeNPC = document.getElementById('threeNPC')

  oneNPC.innerHTML = "";
  twoNPC.innerHTML = "";
  threeNPC.innerHTML = "";

  NPCEntries.innerHTML = "";

  oneNPC[oneNPC.length]     = new Option(currentLocation[0].onenpc,currentLocation[0].onenpc)
  twoNPC[twoNPC.length]     = new Option(currentLocation[0].twonpc,currentLocation[0].twonpc)
  threeNPC[threeNPC.length] = new Option(currentLocation[0].threenpc,currentLocation[0].threenpc)
 
 
  for(var i = 0; i < currentNPCs.length; i++) {
  
    NPCEntries[NPCEntries.length] = new Option(currentNPCs[i].npcname,currentNPCs[i].npcname)
  
    oneNPC[oneNPC.length]     = new Option(currentNPCs[i].npcname,currentNPCs[i].npcname)
    twoNPC[twoNPC.length]     = new Option(currentNPCs[i].npcname,currentNPCs[i].npcname)
    threeNPC[threeNPC.length] = new Option(currentNPCs[i].npcname,currentNPCs[i].npcname)
    
  }

  
  NPCEntries[NPCEntries.length] = new Option("New Entry","New Entry")

  const random1 = Math.floor(Math.random() * currentNPCs.length) + 1
  const random2 = Math.floor(Math.random() * currentNPCs.length) + 1
  const random3 = Math.floor(Math.random() * currentNPCs.length) + 1

  var oneNPCChildren   = oneNPC.children;
  var twoNPCChildren   = twoNPC.children;
  var threeNPCChildren = threeNPC.children;
  
   
    // set the value of the dropdown to a random option

    console.log('NPC 1 Length ' + oneNPC.length)
    console.log('NPC 2 Length ' + twoNPC.length)
    console.log('NPC 3Length ' + threeNPC.length)

   if(oneNPC.value.length == 0){
    oneNPC.value = oneNPCChildren[random1].value; 
   }

   if(twoNPC.value.length == 0){
    twoNPC.value = twoNPCChildren[random2].value; 
   }

   if(threeNPC.value.length == 0){
    threeNPC.value = threeNPCChildren[random3].value; 
   }

   NPCEntries.value = oneNPC.value


}

function fillNPCDescriptions(){

  //setcurrentWeather()

  const Description = document.getElementById('npc1');
  const Modifier =    document.getElementById('npc2');
  const Reaction =    document.getElementById('npc3');
  const Name =        document.getElementById('npcEntries');
  const Title =       document.getElementById('npcName');
  
  
  if( Name.value == "New Entry"){

    Description.value = ""
    Modifier.value =   "" 
    Reaction.value = ""
    Title.value = ""

  }else{

  let currentCategory = document.getElementById("Category").value
  let selection    = document.getElementById('npcEntries').value;
  var chosenNPC

  if( sheetName == "Global"){

     chosenNPC = npcArray.filter(obj => obj.scale == sheetName && obj.npcname == selection)

  }else if(sheetName == "Local"){

     chosenNPC = npcArray.filter(obj => obj.category == currentCategory && obj.scale == sheetName && obj.npcname == selection)

  }else if(sheetName == "Dungeon"){

     chosenNPC = npcArray.filter(obj => obj.scale == sheetName && obj.npcname == selection)

  }
  
  Title.value =  chosenNPC[0].npcname

  Description.value = chosenNPC[0].npc1
  
  Modifier.value = chosenNPC[0].npc2

  Reaction.value = chosenNPC[0].npc3

  }


 

}

document.getElementById('loadNPCDescriptions').onclick = function () {

  fillNPCDescriptions()

}


document.getElementById('npcEntries').onchange = function () {

  fillNPCDescriptions()

}

function fillNPCQuestions(){
//Depending on Scale, ask for different aspects. 
let Location = document.getElementById("Location").value
let Q1 = document.getElementById("npcTitleOne")
let Q2 = document.getElementById("npcTitleTwo")
let Q3 = document.getElementById("npcTitleThree")
let Q4 = document.getElementById("npcTitleFour")
let Q5 = document.getElementById("npcTitleFive")
let Q6 = document.getElementById("npcTitleSix")

if(sheetName == "Global"){

Q1.innerHTML = 'Select Networks active in location: '
Q2.innerHTML = 'Select Network to Edit:'
Q3.innerHTML = 'Name of Network:'
Q4.innerHTML = 'Briefly describe the Network:'
Q5.innerHTML = 'Where is this Network centred and who runs it?'
Q6.innerHTML = 'What do all members of this Network carry with them?'

}else if(sheetName == "Local"){

  Q1.innerHTML = 'Select Groups active in location: '
  Q2.innerHTML = 'Select Groups to Edit:'
  Q3.innerHTML = 'Name of Group:'
  Q4.innerHTML = 'Briefly describe the Group:'
  Q5.innerHTML = 'Where is this Group centred locally and who runs it?'
  Q6.innerHTML = 'What do all members of this Group carry with them?'

}else if(sheetName == "Dungeon"){

  Q1.innerHTML = 'Select NPCs/Monster active in vicinity: '
  Q2.innerHTML = 'Select NPCs/Monster to Edit:'
  Q3.innerHTML = 'Name:'
  Q4.innerHTML = 'Physically describe:'
  Q5.innerHTML = 'Mechanics:'
  Q6.innerHTML = 'Tactics:'

}

console.log('')
console.log('+++++++++fillNPCQuestions++++++++++')

}

  //-----------------------------------------------------------------------------
//FUNCTION TO IMPORT EFFECTS DATA FROM SPREADSHEET
function LoadEffects(){

  //Connection to Google Sheet
 //Sheet URL between /d/ and /edit/
 const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
 const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`

 //SPECIFICS THAT CHANGE
 const sheet = 'Effects'
 const query = 'Select *';

 //AGGREGATE
 const url = `${base}&sheet=${sheet}&tq=${query}`;
 //const output = document.querySelector('.output');
 console.log('')
 console.log('+++++++++LOAD EFFECTS++++++++++')

 fetch(url)
 .then(res => res.text())
 .then(rep => {
   //console.log(rep);
     //clean the return so it is usable
   const jsData = JSON.parse(rep.substr(47).slice(0,-2));
   //console.log(jsData);
   const colz = [];
      
   jsData.table.cols.forEach((heading)=>{
 
     if(heading.label){
          colz.push(heading.label.toLowerCase().replace(/\s/g,''));
     } 
 
   })
 
    jsData.table.rows.forEach((main)=>{
      //console.log(main);
      const row = {};
      colz.forEach((ele,ind) =>{
      //console.log(ele,ind);
       //iferror syntax here;
       row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
     })
     Effects.push(row)
    }) 
  
 })

 
 
 }


 function getEffects(){

  let currentCategory = document.getElementById("Category").value

  console.log('')
  console.log('+++++++++ GET EFFECTS ++++++++++')
  console.log('Rows returned from Effects ' + Effects.length)
  console.log('Category is ' + sheetName + ' ' + currentCategory)
 
  currentEffects = Effects.filter(obj => obj.category == currentCategory && obj.scale == sheetName)
  console.log('Rows returned from Filter ' + currentEffects.length)
  console.table(currentEffects)

 fillEffectsDropdowns()
 fillEffectDescriptions()

 randomEffects()


  
 
 

 }

 document.getElementById('editEffects').onclick = function () {

  document.getElementById('Effects').style.display = "block";
  document.getElementById('EditorButtons').style.display = "none";

  fillEffectDescriptions()

}

document.getElementById('hideEditEffects').onclick = function () {

  document.getElementById('Effects').style.display = "none";
  document.getElementById('EditorButtons').style.display = "block";

}

 function fillEffectsDropdowns(){


  var effectsEntries = document.getElementById('effectEntries')

  var effectOne = document.getElementById('effectOne')
  var effectTwo = document.getElementById('effectTwo')
  var effectThree = document.getElementById('effectThree')

  effectOne.innerHTML = "";
  effectTwo.innerHTML = "";
  effectThree.innerHTML = "";

  effectOne[effectOne.length]     = new Option(currentLocation[0].effectone,currentLocation[0].effectone)
  effectTwo[effectTwo.length]     = new Option(currentLocation[0].effecttwo,currentLocation[0].effecttwo)
  effectThree[effectThree.length] = new Option(currentLocation[0].effectthree,currentLocation[0].effectthree)
 

  effectsEntries.innerHTML = "";

  for(var i = 0; i < currentEffects.length; i++) {
  
    effectsEntries[effectsEntries.length] = new Option(currentEffects[i].name,currentEffects[i].name)
  
    effectOne[effectOne.length]     = new Option(currentEffects[i].name,currentEffects[i].name)
    effectTwo[effectTwo.length]     = new Option(currentEffects[i].name,currentEffects[i].name)
    effectThree[effectThree.length] = new Option(currentEffects[i].name,currentEffects[i].name)


    
  }
  
  effectsEntries[effectsEntries.length] = new Option("New Entry","New Entry")

  const random1 = Math.floor(Math.random() * currentEffects.length)
  const random2 = Math.floor(Math.random() * currentEffects.length)
  const random3 = Math.floor(Math.random() * currentEffects.length)

  var effectOneChildren   = effectOne.children;
  var effectTwoChildren   = effectTwo.children;
  var effectThreeChildren = effectThree.children;

   // set the value of the dropdown to a random option

   
   if(effectOne.length == 0){
    effectOne.value = effectOneChildren[random1].value;
   }

   if(effectTwo.length == 0){
    effectTwo.value = effectTwoChildren[random2].value; 
   }

   if(effectThree.length == 0){
    effectThree.value = effectThreeChildren[random3].value; 
   }
 
   fillEffectDescriptions()

}

function fillEffectDescriptions(){

  //setcurrentWeather()

  const Description = document.getElementById('effectDesc');
  const Modifier =    document.getElementById('effectMod');
  const Reaction =    document.getElementById('effectReact');
  const Name =        document.getElementById('effectEntries');
  const Title =       document.getElementById('effectName');
  
  
  if( Name.value == "New Entry"){

    Description.value = ""
    Modifier.value =   "" 
    Reaction.value = ""
    Title.value = ""

  }else{

  let currentCategory = document.getElementById("Category").value
  let selection    = document.getElementById('effectEntries').value;
  let chosenEffect = Effects.filter(obj => obj.category == currentCategory && obj.scale == sheetName && obj.name == selection)
  
  Description.value = chosenEffect[0].description
  
  Modifier.value = chosenEffect[0].modifier

  Reaction.value = chosenEffect[0].reaction

  Title.value = chosenEffect[0].name

  }

}

document.getElementById('effectEntries').onchange = function () {

  fillEffectDescriptions()

}

 //-----------------------------------------------------------------------------
          // STORYTELLER
          const newLine = " <br> <br> "; //carriage return and newline.

          document.getElementById('clearStory').onclick = function () {

            storyTeller.innerHTML = ""
          
          }
          
          function copyQuestions(){

          document.getElementById('Reading_QA').innerHTML  =  document.getElementById('QA').value
          document.getElementById('Reading_QB').innerHTML  =  document.getElementById('QB').value
          document.getElementById('Reading_QC').innerHTML  =  document.getElementById('QC').value 
          document.getElementById('Reading_QD').innerHTML  =  document.getElementById('QD').value 
          document.getElementById('Reading_QE').innerHTML  =  document.getElementById('QE').value
                  
          }

          function noQuestions(){

            document.getElementById('Reading_QA').innerHTML  =  ''
            document.getElementById('Reading_QB').innerHTML  =  ''
            document.getElementById('Reading_QC').innerHTML  =  ''
            document.getElementById('Reading_QD').innerHTML  =  '' 
            document.getElementById('Reading_QE').innerHTML  =  ''

            document.getElementById("AskQA").style.display = "none";
            document.getElementById("AskQB").style.display = "none";
            document.getElementById("AskQC").style.display = "none";
            document.getElementById("AskQD").style.display = "none";
            document.getElementById("AskQE").style.display = "none";
                    
            }

          var BorrowedDesc = []

          function fillStoryteller(){

           
            const storyTeller = document.getElementById("storyTeller") 
                       
            var  Location = currentLocation[0].location
            var  Category = currentLocation[0].category
            var Message

            //Collect all similar entries. 
            BorrowedDesc = []
            BorrowedDesc = carto.filter(obj => obj.category == Category)

            
            
            console.log('')
            console.log('+++++++++ FILL STORYTELLER ++++++++++')
            console.log('DESCRIPTIONS TO BORROW FROM:')
            console.table(BorrowedDesc)

            if( sheetName == "Global"){

              storyTeller.innerHTML += "<span style='color:#FFB6C1'> [***]  </span>";
              Message = "You are at the "  + Category +  " of " + Location + "." + newLine    
          
            }else if(sheetName == "Local"){
          
              storyTeller.innerHTML += "<span style='color:#87CEFA'> [**]  </span>";
              Message = "You are at " + Location + "'s "  + Category +  "." + newLine
          
            }else if(sheetName == "Dungeon"){
          
              storyTeller.innerHTML += "<span style='color:#FFD700'> [*]  </span>";
              Message =  Location + newLine  + Category + newLine
          
            }

          
            
            if( Location.length > 0 ){
            
            storyTeller.innerHTML += Message
          
          }}

        

          document.getElementById('AskQA').onclick = function () {

           

          try{   

            var weatherDesc = document.getElementById('WeatherDesc').value;
            var weatherMod = document.getElementById('WeatherMod').value;
            var weatherReact =  document.getElementById('WeatherReact').value;

            console.log('+++++++++ FOUND WEATHER ++++++++++')
            console.log(weatherDesc)

          }catch{

            var weatherDesc = 'It is a grey day.'
            var weatherMod = ''
            var weatherReact = ''

          }

            const storyTeller = document.getElementById("storyTeller") 
            
            var  newText = document.getElementById("TextA").value
            var isBorrowing = 0

            if(newText.length == 0){    
           
                      
              var options = 0

              for (var i = 0; i < BorrowedDesc.length; i++) {

                let check = BorrowedDesc[i].desc1  

                //console.log(check)

                if(check.length > 0){

                  options ++

                }   
              }

              //console.log('+++++++++ TEST ++++++++++')
              //console.table(options)
            
              const choice = Math.floor(Math.random() * options)
             
               newText = BorrowedDesc[choice].desc1; 
               isBorrowing = 1
               
            }
            
              if(isBorrowing == 1){
              storyTeller.innerHTML += weatherDesc + newLine 
              storyTeller.innerHTML += "<span style='color:#FF0000'> [Borrowed]  </span>";
              storyTeller.innerHTML +=  newText + newLine + weatherMod
              }else{
              storyTeller.innerHTML += weatherDesc + newLine + newText + newLine + weatherMod + newLine
              }

              selectEffects = []
              monsters = []
              var npc1 = currentLocation[0].onenpc
              var npc2 = currentLocation[0].twonpc
              var npc3 = currentLocation[0].threenpc
              var eff1 = currentLocation[0].effectone
              var eff2 = currentLocation[0].effecttwo
              var eff3 = currentLocation[0].effectthree

              monsters = npcArray.filter(obj => obj.npcname == npc1 && obj.scale == sheetName)
              selectEffects = Effects.filter(obj => obj.name == eff1 && obj.scale == sheetName)
              console.table(monsters)
              
              
  if( sheetName == "Global"){

    
    //storyTeller.innerHTML += "<span style='color:#FF0000'> [NPCs] </span>";   
    
    //There is an orange ball
    storyTeller.innerHTML +=  selectEffects[0].description + newLine;       
    // A man is here. 
    storyTeller.innerHTML += "A network known as "
    storyTeller.innerHTML +=  currentLocation[0].onenpc 
    storyTeller.innerHTML += " has agents here." + newLine
    //They are bouncing the ball.
    storyTeller.innerHTML +=  selectEffects[0].modifier + newLine;  
   
    
  
    document.getElementById("Expand").style.display = "block";

    document.getElementById("Reading_QA").style.display = "none";
    document.getElementById("AskQA").style.display = "none";

  }else if(sheetName == "Local"){

    storyTeller.innerHTML +=  selectEffects[0].description + newLine;
    storyTeller.innerHTML += "A group of  "
    //storyTeller.innerHTML += "<span style='color:#FF0000'> [NPCs] </span>";              
    storyTeller.innerHTML +=  currentLocation[0].onenpc 
    storyTeller.innerHTML += " are here. " 
    storyTeller.innerHTML +=  selectEffects[0].modifier + newLine;  
    storyTeller.innerHTML +=  selectEffects[0].reaction + newLine; 

    document.getElementById("Expand").style.display = "block";

    document.getElementById("Reading_QA").style.display = "none";
    document.getElementById("AskQA").style.display = "none";

  }else if(sheetName == "Dungeon"){

    storyTeller.innerHTML +=  selectEffects[0].description + newLine;
    storyTeller.innerHTML += "BEWARE! There may be a  "
    //storyTeller.innerHTML += "<span style='color:#FF0000'> [NPCs] </span>";              
    storyTeller.innerHTML +=  currentLocation[0].onenpc + '. '
  
    document.getElementById("Expand").style.display = "block";

    document.getElementById("Reading_QA").style.display = "none";
    document.getElementById("AskQA").style.display = "none";

  }


            

          }

          var npcExpand = 0

          document.getElementById('Expand').onclick = function () {
                        

              if(npcExpand == 0){
              //storyTeller.style = "color: cyan;"    
              storyTeller.innerHTML +=  monsters[0].npc1 + newLine;
              npcExpand++

              }else if(npcExpand == 1){

                storyTeller.innerHTML +=  monsters[0].npc2 + newLine;
                npcExpand++
  
                }else if(npcExpand == 2){

                  storyTeller.innerHTML +=  monsters[0].npc3 + newLine;
                  npcExpand = 0
                  document.getElementById("Expand").style.display = "none";
    
                  }


                  document.getElementById('sidebar').scrollTop = objDiv.scrollHeight;
          }

          document.getElementById('AskQB').onclick = function () {

            

            const storyTeller = document.getElementById("storyTeller") 
           
            var  newText = document.getElementById("TextB").value

            var isBorrowing = 0

            if(newText.length == 0){    
                                 
              var options = 0

              for (var i = 0; i < BorrowedDesc.length; i++) {

                let check = BorrowedDesc[i].desc2  

                console.log(check)

                if(check.length > 0){

                  options ++

                }   
              }

              //console.log('+++++++++ TEST ++++++++++')
              //console.table(options)
            
              const choice = Math.floor(Math.random() * options)
             
               newText = BorrowedDesc[choice].desc2; 
               isBorrowing = 1
               
            }

            if(isBorrowing == 1){
              storyTeller.innerHTML += newLine
              storyTeller.innerHTML += "<span style='color:#FF0000'> [Borrowed]  </span>";
              storyTeller.innerHTML += newText 
              }else{
              storyTeller.innerHTML += newLine  + newText 
              }

            document.getElementById("Reading_QB").style.display = "none";
            document.getElementById("AskQB").style.display = "none";

            document.getElementById('sidebar').scrollTop = objDiv.scrollHeight;

          }

          document.getElementById('AskQC').onclick = function () {

            

            const storyTeller = document.getElementById("storyTeller") 
           
            var  newText = document.getElementById("TextC").value
      

            var isBorrowing = 0

            if(newText.length == 0){    
           
                      
              var options = 0

              for (var i = 0; i < BorrowedDesc.length; i++) {

                let check = BorrowedDesc[i].desc3  

                console.log(check)

                if(check.length > 0){

                  options ++

                }   
              }

              //console.log('+++++++++ TEST ++++++++++')
              //console.table(options)
            
              const choice = Math.floor(Math.random() * options)
             
               newText = BorrowedDesc[choice].desc3; 
               isBorrowing = 1


               
            }

            if(isBorrowing == 1){
              storyTeller.innerHTML += newLine
              storyTeller.innerHTML += "<span style='color:#FF0000'> [Borrowed]  </span>";
              storyTeller.innerHTML += newText
              }else{
              storyTeller.innerHTML += newLine  + newText 
              }

            document.getElementById("Reading_QC").style.display = "none";
            document.getElementById("AskQC").style.display = "none";

            document.getElementById('sidebar').scrollTop = objDiv.scrollHeight;

          }

          document.getElementById('AskQD').onclick = function () {

           
            

            const storyTeller = document.getElementById("storyTeller") 
            
            var  newText = document.getElementById("TextD").value

            var isBorrowing = 0

            if(newText.length == 0){    
           
                      
              var options = 0

              for (var i = 0; i < BorrowedDesc.length; i++) {

                let check = BorrowedDesc[i].desc4  

                console.log(check)

                if(check.length > 0){

                  options ++

                }   
              }

              //console.log('+++++++++ TEST ++++++++++')
              //console.table(options)
            
              const choice = Math.floor(Math.random() * options)
             
               newText = BorrowedDesc[choice].desc4; 
               isBorrowing = 1
               
            }

            if(isBorrowing == 1){
              storyTeller.innerHTML += newLine
              storyTeller.innerHTML += "<span style='color:#FF0000'> [Borrowed]  </span>";
              storyTeller.innerHTML += newText 
              }else{
              storyTeller.innerHTML += newLine  + newText 
              }

            document.getElementById("Reading_QD").style.display = "none";
            document.getElementById("AskQD").style.display = "none";

            document.getElementById('sidebar').scrollTop = objDiv.scrollHeight;

          }

          document.getElementById('AskQE').onclick = function () {

            document.getElementById('sidebar').scrollTop = objDiv.scrollHeight;

            const storyTeller = document.getElementById("storyTeller") 
             
              var  newText = document.getElementById("TextE").value

              var isBorrowing = 0

              if(newText.length == 0){    
             
                        
                var options = 0
  
                for (var i = 0; i < BorrowedDesc.length; i++) {
  
                  let check = BorrowedDesc[i].desc5  
  
                  console.log(check)
  
                  if(check.length > 0){
  
                    options ++
  
                  }   
                }
  
                //console.log('+++++++++ TEST ++++++++++')
                //console.table(options)
              
                const choice = Math.floor(Math.random() * options)
               
                 newText = BorrowedDesc[choice].desc5; 
                 isBorrowing = 1
                 
              }

              if(isBorrowing == 1){
                storyTeller.innerHTML += newLine
                storyTeller.innerHTML += "<span style='color:#FF0000'> [Borrowed]  </span>";
                storyTeller.innerHTML += newText
                }else{
                storyTeller.innerHTML += newLine  + newText 
                }

              document.getElementById("Reading_QE").style.display = "none";
              document.getElementById("AskQE").style.display = "none";

              document.getElementById('sidebar').scrollTop = objDiv.scrollHeight;

          }

           
//-----------------------------------------------------------------------------
// DRAW MAP!
var mapwidth = 3800
var mapheight = 1600
const p = 0;
var tileSize = 16;

const EndX = Math.floor(mapheight/tileSize)
const EndY = Math.floor(mapwidth/tileSize)

//-----------------------------------------------------------------------------
//SHORTHANDS FOR DIVS IN HTML

const gridImg = document.getElementById("gridImg");
const gridImgCTX = gridImg.getContext("2d");

const gridBtm = document.getElementById("gridBtm");
const gridBtmCTX = gridBtm.getContext("2d");

const gridMid = document.getElementById("gridMid");
const gridMidCTX = gridMid.getContext("2d");

const gridTop = document.getElementById("gridTop");
const gridTopCTX = gridTop.getContext("2d");

//-----------------------------------------------------------------------------

const Palette = document.getElementById("Palette");
const PaletteCTX = Palette.getContext("2d");

let colourSize = 36
let widthPalette = Palette.style.width
let heightPalette = Palette.style.height

const Sidebar = document.getElementById("sidebarwrapper");

//-----------------------------------------------------------------------------

document.getElementById('showInventory').onclick = function () {
  document.getElementById("popUp").style.display = "block";
  document.getElementById("hideInventory").style.display = "block";
  document.getElementById("showInventory").style.display = "none";
   document.getElementById("wrapper").style.width = "100%";

   document.getElementById("sidebarwrapper").style.display = "none";


  document.getElementById('wrapper').scrollLeft = 0;
   
    fillCharacterSheet()

}

document.getElementById('hideInventory').onclick = function () {
  document.getElementById("popUp").style.display = "none";
  document.getElementById("hideInventory").style.display = "none";
  document.getElementById("wrapper").style.width = "75%";
  document.getElementById("showInventory").style.display = "block";
  document.getElementById("sidebarwrapper").style.display = "block";
}


document.getElementById('Usertype').onchange = function () {

if(document.getElementById('Usertype').value == 0){
  //PLAYER
  document.getElementById('Activity').style= "display: none; float: right; background-color: rgb(0, 0, 0); color: violet"
  document.getElementById('Playing').style = "display: block"

  document.getElementById('Activity').value  = 3
  
checkSidebar();


}else if(document.getElementById('Usertype').value == 1){

  //DUNGEON MASTER
  document.getElementById('Playing').style  = "display: none"

  if(document.getElementById("popUp").style.display = "block"){
    document.getElementById("popUp").style.display = "none";
    document.getElementById("hideInventory").style.display = "none";
    document.getElementById("showInventory").style.display = "block";
  }else{
    document.getElementById("popUp").style.display = "none";
    document.getElementById("hideInventory").style.display = "none";
    document.getElementById("showInventory").style.display = "block";
  }
 
  document.getElementById('popUp').style  = "display: none"



  document.getElementById('Activity').style = "display: block; float: right; background-color: rgb(0, 0, 0); color: violet"

  document.getElementById('Activity').value  = 0
  
checkSidebar();

}}

document.getElementById('Activity').onchange = function () {

  checkSidebar();

}

function checkSidebar(){

var Painting = document.getElementById("Painting"); //2
var Writing =  document.getElementById("Writing"); //1
var Reading =  document.getElementById("Reading"); //0
var Playing =  document.getElementById("Playing"); //3
var mapForm =  document.getElementById("mapForm"); //3
var Activity = document.getElementById("Activity").value;

if (Activity == 2) {
  Painting.style.display = "block";
  Writing.style.display = "none";
  Reading.style.display = "none";
  mapForm.style.display = "none";
 
} else if (Activity == 1) {
  Painting.style.display = "none";
  Writing.style.display = "block";
  Reading.style.display = "none";
  mapForm.style.display = "none";
  paintCheck = 0;
} else if (Activity == 0) {
  Painting.style.display = "none";
  Writing.style.display = "none";
  Reading.style.display = "block";
  mapForm.style.display = "none";
  paintCheck = 0;
} else if (Activity == 3) {
  Painting.style.display = "none";
  Writing.style.display = "none";
  Reading.style.display = "none";
  mapForm.style.display = "none";
  paintCheck = 0;

} else if (Activity == 4) {
  Painting.style.display = "none";
  Writing.style.display = "none";
  Reading.style.display = "none";
  Playing.style.display = "none";
  mapForm.style.display = "block";
  paintCheck = 0;

}}




function loopMap(){
//Contains all map elements included in the Gameloop, permMap() contains those left out.
PaletteCTX.clearRect(0, 0, mapwidth, mapheight);
gridBtmCTX.clearRect(0, 0, mapwidth, mapheight);
gridMidCTX.clearRect(0, 0, mapwidth, mapheight);
//The carto array is used to paint the map.
drawGridlines();

fillMap(); 


drawPalette()
drawLabels();
drawUser();



}

function permMap(){
//Contains all map elements not included in the Gameloop, permMap() contains those left in.
gridBtmCTX.clearRect(0, 0, mapwidth, mapheight);
gridTopCTX.clearRect(0, 0, mapwidth, mapheight);
//Draws out Blank Map
//drawBlackground();

try{
questions = []  
LoadQuestions();
}catch{
  console.log('!!!!! Could not complete LoadQuestions() !!!!!')
}

try{
Effects = []  
LoadEffects();
  }catch{
  console.log('!!!!! Could not complete LoadEffects() !!!!!')
  }

try{
  npcArray = []  
  LoadNPCs();
    }catch{
    console.log('!!!!! Could not complete  LoadNPCs() !!!!!')
    }

try{
//colours = []
LoadColours();
}catch{
  console.log('!!!!! Could not complete LoadColours() !!!!!')
}

try{
carto = []
LoadMap();
}catch{
  console.log('!!!!! Could not complete LoadMap() !!!!!')
}

try{
  weather = []
  LoadWeather();
 
  }catch{
    console.log('!!!!! Could not complete LoadWeather()) !!!!!')
  }




}

function drawBlackground() {
  for (var x = 0; x <= mapwidth; x += tileSize) {
    for (var y = 0; y <= mapheight; y += tileSize) {
      gridBtmCTX.fillStyle = "black";
      gridBtmCTX.moveTo(p, 0.5 + x + p);
      gridBtmCTX.fillRect(x, y, tileSize, tileSize);
    }
  }
}

function drawBackImage(){

  var backImage = new Image()
  let backImageURl = document.getElementById("backgroundImage").value 
  
  backImage.src = backImageURl

  try{

  let backHeight = backImage.naturalHeight * backImageMod
  let backWidth = backImage.naturalWidth * backImageMod

  gridImgCTX.clearRect(0, 0, mapwidth, mapheight);
  gridImgCTX.drawImage(backImage,backImageXMod,backImageYMod,backWidth,backHeight)

  

  document.getElementById("imageHeight").value = backHeight
  document.getElementById("imageWidth").value = backWidth

  }catch{}

}



function drawGridlines() {

  drawBackImage()
  
  gridBtmCTX.beginPath()

  for (var x1 = 0; x1 <= mapwidth; x1 += tileSize) {
    
    gridBtmCTX.moveTo(0.5 + x1 + p, p);
    gridBtmCTX.lineTo(0.5 + x1 + p, mapheight + p);
  }
  
  for (var x2 = 0; x2 <= mapheight; x2 += tileSize) {
    
    gridBtmCTX.moveTo(p, 0.5 + x2 + p);
    gridBtmCTX.lineTo(mapwidth + p, 0.5 + x2 + p);
  }
  gridBtmCTX.strokeStyle = gridColour;
  gridBtmCTX.stroke();
}

//-----------------------------------------------------------------------------
// CHANGE BACKGROUND IMAGE, COLOUR AND GRIDLINES!

document.getElementById('SubmitWeather').onclick = function () {
  document.getElementById('mapData_isWeather').value = "1";
  document.forms['mapData'].dispatchEvent(new Event('submit'));
  document.getElementById('mapData_isWeather').value = "0";
}

document.getElementById('submitEffect').onclick = function () {
  document.getElementById('mapData_isEffect').value = "1";
  document.forms['mapData'].dispatchEvent(new Event('submit'));
  document.getElementById('mapData_isEffect').value = "0";
}

document.getElementById('submitNPC').onclick = function () {
  document.getElementById('mapData_isNPC').value = "1";
  document.forms['mapData'].dispatchEvent(new Event('submit'));
  document.getElementById('mapData_isNPC').value = "0";
}

document.getElementById('saveItem').onclick = function () {
  document.getElementById('mapData_isInventory').value = "1";

  document.forms['mapData'].dispatchEvent(new Event('submit'));
 
  console.log('')
  console.log('+++++ SENDING SAVE_ITEM() +++++')
 
  document.getElementById('mapData_isInventory').value = "0";
  //document.getElementById('mapData_isNewItem').value = "0"
  
}

document.getElementById('run_permMap').onclick = function () {
 
    //bookmark
   
    permMap()


  }

document.getElementById('enlargeImage').onclick = function () {
backImageMod = backImageMod * 1.1
}

document.getElementById('reduceImage').onclick = function () {
backImageMod = backImageMod * 0.9      
}

document.getElementById('imageLeft').onclick = function () {
backImageXMod = backImageXMod - tileSize              
}
  
document.getElementById('imageRight').onclick = function () {
backImageXMod = backImageXMod + tileSize
}
      
document.getElementById('imageUp').onclick = function () {
backImageYMod = backImageYMod - tileSize
}
          
document.getElementById('imageDown').onclick = function () {
backImageYMod = backImageYMod + tileSize
}
                                 
document.getElementById('rotateLeft').onclick = function () {
  gridImgCTX.clearRect(0, 0, mapwidth, mapheight);
gridImgCTX.rotate(-5 * Math.PI / 180)
}

document.getElementById('rotateRight').onclick = function () {
  gridImgCTX.clearRect(0, 0, mapwidth, mapheight);
  gridImgCTX.rotate(5 * Math.PI / 180)
}

//Change background colour
document.getElementById("backFill").onchange = function(){

  var background = document.getElementById("wrapper")
  var backFill = document.getElementById("backFill").value
  
 background.style.backgroundColor = backFill;
  
  }

  //Change grid colour
document.getElementById("gridColour").onchange = function(){

  
  gridColour = document.getElementById("gridColour").value
  permMap()
  
  }


function fillMap(){

let CTX = gridMidCTX



//console.log('running FillMap()')
CTX.globalAlpha = 1

  for (let i = 0; i < carto.length; i++) {

        let fill = carto[i].fill
        let x = carto[i].x
        let y = carto[i].y
        let z = carto[i].z


if (rz == 1 ){

  //Oikos Focus

  if(z == 0){

    CTX.globalAlpha = 0.8

  }else if( z == 1 && fill == "peru"){

    CTX.globalAlpha = 0.6

  } else {

    CTX.globalAlpha = 1

  }

} else if (rz == 0){

  if(z == 1){

    CTX.globalAlpha = 0.5

  }else{

    CTX.globalAlpha = 1

  }
}
      
CTX.fillStyle = fill;
CTX.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
         
          if(x == rx && y == ry){

            //rz = carto[i].z
          
          }  }  }

  function paint() {

    document.getElementById('Location').value =  ""
    document.getElementById('Category').value = ""
    //document.getElementById('paintFill').value = currentLocation[0].fill
    document.getElementById('TextA').value = ""
    document.getElementById('TextB').value = ""
    document.getElementById('TextC').value = ""
    document.getElementById('TextD').value = ""
    document.getElementById('TextE').value = ""
    document.getElementById("Expand").style.display = "none";
             
  gridTopCTX.fillStyle = paintColour;

           //mapCTX.fillStyle = paintColour;
           //gridCTX.fillStyle = paintColour;
                 
            //PAINTS THE SQUARE
            console.log('')
            console.log('+++++++++PAINTING DATA++++++++++')
            console.log('Painting ' + gridTopCTX.fillStyle  + ' at ' + rx + ',' + ry)

            //mapCTX.fillRect(rx * tileSize, ry * tileSize, tileSize, tileSize)
            //gridBtmCTX.fillRect(rx * tileSize, ry * tileSize, tileSize, tileSize)

    gridTopCTX.fillRect(rx * tileSize, ry * tileSize, tileSize, tileSize)
    paintArray.push({x:rx, y: ry, z: rz, fill: paintColour})
           
          }

          
          function sleep(milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
              currentDate = Date.now();
            } while (currentDate - date < milliseconds);
          }
          

          document.getElementById('clearButton').onclick = function () {

            paintArray = []

            gridTopCTX.clearRect(0, 0, mapwidth, mapheight);

          }

          document.getElementById('undoButton').onclick = function () {

            //console.table(paintArray)

            var lastEntry = paintArray.length - 1
            var lastX = paintArray[lastEntry].x
            var LastY =  paintArray[lastEntry].y

            //console.log('')
            //console.log('+++++++++ DELETING LAST ENTRY ++++++++++')
            //console.log(lastX + ',' + LastY)
       
            gridTopCTX.clearRect(lastX * tileSize, LastY * tileSize, tileSize, tileSize);

            paintArray.pop()

      

          }

        

         

          //WHEN CLICK 'SAVEALL' BUTTON
          //-----------------------------------------------------------------------------
          

document.getElementById('paintButton').onclick = function () {

 
  console.log('+++++++++ SAVING PAINT DATA ++++++++++')
  console.table(paintArray)
  //console.log(paintArray.length + ' rows to save.')

  try {

    //Clear the form before filling it. 

      document.getElementById('mapData_X').value         = ''
      document.getElementById('mapData_Y').value         = ''
      document.getElementById('mapData_Z').value         = ''
      document.getElementById('mapData_uniqueID').value  = ''
      document.getElementById('mapData_parentID').value  = ''
      document.getElementById('mapData_fill').value      = ''

      
    for (let i = 0; i < paintArray.length; i++) {

      uniqueID = `${parentID}-${paintArray[i].x}-${paintArray[i].y}-${paintArray[i].z}`
  
      // append each item and have them delimited by a comma
    
      document.getElementById('mapData_X').value        += `${paintArray[i].x},`
      document.getElementById('mapData_Y').value        += `${paintArray[i].y},`
      document.getElementById('mapData_Z').value        += `${paintArray[i].z},`
      document.getElementById('mapData_uniqueID').value += `${uniqueID},`
      document.getElementById('mapData_parentID').value += `${parentID},`
      document.getElementById('mapData_fill').value     += `${paintArray[i].fill},`
      
    }

      document.getElementById("mapData_sheetName").value = sheetName
      document.getElementById("mapData_user").value = rUsername
      
      document.forms['mapData'].dispatchEvent(new Event('submit'));

    paintArray = []
    console.log('')
    console.log('+++++++++ DATA SAVED SUCCESFULLY ++++++++++')

  } catch {
    console.log('')
    console.log('+++++++++ PAINT DATA SAVE FAILED ++++++++++')

  }}




function filterCarto(){

//filters Carto for data on current location  


  var rXYZ = {
    x: rx,
    y: ry,
    z: rz,
  };


  console.log('')
  console.log('+++++++++CURRENT LOCATION++++++++++')
  //console.log(rXYZ)
  try{
  currentLocation = carto.filter(obj => obj.x == rXYZ.x && obj.y == rXYZ.y && obj.z == rXYZ.z)
 
  console.table(currentLocation[0])}catch{ console.log('No record for this location?') }
  console.log(currentLocation.length + ' records found.')
  console.log('(X: ' + rx+','+'Y: ' + ry+','+'Z: ' + rz +')')
  console.log('FPS: ' +fps);

  try{

  //EDITOR VARIABLES

    document.getElementById('Location').value =  ""
    document.getElementById('Category').value = ""
    //document.getElementById('paintFill').value = currentLocation[0].fill
    document.getElementById('TextA').value = ""
    document.getElementById('TextB').value = ""
    document.getElementById('TextC').value = ""
    document.getElementById('TextD').value = ""
    document.getElementById('TextE').value = ""
    document.getElementById("Expand").style.display = "none";

   
    document.getElementById('Location').value =  currentLocation[0].location
    document.getElementById('Category').value = currentLocation[0].category
    //document.getElementById('paintFill').value = currentLocation[0].fill
    document.getElementById('TextA').value = currentLocation[0].desc1
    document.getElementById('TextB').value = currentLocation[0].desc2
    document.getElementById('TextC').value = currentLocation[0].desc3
    document.getElementById('TextD').value = currentLocation[0].desc4
    document.getElementById('TextE').value = currentLocation[0].desc5

  }catch{

 
  }
    
//Queries sheet and returns user positions. 


fillStoryteller();

  
  }
  
 
function drawLabels(){

  //console.log('')
  //console.log('+++++++++DRAWING  LABELS++++++++++')

  var currentLabel 
  var CTX = gridMidCTX
   
  CTX.globalAlpha = 1
  

for (let i = 0; i < carto.length; i++) {
        
      let location = carto[i].location 
      let category = carto[i].category  

      if(carto[i].z == 1){
      
      if( flashing == 0){

        currentLabel = location
    
      }else if(flashing == 1){

        currentLabel = category

      }else{ currentLabel = ""}

    }else{ currentLabel = location}


      //console.log(location)
      
                 if(location.length>0){
                   
                  let ix = carto[i].x * tileSize + (tileSize * 1.2)
                  let iy = carto[i].y * tileSize
                  let iwidth = currentLabel.length * 9
                  let iheight =  tileSize
                  
                  
                  //if(rx == carto[i].x && ry == carto[i].y){

                  //Behind Name
                  CTX.fillStyle = 'black'
                  CTX.fillRect(ix,iy,iwidth,iheight);
                  //Write name
                  CTX.font = "14px Courier";;
                  CTX.fillStyle = 'wheat';
                  
                    

                  //PAINTS LOCATION NAMES
                  CTX.fillText(currentLabel,ix+ 0.15 * tileSize, iy + 0.75 * tileSize);
                  //} 

                }             
                            
              }
                 
            }

                function drawUser(){

                  gridMidCTX.globalAlpha = 1

                  rUser = document.getElementById("user").value

                  gridMidCTX.strokeStyle = "orange";
                  gridMidCTX.strokeRect(rx * tileSize, ry * tileSize,tileSize,tileSize);
                  //Behind Name
                  gridMidCTX.fillStyle = 'black'
                  gridMidCTX.fillRect(rx * tileSize + (tileSize * 1.2), ry * tileSize + tileSize, rUser.length * 11, tileSize);
                  //Write name
                  gridMidCTX.font = "14px Courier";
                  gridMidCTX.fillStyle = 'orange';
                  gridMidCTX.fillText(rUser, rx * tileSize + (tileSize * 1.2) + 6, ry * tileSize + (tileSize) * 1.75 );


                  for (var i = 0; i < users.length; i++) {

                  //User Information
                                     

                  let user = users[i].username
                  let x = (users[i].x * tileSize)
                  let y = (users[i].y * tileSize) 
                  let xward = user.length * 10
                  let yward = tileSize

                  if(user == rUser){

                  }else{                            
                  //Draw Selection 
                  
                  gridMidCTX.strokeStyle = "orange";
                  gridMidCTX.strokeRect(x,y,tileSize,tileSize);

                  gridMidCTX.strokeStyle = "pink";
                  
                  
                  //Behind Name
                  gridMidCTX.fillStyle = 'black'
                  gridMidCTX.fillRect(x + (tileSize * 1.2), y+ tileSize, xward, yward);
                  //Write name
                  gridMidCTX.font = "14px Courier";
                  gridMidCTX.fillStyle = 'orange';
                  gridMidCTX.fillText(user, x + (tileSize * 1.2) + 6, y + (tileSize) * 1.75 );

                  

                  }}
                
                //Mouse Location    
                gridMidCTX.strokeStyle = "white";
                gridMidCTX.strokeRect(mousex * tileSize, mousey * tileSize,tileSize,tileSize);
                
                gridMidCTX.globalAlpha = 0.3
                gridMidCTX.fillStyle = 'white';
                gridMidCTX.fillRect(mousex * tileSize, mousey * tileSize,tileSize,tileSize);

                gridMidCTX.globalAlpha = 1

                //Palette Mouse Location    
                PaletteCTX.strokeStyle = "white";
                PaletteCTX.strokeRect(Pmousex * colourSize, Pmousey * colourSize,colourSize,colourSize);
                
                PaletteCTX.globalAlpha = 0.3
                PaletteCTX.fillStyle = 'white';
                PaletteCTX.fillRect(Pmousex * colourSize, Pmousey * colourSize,colourSize,colourSize);

                PaletteCTX.globalAlpha = 1


                

                }

                
     
//-----------------------------------------------------------------------------

// EVERYTHING THAT HAPPENS WHEN YOU MOVE
function Move(){

//Everything that happens when we move either by mouse or wasd
//Load Users and Current Locations
try{
  LoadUsers();  
  users = []
  }catch{
    console.log('!!!!! Could not complete LoadUsers()) !!!!!')
  }

    try{
      getWeather() 
      
      }catch{
        console.log('!!!!! Could not complete getWeather()) !!!!!')
      }
  
    

    
//Update the uniqueID
uniqueID = parentID +'-'+ rx +'-'+ ry +'-'+ rz;


//Clear Writer
rLocation = ""
rCategory = ""
document.getElementById('mapData_X').value = rx
document.getElementById('mapData_Y').value = ry
document.getElementById('mapData_Z').value = rz

document.getElementById('uniqueID').value = uniqueID
document.getElementById('parentID').value = parentID

document.getElementById('QA').value = ""
textAcontents = ""
document.getElementById('QB').value = ""
textBcontents = ""
document.getElementById('QC').value  = ""
textCcontents = ""
document.getElementById('QD').value  = ""
textDcontents = ""
document.getElementById('QE').value = ""
textEcontents = ""
rFill = ""


try{
  currentLocation = []
  filterCarto()
  console.log('!!!!!  filterCarto() Completed Succesfully !!!!!')
  }catch{
    noQuestions()
    console.log('!!!!! Could not complete filterCarto() !!!!!')
    
    document.getElementById('storyTeller').innerHTML += newLine 
    document.getElementById('storyTeller').innerHTML += "<span style='color:#40E0D0'> [*]  </span>";
    document.getElementById('storyTeller').innerHTML += newLine 

    document.getElementById('sidebar').scrollTop = objDiv.scrollHeight;
    
  }




try{
  getQuestions()
  copyQuestions()
  console.log('!!!!!  getQuestions() Completed Succesfully !!!!!')
  }catch{
    noQuestions()
    console.log('!!!!! Could not complete  getQuestions() !!!!!')
  }


try{
  getEffects()
  fillEffectsDropdowns()
  console.log('!!!!! getEffects() Completed Succesfully !!!!!')
  }catch{
    console.log('!!!!! Could not complete getEffects()) !!!!!')
  }

  try{
    getNPCs()
    fillNPCDropdowns()
    fillNPCQuestions()
    fillNPCDescriptions()
    
    console.log('!!!!!  getNPCs() Completed Succesfully !!!!!')
    }catch{
      console.log('!!!!! Could not complete  getNPCs()) !!!!!')
    }


    document.getElementById('sidebar').scrollTop = objDiv.scrollHeight;

}


//-----------------------------------------------------------------------------

// MOUSE TRACKING IN GRID

gridTop.addEventListener('mousedown', e => {
  
  x = e.offsetX;
  y = e.offsetY;
  //z = 0

  rx = Math.floor( x / tileSize) 
  ry = Math.floor( y / tileSize) 
  rz = document.getElementById('zLayer').value  

  Move()

    
});



gridTop.addEventListener('mouseup', e => {
  


  if(paintCheck === 1){
          
        paint()

 
  }
  
  console.log('')
  console.log('+++++++++DEVELOPER VARIABLES++++++++++')
  console.log('(x: ' + x+','+' y: ' + y+')')
  console.log('(rx: ' + rx+','+' ry: ' + ry+','+' rz: ' + rz+')')
  console.log('FPS: ' + fps);
  console.log('Active Element: ' + activeElement);
  console.log('paintCheck: ' + paintCheck)
  console.log('ParentID: ' + parentID)
  console.log('uniqueID: ' + uniqueID)
    
  //mapData()
 
    }
    
);

gridTop.addEventListener('mousemove', e => {
  
  x = e.offsetX;
  y = e.offsetY;

  mousex = Math.floor( x / tileSize) 
  mousey = Math.floor( y / tileSize) 

  //console.log('(x: ' + x+','+' y: ' + y+')')

});


//-----------------------------------------------------------------------------

// PALETTE SECTION

Palette.addEventListener('mousedown', e => {
  
  x = e.offsetX;
  y = e.offsetY;
 

  Px = Math.floor( x / colourSize) 
  Py = Math.floor( y / colourSize) 
 
   
});



Palette.addEventListener('mouseup', e => {
 
  const colourSelection = PaletteArray.filter(obj => obj.x == Px && obj.y == Py )
  paintColour = colourSelection[0].fill
  paintCheck = 1;
  
  console.log('')
  console.log('+++++++++PALETTE CLICKED++++++++++')
  console.log('(x: ' + x+','+' y: ' + y+')')
  console.log('(Px: ' + Px+','+' Py: ' + Py+')')
  console.log('(Px: ' + Px+','+' Py: ' + Py+')')
  console.log(paintColour + ' selected.')
  

    }
    
);

Palette.addEventListener('mousemove', e => {
  
  x = e.offsetX;
  y = e.offsetY;

  Pmousex = Math.floor( x / colourSize) 
  Pmousey = Math.floor( y / colourSize) 

  
  //console.log('(x: ' + x+','+' y: ' + y+')')

});


function drawPalette() {
 

  widthPalette = colourSize * 10
  heightPalette = colourSize * 20
   
  fillPalette()

  PaletteCTX.beginPath()

  for (var x1 = 0; x1 <= widthPalette; x1 += colourSize) {
    
    PaletteCTX.moveTo(0.5 + x1 + p, p);
    PaletteCTX.lineTo(0.5 + x1 + p, heightPalette + p);
  }
  
  for (var x2 = 0; x2 <= heightPalette; x2 += colourSize) {
    
    PaletteCTX.moveTo(p, 0.5 + x2 + p);
    PaletteCTX.lineTo(widthPalette + p, 0.5 + x2 + p);
  }

  PaletteCTX.strokeStyle = "wheat";
  PaletteCTX.stroke();

}

function fillPalette(){

  let PaletteEndX = (widthPalette / colourSize) 
  let PaletteEndY = (heightPalette / colourSize) 


 var i = 0
  
 try{

      for (var y = 0; y <= 19; y += 1) {

        for (var x = 0; x <= 9; x += 1) {
    
        let fill = PaletteArray[i].fill
       
        PaletteCTX.fillStyle = fill;

    //console.log(fill)
     
    PaletteCTX.fillRect(x * colourSize, y * colourSize, colourSize, colourSize)

    i++

  }}}catch{

    //console.log('')
    //console.log('+++++++++PALETTE FAILED++++++++++')
    //console.log('Crash X : ' + x)
    //console.log('Crash Y : ' + y)
    //console.log('Crash i : ' + i)


  }}

function LoadColours(){

  //Connection to Google Sheet
 //Sheet URL between /d/ and /edit/
 const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
 const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
 //SPECIFICS THAT CHANGE
 const sheet = 'Palette'
 const qu = 'Select *';
 const query = qu
 //AGGREGATE
 const url = `${base}&sheet=${sheet}&tq=${query}`;
 //const output = document.querySelector('.output');
 console.log('')
 console.log('++++++++LOAD COLOURS+++++++++++')
 console.log('Connection to ' + sheet + ' has been made.');
 console.log(qu + ' from ' + sheet)


//const empty = users => users.length = 0;
//empty(users)
 
 fetch(url)
 .then(res => res.text())
 .then(rep => {
   //console.log(rep);
     //clean the return so it is usable
   const jsData = JSON.parse(rep.substr(47).slice(0,-2));
   //console.log(jsData);
   const colz = [];
   
   
   jsData.table.cols.forEach((heading)=>{
 
     if(heading.label){
          colz.push(heading.label.toLowerCase().replace(/\s/g,''));
     } 
 
   })
 
    jsData.table.rows.forEach((main)=>{
      //console.log(main);c
      const row = {};
      colz.forEach((ele,ind) =>{
     // console.log(ele,ind);
       //iferror syntax here;
       row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
     })
     PaletteArray.push(row)
    }) 
      
 
 })
 
 console.log('Rows returned from Palette ' + PaletteArray.length)
 
 //console.table(PaletteArray)

 PaletteArray = []
 
 }

//-----------------------------------------------------------------------------

//HOTKEYS
var Reload 

document.onkeyup = function(e) {

  var ignoreElement = document.getElementById('sidebarwrapper');
  var isNOTEditor = ignoreElement.contains(event.target);

  var ignoreElement2 = document.getElementById('popUp');
  var isNOTEditor2 = ignoreElement2.contains(event.target);
 

  if (!isNOTEditor && !isNOTEditor2) {

  if (e.shiftKey && e.which == 40 ) {
    
    //shift + S
    ry += 10
    
  } else if (e.shiftKey && e.which == 37) {
      
     rx -= 10
          
      
  } else if (e.shiftKey && e.which == 39) {
      
      rx += 10
  
  } else if (e.shiftKey && e.which == 38) {
      
      ry -=  10
  
  } else if (e.which == 37) {
    
        -- rx
    
  } else if (e.which == 39) {
        
        rx++
    
  } else if (e.which == 38) {
        
        -- ry
    
  } else if (e.which == 40) {
         
          ry++
  
    
    }else if (e.shiftKey && e.which == 83) {
     
      ry += 10
  
    }else if (e.shiftKey && e.which == 65) {
        
       rx -= 10
    
    } else if (e.shiftKey && e.which == 68) {
        
        rx += 10
    
    } else if (e.shiftKey && e.which == 87) {
        
        ry -=  10
    
    } else if (e.which == 65) {
      
          -- rx
      
    } else if (e.which == 68) {
          
          rx++
      
    } else if (e.which == 87) {
          
          -- ry
      
    } else if (e.which == 83) {
           
            ry++
  
      
      
    } else if (e.which == 187) {
           
      tileSize += 2
      permMap()
    
    } else if (e.which == 189) {
           
      tileSize -= 2
      permMap()
      
    } else if (e.which == 69) {
           
      //E
      //Enter
      zoomIn()
      console.log('Scale: '+sheetName)
      console.log('')
      console.log('+++++++++DUMP CARTO++++++++++')
      console.log('carto length: '+ carto.length)
      carto = [] 
      console.log('carto length: '+ carto.length)
      permMap()

      //Storyteller Changes
      fillNPCQuestions()


      //LoadMap()
      
      
    } else if (e.which == 81) {
          
      //Q
      //Exit
      zoomOut()
      console.log('Scale: '+sheetName)
      console.log('')
      console.log('+++++++++DUMP CARTO++++++++++')
      console.log('carto length: '+ carto.length)
      carto = [] 
      console.log('carto length: '+ carto.length)
      permMap()

       //Storyteller Changes
       fillNPCQuestions()

      //LoadMap()
    }

    if(paintCheck === 1){
   
      paint()

}
    Move()
    //mapData()
    //permMap()
   
  }};

//-----------------------------------------------------------------------------
function zoomIn(){

  savedID = parentID 
  parentID = "" + rx + ry + rz

  scale = "Select * WHERE C = " + parentID 

  document.getElementById("Location").value = ""
  document.getElementById("Category").value = ""
  document.getElementById("TextA").value = ""
  document.getElementById("TextB").value = ""
  document.getElementById("TextC").value = ""
  document.getElementById("TextD").value = ""
  document.getElementById("TextE").value = ""


  if(sheetName === "Global"){
   
          sheetName = "Local"
        
        } else if (sheetName === "Local") {
  
            sheetName = "Dungeon"
            console.log('savedID '+savedID)
          
          }
                        
            document.getElementById('sheetName').value = sheetName

          }
  
  function zoomOut(){

    if(sheetName == "Dungeon"){
              
      sheetName = "Local"
      console.log('savedID '+savedID)
      parentID = savedID
      scale = "Select * WHERE C = " + parentID
      
     
              
       } else if (sheetName === "Local") {
              
       sheetName = "Global"
       parentID = 0
       uniqueID = 0 
       savedID = 0
       scale = "Select * "
       
      
      }
    
      document.getElementById('sheetName').value = sheetName
    
    }
  
  


   
//-----------------------------------------------------------------------------
//TOOLBAR AT TOP

//something incase I want a top-screen positioned toolbar

function topnav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//-----------------------------------------------------------------------------
//FORM SUBMISSION 

window.addEventListener("load", function() {
  const form = document.getElementById('mapData');

  form.addEventListener("submit", function(e) {
      
    e.preventDefault();
  
    document.getElementById('mapData_Activity').value = paintCheck   
    
    if( paintCheck == 0){

      document.getElementById('mapData_X').value        =  rx
      document.getElementById('mapData_Y').value        =  ry
      document.getElementById('mapData_Z').value        =  rz
      document.getElementById('mapData_uniqueID').value = uniqueID
      document.getElementById('mapData_parentID').value = parentID
      document.getElementById("mapData_sheetName").value = sheetName
      document.getElementById("mapData_user").value = rUsername
      
      
    }


const newData = new FormData(form);
const mapData = e.target.action
    
      

//console.log('')
//console.log('+++++++++INTERCEPTING++++++++++')

//LOOK UP THE SYNTAX FOR FETCH

  fetch(mapData, {
    method: 'POST',
    body: newData,
    
  })

  document.getElementById('mapData_X').value         = ''
  document.getElementById('mapData_Y').value         = ''
  document.getElementById('mapData_Z').value         = ''
  document.getElementById('mapData_uniqueID').value  = ''
  document.getElementById('mapData_parentID').value  = ''
  document.getElementById('mapData_fill').value      = ''
  paintArray = [] 

  //console.log('sending... ' + newData.length)

  //We have taken everything we need from carto, and it can be erased.
  //console.log('')
  //console.log('+++++++++DUMP CARTO++++++++++')
  //console.log('carto length: '+ carto.length)
  //carto = [] 
  //console.log('carto length: '+ carto.length)

//sleep(3000)



})

}
)



//-----------------------------------------------------------------------------
  //FILL CATEGORY DROP DOWN

var textCategory = document.getElementById("Category");


for(var i = 0; i < carto.length; i++) {
    var opt = carto[i].category;
    var el = document.createElement("category");
    el.textContent = opt;
    el.value = opt;
    textCategory.appendChild(el);


}

//-----------------------------------------------------------------------------
  //fill appropriate category questions

textCategory.onblur=function() {
   
  if (textCategory.value === '') {

     
       
   
    }else{

     
   
      //arto.includes(Category);

     
       

          }
          }
    
//-----------------------------------------------------------------------------
//FUNCTION TO IMPORT PLAYER-CHARACTER DATA FROM SPREADSHEET

var highlightLocation
var highlightContainer
var highlightItem

var FTG = 0

const STR = document.getElementById('Strength');
const DEX = document.getElementById('Dexterity');
const INT = document.getElementById('Intelligence');
const WIS = document.getElementById('Wisdom');
const CON = document.getElementById('Constitution');
const CHA = document.getElementById('Charisma');
const PSY = document.getElementById('Psyche');
const LUK = document.getElementById('Luck');
const CBT = document.getElementById('Combat');

//CHANGE PLAYER
//---------------------------------
document.getElementById('Player').onchange = function () {

  getPlayer()

}

document.getElementById('loadCharacter').onclick = function () {
 
  console.log('')
  console.log('++++++++LOAD_PLAYER_INVENTORY+++++++++++')
  console.log('Finding ' + inventory.length + ' inventory items.')
  document.getElementById('itemDisplay').style.display = "block";
  document.getElementById('EdititemDisplay').style.display = "none";
 
  

  makeInventory()


}

document.getElementById('editItem').onclick = function () {
 

  document.getElementById('itemDisplay').style.display = "none";
  document.getElementById('EdititemDisplay').style.display = "block";
 
}

document.getElementById('newItem').onclick = function () {
 

  filterInventory[0].uniqueinvid = "New"

  document.getElementById('itemDisplay').style.display = "none";
  document.getElementById('EdititemDisplay').style.display = "block";
  document.getElementById('mapData_isNewItem').value = "1"
  document.getElementById('mapData_uniqueinvid').value = "NEW"
  emptyEditItems()
  //filterInventory = []

 
}

function fillCharacterSheet(){

try{

  console.log('')
  console.log('++++++++LOAD_PLAYERS+++++++++++')
  console.log('Finding ' + players.length + ' players.')

  if( players.length == 0){
  
  //players = []  
  LoadPlayers();
  
  }
  }catch{

    console.log('!!!!! Could not complete LoadPlayers() !!!!!')
  }

  try{

    getPlayerDropdown()
    getPlayer() 
        
  }catch{
    console.log('!!!!! Could not complete getPlayer()  !!!!!')
  }
  


}

function getPlayerDropdown(){

  Player.innerHTML = "";
  Player[Player.length] = new Option('Choose Character','Choose Character')


  for(var i = 0; i < players.length; i++) {
   
   Player[Player.length] = new Option(players[i].name,players[i].name)
   
  }
   

}

function LoadPlayers(){

  //Connection to Google Sheet
 //Sheet URL between /d/ and /edit/
 const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
 const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`

 //SPECIFICS THAT CHANGE
 const sheet = 'Players'
 const query = 'Select *';

 //AGGREGATE
 const url = `${base}&sheet=${sheet}&tq=${query}`;
 //const output = document.querySelector('.output');

console.log('')
console.log('++++++++LoadPlayers()+++++++++++')
console.log('Connection to ' + sheet + ' has been made.');
  
 fetch(url)
 .then(res => res.text())
 .then(rep => {
   //console.log(rep);
     //clean the return so it is usable
   const jsData = JSON.parse(rep.substr(47).slice(0,-2));
   //console.log(jsData);
   const colz = [];
      
   jsData.table.cols.forEach((heading)=>{
 
     if(heading.label){
          colz.push(heading.label.toLowerCase().replace(/\s/g,''));
     } 
 
   })
 
    jsData.table.rows.forEach((main)=>{
      //console.log(main);
      const row = {};
      colz.forEach((ele,ind) =>{
      //console.log(ele,ind);
       //iferror syntax here;
       row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
     })
     players.push(row)
    }) 
  
 })

 console.log(players.length + ' rows have returned.');
 console.table(players)

 LoadInventory()


}

  currentPlayer = [] 

  function getPlayer() {

   
  currentPlayer = players.filter(obj => obj.name == Player.value )

  console.log('')
  console.log('++++++++CURRENT PLAYER+++++++++++')
  console.log('current playerid: ' + currentPlayer[0].uniqueid)

  console.table(currentPlayer)

  const STR_MOD = Math.ceil(currentPlayer[0].str / 5);
  const DEX_MOD = Math.ceil(currentPlayer[0].dex / 5);
  const INT_MOD = Math.ceil(currentPlayer[0].int / 5);
  const WIS_MOD = Math.ceil(currentPlayer[0].wis / 5);
  const CON_MOD = Math.ceil(currentPlayer[0].con / 5);
  const CHA_MOD = Math.ceil(currentPlayer[0].cha / 5);
  const PSY_MOD = Math.ceil(currentPlayer[0].psy / 5);
  const LUK_MOD = Math.ceil(currentPlayer[0].luk / 5);

  const ATT_BON = STR_MOD + DEX_MOD
  const MGC_BON = INT_MOD + WIS_MOD
  const NoActions = DEX_MOD
  const Movement = DEX_MOD * 5

  const STR_FTG = Math.ceil(currentPlayer[0].str);
  const DEX_FTG = Math.ceil(currentPlayer[0].dex);
  const INT_FTG = Math.ceil(currentPlayer[0].int);
  const WIS_FTG = Math.ceil(currentPlayer[0].wis);
  const CON_FTG = Math.ceil(currentPlayer[0].con);
  const CHA_FTG = Math.ceil(currentPlayer[0].cha);
  const PSY_FTG = Math.ceil(currentPlayer[0].psy);
  const LUK_FTG = Math.ceil(currentPlayer[0].luk);

  
  STR.innerHTML = "<span style='color: Gold'> STR: </span>";
  STR.innerHTML += STR_FTG + '  (' + STR_MOD + ')';

  DEX.innerHTML = "<span style='color: LightSeaGreen'> DEX: </span>";
  DEX.innerHTML += DEX_FTG + '  (' + DEX_MOD + ')';

  INT.innerHTML = "<span style='color: Violet'> INT: </span>";
  INT.innerHTML += INT_FTG + '  (' + INT_MOD + ')';

  WIS.innerHTML = "<span style='color: skyblue'> WIS: </span>";
  WIS.innerHTML += WIS_FTG + '  (' + WIS_MOD + ')';

  CON.innerHTML = "<span style='color: DarkOrange'> CON: </span>";
  CON.innerHTML += CON_FTG + '  (' + CON_MOD + ')';

  CHA.innerHTML = "<span style='color:cyan'> CHA: </span>";
  CHA.innerHTML += CHA_FTG + '  (' + CHA_MOD + ')';

  PSY.innerHTML = "<span style='color: #FF69B4'> PSY: </span>";
  PSY.innerHTML += PSY_FTG + '  (' + PSY_MOD + ')';

  LUK.innerHTML = "<span style='color: Ivory'> LUK: </span>";
  LUK.innerHTML += LUK_FTG + '  (' + LUK_MOD + ')';

  document.getElementById("hr4").style.visibility = "visible";
  document.getElementById("hr5").style.visibility = "visible";

// "<span style='color:#FF0000'> [Borrowed]  </span>";

  CBT.innerHTML = "ATKB: " + ATT_BON + newLine;
  CBT.innerHTML += "SPLB: " + MGC_BON + newLine; 
  CBT.innerHTML += "#ACT: " + NoActions + newLine; 
  CBT.innerHTML += "MVMT: " +  DEX_MOD +  newLine; 


  colourScore()

}

function colourScore(){

  unfadeAbilityScores()

  //str

if(currentPlayer[0].str_if == -1 ){

  STR.style.color = "OrangeRed" 

}else if(currentPlayer[0].str_if == 0 ){

  STR.style.color = "Ivory" 

}else if(currentPlayer[0].str_if == 1 ){

  STR.style.color = "Lime" 
  
}

  //dex

  if(currentPlayer[0].dex_if == -1 ){

    DEX.style.color = "OrangeRed" 

  }else if(currentPlayer[0].dex_if == 0 ){

    DEX.style.color = "Ivory" 
  
  }else if(currentPlayer[0].dex_if == 1 ){

    DEX.style.color = "Lime" 
    
  }

    //wis

if(currentPlayer[0].wis_if == -1 ){

  WIS.style.color = "OrangeRed" 

}else if(currentPlayer[0].wis_if == 0 ){
 
  WIS.style.color = "Ivory" 
  

}else if(currentPlayer[0].wis_if == 1 ){

  WIS.style.color = "Lime" 
  
}

 //int

 if(currentPlayer[0].int_if == -1 ){

  INT.style.color = "OrangeRed" 

}else if(currentPlayer[0].int_if == 0 ){
 
  INT.style.color = "Ivory" 
  
}else if(currentPlayer[0].int_if == 1 ){

  INT.style.color = "Lime" 
  
}


  //con

  if(currentPlayer[0].con_if == -1 ){

    CON.style.color = "OrangeRed" 

  }else if(currentPlayer[0].con_if == 0 ){

    CON.style.color = "Ivory" 
  
  }else if(currentPlayer[0].con_if == 1 ){

    CON.style.color = "Lime" 
    
  }

    //cha

if(currentPlayer[0].cha_if == -1 ){

  CHA.style.color = "OrangeRed" 

}else if(currentPlayer[0].cha_if == 0 ){

  CHA.style.color = "Ivory" 

}else if(currentPlayer[0].cha_if == 1 ){

  CHA.style.color = "Lime" 
  
}

  //psy

  if(currentPlayer[0].psy_if ){

    PSY.style.color = "OrangeRed" 

  }else if(currentPlayer[0].psy_if){

    PSY.style.color = "Ivory" 
  
  }else if(currentPlayer[0].psy_if ){
    
    PSY.style.color = "Lime" 

  }

    //luk

if(currentPlayer[0].luk_if == -1 ){

  LUK.style.color = "OrangeRed" 

}else if(currentPlayer[0].luk_if== 0 ){
  LUK.style.color = "Ivory" 

}else if(currentPlayer[0].luk_if == 1 ){
  
  LUK.style.color = "Lime" 
}











}

function LoadInventory(){

  //Connection to Google Sheet
 //Sheet URL between /d/ and /edit/
 const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
 const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`

 //SPECIFICS THAT CHANGE
 const sheet = 'Inventory'
 const query = 'Select * ';

 //AGGREGATE
 const url = `${base}&sheet=${sheet}&tq=${query}`;
 //const output = document.querySelector('.output');

console.log('')
console.log('++++++++LOAD_INVENTORY+++++++++++')
console.log('Connection to ' + sheet + ' has been made.');
  
 fetch(url)
 .then(res => res.text())
 .then(rep => {
   //console.log(rep);
     //clean the return so it is usable
   const jsData = JSON.parse(rep.substr(47).slice(0,-2));
   //console.log(jsData);
   const colz = [];
      
   jsData.table.cols.forEach((heading)=>{
 
     if(heading.label){
          colz.push(heading.label.toLowerCase().replace(/\s/g,''));
     } 
 
   })
 
    jsData.table.rows.forEach((main)=>{
      //console.log(main);
      const row = {};
      colz.forEach((ele,ind) =>{
      //console.log(ele,ind);
       //iferror syntax here;
       row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
     })
     inventory.push(row)
    }) 
  
 })

 console.log(inventory.length + ' rows have returned.');
 console.table(inventory)

}

var locationSelected = ''
var containerSelected = ''
var itemSelected = ''

var locationHighlight = ''
var containerHighlight = ''
var itemHighlight = ''


function makeInventory(){

  var myTable 
  var filterID
      filterID = currentPlayer[0].uniqueid
  var filterInventory  
  var locations
  
  var tableArray
  var headers
  var table  
  let headerRow 
       
      filterInventory = []
      filterInventory = inventory.filter(obj => (obj.container == "Location" && obj.playerid == filterID) || (obj.container == "Location" && obj.playerid == 0));

    
      document.getElementById('mapData_isInventory').value = 1;
      document.getElementById('mapData_playerID').value = filterID;
     
      locations = []
      
      locations = filterInventory.map(row => ({

        Location: row.name,

      }));

      //itemColour = filterInventory.map(row => ({

        //Colour: row.itemColour,
               
      //}));

      //console.table(itemColour)
    
      myTable = document.querySelector('#Locations');
      myTable.innerHTML= ''
      tableArray = locations
  
       headers = []
      
      table = document.createElement('tableLocations');
      headerRow = document.createElement('tr');
      headers.forEach(headerText => {
          let header = document.createElement('th');
          
          let textNode = document.createTextNode(headerText);
          header.appendChild(textNode);
          headerRow.appendChild(header);
      });
      table.appendChild(headerRow);
      var j = 0
      tableArray.forEach(emp => {
          let row = document.createElement('tr');
          row.id =  'L'+j
          j++
          //Colour Items?


          //Click on Container filters items.
            row.onclick = function () {

            //Need a way to make all...  style =	'background: rgb(41, 38, 38); color: ivory;'
            locationSelected = emp.Location;            
           
            containerSelected = ''
            itemSelected = ''  
            fillLocationContents()
            fillitemContents()

            document.getElementById("hr1").style.visibility = "visible";
            document.getElementById("hr2").style.visibility = "visible";
            

            locationHighlight = row.id
            colourInventorySelection()
             
        };

          Object.values(emp).forEach(text => {
              let cell = document.createElement('td');
              let textNode = document.createTextNode(text);
              cell.appendChild(textNode);
              row.appendChild(cell);
          })
          table.appendChild(row);
      });
      myTable.appendChild(table);

    }

    

function filterContainerDropdown(){

  setContainer.innerHTML = ''

  var filterID
      filterID = currentPlayer[0].uniqueid
     
    var containerFilterHelper =  inventory.filter(obj => (obj.playerid == filterID && obj.itemtype == 'Container') || (obj.playerid == filterID && obj.itemtype == 'Location'))
       
    var containerOptions = containerFilterHelper.map(row => row.name)  
  
        const unique = (x, i, a) => a.indexOf(x) == i;
         
        var uniqueContainers = containerOptions.filter(unique);

        setContainer[setContainer.length] = new Option("Location","Location")
  
        for(var i = 0; i < uniqueContainers.length; i++) {
    
          setContainer[setContainer.length] = new Option(uniqueContainers[i],uniqueContainers[i])
            
        }

      }


function fillLocationContents(){ 

  var myTable 
  var filterID
      filterID = currentPlayer[0].uniqueid
  var filterInventory  
  var containers
  var tableArray
  var headers
  var table  
  let headerRow 
       
      filterInventory = []
      filterInventory = inventory.filter(obj => (obj.container == locationSelected && obj.playerid == filterID) || (obj.container == locationSelected && obj.playerid == 0));  
      
      containers = [] 
      containers = filterInventory.map(row => ({

        item: row.name,
       
      }));
    
      myTable = document.querySelector('#Containers');
      myTable.innerHTML= ''
      document.querySelector('#Contents').innerHTML= ''
      tableArray = containers
  
       headers = []
      
      table = document.createElement('tableContainers');
      headerRow = document.createElement('tr');
      headers.forEach(headerText => {
          let header = document.createElement('th');
          let textNode = document.createTextNode(headerText);
          header.appendChild(textNode);
          headerRow.appendChild(header);
      });
      table.appendChild(headerRow);


      var j = 0
      tableArray.forEach(emp => {
          let row = document.createElement('tr');
          row.id =  'C'+j
          j++

          //Click on Container filters items.
          row.onclick = function () {
            containerSelected = emp.item;
            itemSelected = '' 
            fillContainerContents()
            fillitemContents()
            containerHighlight = row.id

            colourInventorySelection()
           
        };

          Object.values(emp).forEach(text => {
              let cell = document.createElement('td');
              let textNode = document.createTextNode(text);
              cell.appendChild(textNode);
              row.appendChild(cell);
          })
          table.appendChild(row);
      });
      myTable.appendChild(table);

    }

function fillContainerContents(){ 

  var myTable 
  var filterID
      filterID = currentPlayer[0].uniqueid
  var filterInventory  
  var contents

  var tableArray
  var headers
  var table  
  let headerRow 
       
      filterInventory = []
      filterInventory = inventory.filter(obj => (obj.container == containerSelected && obj.playerid == filterID) || (obj.container == containerSelected && obj.playerid == 0));  

      contents = []
      

      contents = filterInventory.map(row => ({

        item: row.name,
        
       
      }));
    
      myTable = document.querySelector('#Contents');
      myTable.innerHTML= ''
      tableArray = contents
  
       headers = []
      
      table = document.createElement('tableContents');
      headerRow = document.createElement('tr');
      headers.forEach(headerText => {
          let header = document.createElement('th');
          let textNode = document.createTextNode(headerText);
          header.appendChild(textNode);
          headerRow.appendChild(header);
      });
      table.appendChild(headerRow);

      var j = 0
      tableArray.forEach(emp => {
          let row = document.createElement('tr');
          
          row.id =  'I'+j
          j++
          
          //Click on Container filters items.
          row.onclick = function () {
            itemSelected = emp.item;
            fillitemContents()
            itemHighlight = row.id
            colourInventorySelection()
            
        };

          Object.values(emp).forEach(text => {
              let cell = document.createElement('td');
              let textNode = document.createTextNode(text);
              cell.appendChild(textNode);
              row.appendChild(cell);
          })
          table.appendChild(row);
      });
      myTable.appendChild(table);

    }

    var filterInventory 

    function InvIDLoop(){

      const showInvID = document.getElementById('showInvID');
      const showInvID2 = document.getElementById('showInvID2');

      try{

      let invID = filterInventory[0].uniqueinvid; 

      showInvID.innerHTML = invID
      showInvID2.innerHTML = 'UniqueID: ' + invID

      }catch{}

    }


    function fillitemContents(){

       
      var filterID
      filterID = currentPlayer[0].uniqueid

     
      const itemName = document.getElementById('itemName');
      const itemType = document.getElementById('itemType');
      const itemWeight = document.getElementById('itemWeight');
      const itemPortions = document.getElementById('itemPortions');
      const itemTotalWeight = document.getElementById('itemTotalWeight');
      const itemDesc1 = document.getElementById('itemDesc1');
      const itemDesc2 = document.getElementById('itemDesc2');
      const itemDesc3 = document.getElementById('itemDesc3');
      const hr1 = document.getElementById('hr1');
      const hr2 = document.getElementById('hr2');

      
      const EdititemName = document.getElementById('EdititemName');
      const EdititemType = document.getElementById('EdititemType');
      const EdititemWeight = document.getElementById('EdititemWeight');
      const EdititemPortions = document.getElementById('EdititemPortions');
      const EdititemDesc1 = document.getElementById('EdititemDesc1');
      const EdititemDesc2 = document.getElementById('EdititemDesc2');
      const EdititemDesc3 = document.getElementById('EdititemDesc3');
    
      filterInventory = []
    
     
      filterInventory = inventory.filter(obj => (obj.name == itemSelected && obj.playerid == filterID) || ( obj.name == itemSelected && obj.playerid == 0) );

      if(filterInventory.length == 0){
        filterInventory = inventory.filter(obj => (obj.name == containerSelected  && obj.playerid == filterID) || ( obj.name == containerSelected && obj.playerid == 0) );
      }
   
      if(filterInventory.length == 0){
        filterInventory = inventory.filter(obj => (obj.name == locationSelected  && obj.playerid == filterID) || (obj.name == locationSelected && obj.playerid == 0) );
      }

      console.table(filterInventory)

      //let checkType = filterInventory[0].itemtype
     
      itemName.innerHTML = filterInventory[0].name

      itemType.innerHTML = filterInventory[0].itemtype

      

     

      itemWeight.innerHTML = filterInventory[0].itemweight 

      document.getElementById("hr3").style.visibility = "hidden";

      if(itemWeight.innerHTML.length > 0){

        itemWeight.innerHTML += ' lbs.'
        document.getElementById("hr3").style.visibility = "visible";

      }

      itemPortions.innerHTML = filterInventory[0].itemportions 

      if(itemPortions.innerHTML.length > 0){

        itemPortions.innerHTML += ' Quants.'

      }

      itemTotalWeight.innerHTML = ''

      if(filterInventory[0].itemportions * filterInventory[0].itemweight  !=  0 && filterInventory[0].itemportions > 1){

        itemTotalWeight.innerHTML += filterInventory[0].itemportions * filterInventory[0].itemweight 

      }
   
      if(itemTotalWeight.innerHTML !=  0 && filterInventory[0].itemportions > 1){

        itemTotalWeight.innerHTML += ' lbs in total.'

      }


//recolour based on Boons, Active Effects...

colourScore()


      itemName.style.color = "Ivory"
      itemType.style.color = "Orange"
      hr1.color = "DarkOrange"
      hr2.color = "DarkOrange"
      hr3.color = "DarkOrange"
      itemWeight.style.color = "Orange"

      if(filterInventory[0].container == "Actions"){

        document.getElementById("hr3").style.visibility = "visible";
        itemType.innerHTML += " ACTION"

        if(filterInventory[0].itemtype == "STR"){

        
        fadeAbilityScores()
        STR.style.opacity = 1

        itemName.style.color = "Gold"
        itemType.style.color = "Gold"
        hr1.color = "Ivory"
        hr2.color = "Ivory"
        hr3.color = "Ivory"
        itemWeight.style.color = "Gold"
        itemWeight.innerHTML += " Whole: " + currentPlayer[0].str  + newLine
        itemWeight.innerHTML += " Half: " + Math.floor(currentPlayer[0].str/2)   + newLine
        itemWeight.innerHTML += " Third: " + Math.floor(currentPlayer[0].str/3)

        }else if(filterInventory[0].itemtype == "CON"){

          
          fadeAbilityScores()
          CON.style.opacity = 1


          itemName.style.color = "OrangeRed"
          itemType.style.color = "OrangeRed"
          hr1.color = "FireBrick"
          hr2.color = "FireBrick"
          hr3.color = "FireBrick"
          itemWeight.style.color = "OrangeRed"
          itemWeight.innerHTML += " Whole: " + currentPlayer[0].wis  + newLine
          itemWeight.innerHTML += " Half: " + Math.floor(currentPlayer[0].wis/2)   + newLine
          itemWeight.innerHTML += " Third: " + Math.floor(currentPlayer[0].wis/3)

        }else if(filterInventory[0].itemtype == "DEX"){

         
          fadeAbilityScores()
          DEX.style.opacity = 1

          itemName.style.color = "LightSeaGreen"
          itemType.style.color = "LightSeaGreen"
          hr1.color = "Teal"
          hr2.color = "Teal"
          hr3.color = "Teal"
          itemWeight.style.color = "LightSeaGreen"
          itemWeight.innerHTML += " Whole: " + currentPlayer[0].dex  + newLine
          itemWeight.innerHTML += " Half: " + Math.floor(currentPlayer[0].dex/2)   + newLine
          itemWeight.innerHTML += " Third: " + Math.floor(currentPlayer[0].dex/3)

       

        }


      }
      
      if(filterInventory[0].container == "Spells"){

        document.getElementById("hr3").style.visibility = "visible";
        itemType.innerHTML += " SPELL"

        if(filterInventory[0].itemtype == "INT"){

         
        fadeAbilityScores()
        INT.style.opacity = 1


        itemName.style.color = "Violet"
        itemType.style.color = "Violet"
        hr1.color = "DarkMagenta"
        hr2.color = "DarkMagenta"
        hr3.color = "DarkMagenta"
        itemWeight.style.color = "Violet"
        itemWeight.innerHTML += " Whole: " + currentPlayer[0].int  + newLine
        itemWeight.innerHTML += " Half: " + Math.floor(currentPlayer[0].int/2)   + newLine
        itemWeight.innerHTML += " Third: " + Math.floor(currentPlayer[0].int/3)

        }else if(filterInventory[0].itemtype == "WIS"){

           
          fadeAbilityScores()
          WIS.style.opacity = 1


          itemName.style.color = "skyblue"
          itemType.style.color = "skyblue"
          hr1.color = "RoyalBlue"
          hr2.color = "RoyalBlue"
          hr3.color = "RoyalBlue"
          itemWeight.style.color = "skyblue"
          itemWeight.innerHTML += " Whole: " + currentPlayer[0].wis  + newLine
          itemWeight.innerHTML += " Half: " + Math.floor(currentPlayer[0].wis/2)   + newLine
          itemWeight.innerHTML += " Third: " + Math.floor(currentPlayer[0].wis/3)

        }else if(filterInventory[0].itemtype == "CHA"){

         
          fadeAbilityScores()
          CHA.style.opacity = 1

          itemName.style.color = "cyan"
          itemType.style.color = "cyan"
          hr1.color = "Teal"
          hr2.color = "Teal"
          hr3.color = "Teal"
          itemWeight.style.color = "cyan"
          itemWeight.innerHTML += " Whole: " + currentPlayer[0].cha  + newLine
          itemWeight.innerHTML += " Half: " + Math.floor(currentPlayer[0].cha/2)   + newLine
          itemWeight.innerHTML += " Third: " + Math.floor(currentPlayer[0].cha/3)


      }}
   
      itemDesc1.innerHTML = filterInventory[0].itemdesc1
      itemDesc2.innerHTML = filterInventory[0].itemdesc2
      itemDesc3.innerHTML = filterInventory[0].itemdesc3
         
      emptyEditItems()

      

      EdititemName.value = filterInventory[0].name
      EdititemType.value = filterInventory[0].itemtype
      EdititemWeight.value = filterInventory[0].itemweight
      EdititemPortions.value = filterInventory[0].itemportions
      //EdititemTotalWeight.innerHTML = filterInventory[0].itemtotalweight
      EdititemDesc1.value = filterInventory[0].itemdesc1
      EdititemDesc2.value = filterInventory[0].itemdesc2
      EdititemDesc3.value = filterInventory[0].itemdesc3

      document.getElementById('mapData_uniqueinvid').value = filterInventory[0].uniqueinvid;

      filterContainerDropdown()

      document.getElementById('setContainer').value = filterInventory[0].container;

    }

    function emptyEditItems(){

      document.getElementById('showInvID2').value = ''
      document.getElementById('EdititemName').value = ''
      document.getElementById('EdititemType').value  = ''
      document.getElementById('EdititemWeight').value  = ''
      document.getElementById('EdititemPortions').value  = ''
      document.getElementById('EdititemDesc1').value  = ''
      document.getElementById('EdititemDesc2').value  = ''
      document.getElementById('EdititemDesc3').value  = ''



    }

    function fadeAbilityScores(){

      let x = 0.2

      STR.style.opacity = x
      DEX.style.opacity = x

      INT.style.opacity = x
      WIS.style.opacity = x
     
      CON.style.opacity = x
      CHA.style.opacity = x
      PSY.style.opacity = x
      LUK.style.opacity = x


    }

    function unfadeAbilityScores(){

      let x = 1

      STR.style.opacity = x
      DEX.style.opacity = x

      INT.style.opacity = x
      WIS.style.opacity = x
     
      CON.style.opacity = x
      CHA.style.opacity = x
      PSY.style.opacity = x
      LUK.style.opacity = x


    }


//---------------------------------
var lastLocationHighlight 
var lastContainerHighlight
var lastItemHighlight

function colourInventorySelection(){

 //document.getElementById('mapData_isNewItem').value = "0"

  try{

    document.getElementById(lastLocationHighlight).style = 'background-color: none; color: ivory'

  }catch{}

  try{

    document.getElementById(locationHighlight).style = 'background-color: orange; color: rgb(41, 38, 38)'
  
    lastLocationHighlight = locationHighlight
 
  }catch{}

  try{

    document.getElementById(lastContainerHighlight).style = 'background-color: none; color: ivory'

  }catch{}

  try{

  document.getElementById(containerHighlight).style = 'background-color: orange; color: rgb(41, 38, 38)'

  lastContainerHighlight = containerHighlight

  }catch{}

  try{

    document.getElementById(lastItemHighlight).style = 'background-color: none; color: ivory'

  }catch{}

  try{

    document.getElementById(itemHighlight).style = 'background-color: orange; color: rgb(41, 38, 38)'
    
  }catch{}

    lastItemHighlight = itemHighlight
 
}

