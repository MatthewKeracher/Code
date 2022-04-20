//import TileMap from "./TileMap.js";

//arrays
var carto = []
var users = []
var questions = []
var weather = []
var currentLocation = []
var paintArray = []

//Google Sheet Queries
var sheetName = 'Global'
var scale = 'Select *'
var parentID = 0
var uniqueID = 0
var savedID = 0

var xList = []
var yList = []
var fps = []
var x = 0
var y = 0 

var rx = 0
var ry = 0
var rz = 0
var rLocation
var rCategory
var currentWeather
var textAcontents
var textBcontents
var textCcontents
var textDcontents
var textEcontents

var rFill
var rUser

var lastLoop = new Date();
var visible = window.toolbar.visible;
var isTyping 

var activeElement
var paintCheck = 0



var rUsername = 'Gaia' //prompt("What is your name?");
document.addEventListener('DOMContentLoaded',permMap);



//-----------------------------------------------------------------------------



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

setInterval(gridLoop, 1000 / 60);


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
 const qu = 'Select * WHERE E = "' + category +'"' ;
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
     // console.log(ele,ind);
       //iferror syntax here;
       row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
     })
     questions.push(row)
    }) 
      
 
 })
 
 console.log('Rows returned from '+ sheet + ' ' + questions.length)
 console.table(questions)

 document.getElementById('QA').value  = questions[0].text
 document.getElementById('QB').value = questions[1].text
 document.getElementById('QC').value  = questions[2].text
 document.getElementById('QD').value  = questions[3].text
 document.getElementById('QE').value  = questions[4].text

 document.getElementById('Reading_QA').innerHTML  = questions[0].text
 document.getElementById('Reading_QB').innerHTML  = questions[1].text
 document.getElementById('Reading_QC').innerHTML  = questions[2].text
 document.getElementById('Reading_QD').innerHTML  = questions[3].text
 document.getElementById('Reading_QE').innerHTML  = questions[4].text

 questions = []

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


 const Season = document.getElementById("Season").value  
 const Time = document.getElementById("Time").value 
 console.log('')
 console.log('+++++++++ GET WEATHER ++++++++++')
 console.log('Rows returned from Weather ' + weather.length)
 console.log('Currently a ' + Season + 's ' + Time)
 //console.table(weather)

 currentWeather = weather.filter(obj => obj.season == Season && obj.day == Time)
  onsole.table(currentWeather)

 weather = []

}

 //-----------------------------------------------------------------------------
          // STORYTELLER

          

          function fillStoryteller(){

            const storyTeller = document.getElementById("storyTeller") 
            
            var newLine = " <br> "; //carriage return and newline.

            var  Location = document.getElementById("Location").value
            var  Category = document.getElementById("Category").value

            console.log('')
            console.log('+++++++++ FILL STORYTELLER ++++++++++')
            
            var weatherDesc = currentWeather[0].description
            var weatherMod = currentWeather[0].modifier
            var weatherReact = currentWeather[0].reaction

            var Message = "You are at the "  + Category +  " of " + Location + "." 
            + newLine + newLine 
            + weatherDesc 
            + newLine + newLine 
            + weatherMod
            + newLine + newLine 
            + weatherReact;
            + newLine + newLine

            if( Location.length > 0 ){
            
              storyTeller.innerHTML = Message


          }}


          document.getElementById('AskQA').onclick = function () {

            const storyTeller = document.getElementById("storyTeller") 
              var newLine = " <br> "; //carriage return and newline.
              var  newText = document.getElementById("TextA").value

              storyTeller.innerHTML += newText + newLine + newLine

              document.getElementById("Reading_QA").style.display = "none";
              document.getElementById("AskQA").style.display = "none";

          }

          document.getElementById('AskQB').onclick = function () {

            const storyTeller = document.getElementById("storyTeller") 
            var newLine = " <br> "; //carriage return and newline.
            var  newText = document.getElementById("TextB").value

            storyTeller.innerHTML += newText + newLine + newLine

            document.getElementById("Reading_QB").style.display = "none";
            document.getElementById("AskQB").style.display = "none";

          }

          document.getElementById('AskQC').onclick = function () {

            const storyTeller = document.getElementById("storyTeller") 
            var newLine = " <br> "; //carriage return and newline.
            var  newText = document.getElementById("TextC").value

            storyTeller.innerHTML += newText + newLine + newLine

            document.getElementById("Reading_QC").style.display = "none";
            document.getElementById("AskQC").style.display = "none";

          }

          document.getElementById('AskQD').onclick = function () {

            const storyTeller = document.getElementById("storyTeller") 
            var newLine = " <br> "; //carriage return and newline.
            var  newText = document.getElementById("TextD").value

            storyTeller.innerHTML += newText + newLine + newLine

            document.getElementById("Reading_QD").style.display = "none";
            document.getElementById("AskQD").style.display = "none";

          }

          document.getElementById('AskQE').onclick = function () {

            const storyTeller = document.getElementById("storyTeller") 
              var newLine = " <br> "; //carriage return and newline.
              var  newText = document.getElementById("TextE").value

              storyTeller.innerHTML += newText + newLine + newLine

              document.getElementById("Reading_QE").style.display = "none";
              document.getElementById("AskQE").style.display = "none";

          }

           
          

          

