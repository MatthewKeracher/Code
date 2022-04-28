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


var rUsername = 'Gaia' //prompt("What is your name?");
document.addEventListener('DOMContentLoaded',permMap);



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
  
}

//Something to do with how long each loop is...

//ONCE
document.getElementById('user').value = rUsername
document.getElementById('wrapper').scrollLeft += screen.width/10*6;
document.getElementById('sheetName').value = sheetName
document.getElementById('mapData_isWeather').value = "0";
document.getElementById('mapData_isEffect').value = "0";
document.getElementById('mapData_isNPC').value = "0";



try{
  LoadWeather();
  weather = []
  }catch{
    console.log('!!!!! Could not complete LoadWeather()) !!!!!')
  }

  


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

 Season.innerHTML = "";

 for(var i = 0; i < weather.length; i++) {
  
  Season[Season.length] = new Option(weather[i].season,weather[i].season)
 
 
 }

 Time.innerHTML = "";

 const Times = weather.filter(obj => obj.season == Season.value )
 console.table(Times)

 for(var i = 0; i < Times.length; i++) {
  
  Time[Time.length] = new Option(Times[i].day,Times[i].day)

}


fillWeatherEntrySelection()
fillWeatherDescriptions()
getWeather() 
weather = []

}

function getWeather(){

 console.log('')
 console.log('+++++++++ GET WEATHER ++++++++++')
 console.log('Rows returned from Weather ' + weather.length)
 console.log('Currently a ' + Season.value + "'s " + Time.value)
 //console.table(weather)

 currentWeather = weather.filter(obj => obj.season == Season.value && obj.day == Time.value)
 console.table(currentWeather)

}

document.getElementById('Season').onchange = function () {
 

  Time.innerHTML = "";

  const Times = weather.filter(obj => obj.season == Season.value )
  console.table(Times)
 
  for(var i = 0; i < Times.length; i++) {
   
   Time[Time.length] = new Option(Times[i].day,Times[i].day)

  }
  
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
    
    }
 
  document.getElementById('EditWeather').onclick = function () {

    document.getElementById('Weather').style.display = "block";
    document.getElementById('editEffects').style.display = "none";
    document.getElementById('editNPCs').style.display = "none";
    document.getElementById('EditWeather').style.display = "none";
    document.getElementById('HideEditWeather').style.display = "block";

  }

  document.getElementById('HideEditWeather').onclick = function () {

    document.getElementById('Weather').style.display = "none";
  
    document.getElementById('HideEditWeather').style.display = "none";
    document.getElementById('EditWeather').style.display = "block";
    document.getElementById('editEffects').style.display = "block";
    document.getElementById('editNPCs').style.display = "block";
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
 
 

 }

 document.getElementById('editEffects').onclick = function () {

  document.getElementById('Effects').style.display = "block";
  document.getElementById('mapData_isEffect').value = "1";
  document.getElementById('editEffects').style.display = "none";
  document.getElementById('EditWeather').style.display = "none";
  document.getElementById('editNPCs').style.display = "none";
  document.getElementById('hideEditEffects').style.display = "block";

  fillEffectDescriptions()

}