//-----------------------------------------------------------------------------
// DRAW MAP!
const mapwidth = 3800
const mapheight = 1600
const p = 0;
var tileSize = 16;

const EndX = Math.floor(mapheight/tileSize)
const EndY = Math.floor(mapwidth/tileSize)

//SHORTHANDS FOR DIVS IN HTML
const gridBtm = document.getElementById("gridBtm");
const gridBtmCTX = gridBtm.getContext("2d");

const gridMid = document.getElementById("gridMid");
const gridMidCTX = gridMid.getContext("2d");

const gridTop = document.getElementById("gridTop");
const gridTopCTX = gridTop.getContext("2d");


function checkSidebar(){

var Painting = document.getElementById("Painting"); //2
var Writing =  document.getElementById("Writing"); //1
var Reading =  document.getElementById("Reading"); //0
var Activity = document.getElementById("Activity").value;

if (Activity == 2) {
  Painting.style.display = "block";
  Writing.style.display = "none";
  Reading.style.display = "none";
  paintCheck = 1;
} else { if (Activity == 1) {
  Painting.style.display = "none";
  Writing.style.display = "block";
  Reading.style.display = "none";
  paintCheck = 0;
} else { if (Activity == 0) {
  Painting.style.display = "none";
  Writing.style.display = "none";
  Reading.style.display = "block";
  paintCheck = 0;
}}}}


function loopMap(){
//Contains all map elements included in the Gameloop, permMap() contains those left out.
gridMidCTX.clearRect(0, 0, mapwidth, mapheight);
//The carto array is used to paint the map.
fillMap(); 
drawUser();
drawLabels();
checkSidebar();
}