document.getElementById('hideEditEffects').onclick = function () {

  document.getElementById('Effects').style.display = "none";
  document.getElementById('mapData_isEffect').value = "0";
  document.getElementById('editEffects').style.display = "block";
  document.getElementById('EditWeather').style.display = "block";
  document.getElementById('editNPCs').style.display = "block";
  document.getElementById('hideEditEffects').style.display = "none";

}

 function fillEffectsDropdowns(){


  var effectsEntries = document.getElementById('effectEntries')

  var effectOne = document.getElementById('effectOne')
  var effectTwo = document.getElementById('effectTwo')
  var effectThree = document.getElementById('effectThree')

  effectOne.innerHTML = "";
  effectTwo.innerHTML = "";
  effectThree.innerHTML = "";

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
   effectOne.value = effectOneChildren[random1].value; 
   effectTwo.value = effectTwoChildren[random2].value; 
   effectThree.value = effectThreeChildren[random3].value; 

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

          function fillStoryteller(){

           
            const storyTeller = document.getElementById("storyTeller") 
            
            

            var  Location = currentLocation[0].location
            var  Category = currentLocation[0].category
            var Message
            
            console.log('')
            console.log('+++++++++ FILL STORYTELLER ++++++++++')

            if( sheetName == 'Global'){

             Message = "You are at the "  + Category +  " of " + Location + "." + newLine    

            }else{

              Message = "You are at " + Location + "'s "  + Category +  "."
            
            }
            
          
            
            if( Location.length > 0 ){
            
            storyTeller.innerHTML = Message
          
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

              storyTeller.innerHTML += weatherDesc + newLine + newText + newLine + weatherMod

              storyTeller.innerHTML += " There are [NPCs] around. "  + weatherReact

              document.getElementById("Reading_QA").style.display = "none";
              document.getElementById("AskQA").style.display = "none";

          }

          document.getElementById('AskQB').onclick = function () {

            const storyTeller = document.getElementById("storyTeller") 
           
            var  newText = document.getElementById("TextB").value

            storyTeller.innerHTML += newLine + newText 

            document.getElementById("Reading_QB").style.display = "none";
            document.getElementById("AskQB").style.display = "none";

          }

          document.getElementById('AskQC').onclick = function () {

            const storyTeller = document.getElementById("storyTeller") 
           
            var  newText = document.getElementById("TextC").value

            storyTeller.innerHTML += newLine + newText 

            document.getElementById("Reading_QC").style.display = "none";
            document.getElementById("AskQC").style.display = "none";

          }

          document.getElementById('AskQD').onclick = function () {

            const storyTeller = document.getElementById("storyTeller") 
            
            var  newText = document.getElementById("TextD").value

            storyTeller.innerHTML += newLine + newText 

            document.getElementById("Reading_QD").style.display = "none";
            document.getElementById("AskQD").style.display = "none";

          }

          document.getElementById('AskQE').onclick = function () {

            const storyTeller = document.getElementById("storyTeller") 
             
              var  newText = document.getElementById("TextE").value

              storyTeller.innerHTML += newLine + newText 

              document.getElementById("Reading_QE").style.display = "none";
              document.getElementById("AskQE").style.display = "none";

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


function checkSidebar(){

var Painting = document.getElementById("Painting"); //2
var Writing =  document.getElementById("Writing"); //1
var Reading =  document.getElementById("Reading"); //0
var Playing =  document.getElementById("Playing"); //0
var Activity = document.getElementById("Activity").value;

if (Activity == 2) {
  Painting.style.display = "block";
  Writing.style.display = "none";
  Reading.style.display = "none";
  Playing.style.display = "none";
  
} else { if (Activity == 1) {
  Painting.style.display = "none";
  Writing.style.display = "block";
  Reading.style.display = "none";
  Playing.style.display = "none";
  paintCheck = 0;
} else { if (Activity == 0) {
  Painting.style.display = "none";
  Writing.style.display = "none";
  Reading.style.display = "block";
  Playing.style.display = "none";
  paintCheck = 0;
} else { if (Activity == 3) {
  Painting.style.display = "none";
  Writing.style.display = "none";
  Reading.style.display = "none";
  Playing.style.display = "block";
  paintCheck = 0;
}}}}}




function loopMap(){
//Contains all map elements included in the Gameloop, permMap() contains those left out.
PaletteCTX.clearRect(0, 0, mapwidth, mapheight);
gridBtmCTX.clearRect(0, 0, mapwidth, mapheight);
gridMidCTX.clearRect(0, 0, mapwidth, mapheight);
//The carto array is used to paint the map.
drawGridlines();

fillMap(); 

checkSidebar();
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


document.getElementById('mapFormSubmit').onclick = function () {
 
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



//document.getElementById("Reading_QA").style.display = "none";
//document.getElementById("AskQA").style.display = "none";
//document.getElementById("Reading_QB").style.display = "none";
//document.getElementById("AskQB").style.display = "none";
//document.getElementById("Reading_QC").style.display = "none";
//document.getElementById("AskQC").style.display = "none";
//document.getElementById("Reading_QD").style.display = "none";
//document.getElementById("AskQD").style.display = "none";
//document.getElementById("Reading_QE").style.display = "none";
//document.getElementById("AskQE").style.display = "none";

LoadUsers();  



  try{
    LoadWeather();
    weather = []
    }catch{
      console.log('!!!!! Could not complete LoadWeather()) !!!!!')
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
    document.getElementById('storyTeller').innerHTML = 'You travel the wilderness.'
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
 

  if (!isNOTEditor) {

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


const STR = document.getElementById('Strength');
const DEX = document.getElementById('Dexterity');
const INT = document.getElementById('Intelligence');
const WIS = document.getElementById('Wisdom');
const CON = document.getElementById('Constitution');
const CHA = document.getElementById('Charisma');
const PSY = document.getElementById('Psyche');
const LUK = document.getElementById('Luck');
const CBT = document.getElementById('Combat');

document.getElementById('showInventory').onclick = function () {
  document.getElementById("popUp").style.display = "block";
  document.getElementById("hideInventory").style.display = "block";
  document.getElementById("showInventory").style.display = "none";
}

document.getElementById('hideInventory').onclick = function () {
  document.getElementById("popUp").style.display = "none";
  document.getElementById("hideInventory").style.display = "none";
  document.getElementById("showInventory").style.display = "block";
}

document.getElementById('loadPlayers').onclick = function () {

try{
  
  LoadPlayers();
  //players = []
  
  }catch{
    console.log('!!!!! Could not complete LoadPlayers() !!!!!')
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
console.log('++++++++LOAD_PLAYERS+++++++++++')
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

 Player.innerHTML = "";

 for(var i = 0; i < players.length; i++) {
  
  Player[Player.length] = new Option(players[i].name,players[i].name)
  
 }

getPlayer() 
players = []

}

document.getElementById('Player').onchange = function () {

  getPlayer() 

}

  function getPlayer() {

  const currentPlayer = players.filter(obj => obj.name == Player.value )

  console.table(currentPlayer)

const STR_MOD = Math.floor(currentPlayer[0].str / 5);
const DEX_MOD = Math.floor(currentPlayer[0].dex / 5);
const INT_MOD = Math.floor(currentPlayer[0].int / 5);
const WIS_MOD = Math.floor(currentPlayer[0].wis / 5);
const CON_MOD = Math.floor(currentPlayer[0].con / 5);
const CHA_MOD = Math.floor(currentPlayer[0].cha / 5);
const PSY_MOD = Math.floor(currentPlayer[0].psy / 5);
const LUK_MOD = Math.floor(currentPlayer[0].luk / 5);

const ATT_BON = STR_MOD + DEX_MOD
const MGC_BON = INT_MOD + WIS_MOD

  
  STR.innerHTML = "STR: " + currentPlayer[0].str + '  (' + STR_MOD + ')';
  DEX.innerHTML = "DEX: " + currentPlayer[0].dex + '  (' + DEX_MOD + ')';
  INT.innerHTML = "INT: " + currentPlayer[0].int + '  (' + INT_MOD + ')';
  WIS.innerHTML = "WIS: " + currentPlayer[0].wis + '  (' + WIS_MOD + ')';
  CON.innerHTML = "CON: " + currentPlayer[0].con + '  (' + CON_MOD + ')';
  CHA.innerHTML = "CHA: " + currentPlayer[0].cha + '  (' + CHA_MOD + ')';
  PSY.innerHTML = "PSY: " + currentPlayer[0].psy + '  (' + PSY_MOD + ')';
  LUK.innerHTML = "LUK: " + currentPlayer[0].luk + '  (' + LUK_MOD + ')';

  CBT.innerHTML = "Attack Bonus: " + ATT_BON + newLine + "Spell  Bonus: " + MGC_BON;

}