function permMap(){
//Contains all map elements not included in the Gameloop, permMap() contains those left in.
gridBtmCTX.clearRect(0, 0, mapwidth, mapheight);
gridTopCTX.clearRect(0, 0, mapwidth, mapheight);
//Draws out Blank Map
//drawBlackground();
drawGreenGrid();
//Queries sheet and returns map positions.
LoadMap();
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

function drawGreenGrid() {
  
  gridBtmCTX.beginPath()

  for (var x1 = 0; x1 <= mapwidth; x1 += tileSize) {
    
    gridBtmCTX.moveTo(0.5 + x1 + p, p);
    gridBtmCTX.lineTo(0.5 + x1 + p, mapheight + p);
  }
  
  for (var x2 = 0; x2 <= mapheight; x2 += tileSize) {
    
    gridBtmCTX.moveTo(p, 0.5 + x2 + p);
    gridBtmCTX.lineTo(mapwidth + p, 0.5 + x2 + p);
  }
  gridBtmCTX.strokeStyle = "rgb(0, 90, 0, 1)";
  gridBtmCTX.stroke();
}

//Showing and Hiding different Z Levels
document.getElementById("zLayer").onchange = function(){

console.log('Layer Selection Changed')

//scale ='Select * WHERE F = ' + document.getElementById("testZ").value

//carto = []
rz = document.getElementById('zLayer').value  
carto = []
permMap()

console.log(scale)

}


function fillMap(){

//console.log('running FillMap()')
gridMidCTX.globalAlpha = 1

  for (let i = 0; i < carto.length; i++) {

        let fill = carto[i].fill
        let x = carto[i].x
        let y = carto[i].y
        let z = carto[i].z


if (rz == 1 ){

  if(z == 0){

    gridMidCTX.globalAlpha = 0.5

  }else{

    gridMidCTX.globalAlpha = 1

  }

} else if (rz == 0){

  if(z == 1){

    gridMidCTX.globalAlpha = 0.5

  }else{

    gridMidCTX.globalAlpha = 1

  }
}
      
        gridMidCTX.fillStyle = fill;
        gridMidCTX.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
         
          if(x == rx && y == ry){

            //rz = carto[i].z
          
          }  }  }

  function paint() {

  var paintColour = document.getElementById("paintFill").value
             
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
  currentLocation = carto.filter(obj => obj.x == rXYZ.x && obj.y == rXYZ.y && obj.z == rXYZ.z)
  try{
  console.table(currentLocation[0])}catch{ console.log('No record for this location?') }
  console.log(currentLocation.length + ' records found.')
  console.log('(X: ' + rx+','+'Y: ' + ry+','+'Z: ' + rz +')')
  console.log('FPS: ' +fps);

  //EDITOR VARIABLES
   
    document.getElementById('Location').value =  currentLocation[0].location
    document.getElementById('Category').value = currentLocation[0].category
    //document.getElementById('paintFill').value = currentLocation[0].fill
    document.getElementById('TextA').value = currentLocation[0].desc1
    document.getElementById('TextB').value = currentLocation[0].desc2
    document.getElementById('TextC').value = currentLocation[0].desc3
    document.getElementById('TextD').value = currentLocation[0].desc4
    document.getElementById('TextE').value = currentLocation[0].desc5
    
//Queries sheet and returns user positions. 
fillStoryteller();
LoadQuestions();


  
  }
  
 
function drawLabels(){

  //console.log('')
  //console.log('+++++++++DRAWING  LABELS++++++++++')
  

  gridMidCTX.globalAlpha = 1

for (let i = 0; i < carto.length; i++) {
        
      let location = carto[i].location   

      //console.log(location)
      
                 if(location.length>0){
                   
                  let ix = carto[i].x * tileSize + (tileSize * 1.2)
                  let iy = carto[i].y * tileSize
                  let iwidth = location.length * 8
                  let iheight =  tileSize
                  
                  
                  //if(rx == carto[i].x && ry == carto[i].y){

                  //Behind Name
                  gridTopCTX.fillStyle = 'black'
                  gridTopCTX.fillRect(ix,iy,iwidth,iheight);
                  //Write name
                  gridTopCTX.font = "14px Arial";;
                  gridTopCTX.fillStyle = 'wheat';
                  
                  //PAINTS LOCATION NAMES
                  gridTopCTX.fillText(location,ix+ 0.15 * tileSize, iy + 0.75 * tileSize);
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
                  gridMidCTX.fillRect(rx * tileSize + (tileSize * 1.2), ry * tileSize + tileSize, rUser.length * 8, tileSize);
                  //Write name
                  gridMidCTX.font = "12px Helvetica";
                  gridMidCTX.fillStyle = 'orange';
                  gridMidCTX.fillText(rUser, rx * tileSize + (tileSize * 1.2) + 6, ry * tileSize + (tileSize) * 1.75 );


                  for (var i = 0; i < users.length; i++) {

                  //User Information
                                     

                  let user = users[i].username
                  let x = (users[i].x * tileSize)
                  let y = (users[i].y * tileSize) 
                  let xward = user.length * 8
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
                  gridMidCTX.font = "12px Helvetica";
                  gridMidCTX.fillStyle = 'orange';
                  gridMidCTX.fillText(user, x + (tileSize * 1.2) + 6, y + (tileSize) * 1.75 );



                  }}}

                
     
//-----------------------------------------------------------------------------

// MOUSE TRACKING
function Move(){

//Everything that happens when we move either by mouse or wasd
//Load Users and Current Locations
LoadUsers();  
LoadWeather();


//Update the uniqueID
uniqueID = parentID +'-'+ rx +'-'+ ry +'-'+ rz;


//Clear Reader
document.getElementById('storyTeller').innerHTML = ''



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

currentLocation = []


filterCarto()



}


//MOUSE BUTTON LEFT RIGHT CLICK CONTROLS 

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

gridBtm.addEventListener('mousemove', e => {
  
  x = e.offsetX;
  y = e.offsetY;

  console.log('(x: ' + x+','+' y: ' + y+')')


});

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
    permMap()
   
  }};

//-----------------------------------------------------------------------------
function zoomIn(){

  savedID = parentID 
  parentID = uniqueID;
  

  if(sheetName === "Global"){
   
          sheetName = "Local"
              scale = "Select * WHERE C = " + parentID 
              
     
  
        } else if (sheetName === "Local") {
  
            sheetName = "Dungeon"
            console.log('savedID '+savedID)
            scale = "Select * WHERE C = " + parentID
                   
          
          }
            
            
            document.getElementById('sheetName').value = sheetName

          }
  
  function zoomOut(){

    parentID = '' + rx + ry + rz
    

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

sleep(3000)

LoadMap()

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
    
