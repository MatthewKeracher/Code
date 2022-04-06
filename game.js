//import TileMap from "./TileMap.js";

//arrays
var carto = []
var users = []
var questions = []
var currentLocation = []
var paintArray = []

//Google Sheet Queries
var sheetName 


var xList = []
var yList = []
var fps = []
var x 
var y 

var rx //nearest square
var ry
var rz 
var rLocation
var rCategory
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

var rUsername = prompt("What is your name?");
document.addEventListener('DOMContentLoaded',permMap);


const targetDiv = document.getElementById("editor");
const btn = document.getElementById("chkEditor");

btn.onclick = function () {
  if (targetDiv.style.display !== "block") {
    targetDiv.style.display = "block";
  } else {
    targetDiv.style.display = "none";
  }
};

const targetDiv2 = document.getElementById("painter");
const btn2 = document.getElementById("chkPainter");

btn2.onclick = function () {
  if (targetDiv2.style.display !== "block") {
    targetDiv2.style.display = "block";
    paintCheck = 1
  } else {
    targetDiv2.style.display = "none";
    paintCheck = 0
  }
};


//- Using an anonymous function:
document.getElementById("paintButton").onclick = function () { 
  
  console.log('paintArray has been copied to the clipboard')
  
  navigator.clipboard.writeText(console.table(paintArray)); };
 

//-----------------------------------------------------------------------------

//const tx = document.getElementsByTagName("textarea");
//for (let i = 0; i < tx.length; i++) {
  //tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  //tx[i].addEventListener("input", OnInput, false);
//}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

//-----------------------------------------------------------------------------
//gridLOOP
//Two loops, one that updates all the time, one that updates onclick

function gridLoop() {
  //Variables
  var thisLoop = new Date();
  fps = Math.floor(1000 / (thisLoop - lastLoop));
  lastLoop = thisLoop;

  //USERNAME
  document.getElementById('user').value = rUsername
  
  //Draw The Map  
  loopMap()
  


}

//Something to do with how long each loop is...
setInterval(gridLoop, 1000 / 60);


//-----------------------------------------------------------------------------
//FUNCTION TO IMPORT MAP DATA FROM SPREADSHEET

function LoadMap(){

 //Connection to Google Sheet
//Sheet URL between /d/ and /edit/
const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
//SPECIFICS THAT CHANGE

const qu = 'Select *';
const query = qu
//AGGREGATE
const url = `${base}&sheet=${sheetName}&tq=${query}`;
//const output = document.querySelector('.output');
console.log('')
console.log('++++++++LOAD_CARTO+++++++++++')
console.log('Connection to ' + sheetName + ' has been made.');
console.log(qu + ' from ' + sheetName)

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
 const users = 'Users'
 const qu = 'Select *';
 const query = qu
 //AGGREGATE
 const url = `${base}&sheet=${users}&tq=${query}`;
 //const output = document.querySelector('.output');
 console.log('')
 console.log('++++++++LOAD USERS+++++++++++')
 console.log('Connection to ' + users + ' has been made.');
 console.log(qu + ' from ' + users)
 


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
 
 console.table(users.username)
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
 const category = document.getElementById('testCategory').value
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
 document.getElementById('QB').value  = questions[1].text
 document.getElementById('QC').value  = questions[2].text
 document.getElementById('QD').value  = questions[3].text
 document.getElementById('QE').value  = questions[4].text

 questions = []
 
 }



//-----------------------------------------------------------------------------
// DRAW MAP!


const mapwidth = 1600
const mapheight = 1600
const p = 0;
var tileSize = 18;

const EndX = Math.floor(mapheight/tileSize)
const EndY = Math.floor(mapwidth/tileSize)

const grid = document.getElementById("grid");
const map = document.getElementById("map");
const gridCTX = grid.getContext("2d");
const mapCTX = map.getContext("2d");

function loopMap(){
//Contains all map elements included in the Gameloop, permMap() contains those left out.
mapCTX.clearRect(0, 0, mapwidth, mapheight);
//The carto array is used to paint the map.
fillMap(); 
drawUser();
drawLabels();



}

function permMap(){
//Contains all map elements not included in the Gameloop, permMap() contains those left in.
gridCTX.clearRect(0, 0, mapwidth, mapheight);

//Draws out Blank Map
//drawBlackground();
drawGreenGrid();

//Queries sheet and returns map positions.
LoadMap();

//Queries sheet and returns user positions. 
LoadUsers();



//We have taken everything we need from carto, and it can be erased.
carto = [] 


}

function drawBlackground() {
  for (var x = 0; x <= mapwidth; x += tileSize) {
    for (var y = 0; y <= mapheight; y += tileSize) {
      gridCTX.fillStyle = "black";
      gridCTX.moveTo(p, 0.5 + x + p);
      gridCTX.fillRect(x, y, tileSize, tileSize);
    }
  }
}

function drawGreenGrid() {
  
  gridCTX.beginPath()

  for (var x1 = 0; x1 <= mapwidth; x1 += tileSize) {
    
    gridCTX.moveTo(0.5 + x1 + p, p);
    gridCTX.lineTo(0.5 + x1 + p, mapheight + p);
  }
  
  for (var x2 = 0; x2 <= mapheight; x2 += tileSize) {
    
    gridCTX.moveTo(p, 0.5 + x2 + p);
    gridCTX.lineTo(mapwidth + p, 0.5 + x2 + p);
  }
  gridCTX.strokeStyle = "rgb(0, 90, 0, 1)";
  gridCTX.stroke();
}

function fillMap(){

//console.log('running FillMap()')

  for (let i = 0; i < carto.length; i++) {

        let fill = carto[i].fill
        let x = carto[i].x
        let y = carto[i].y
        
        //console.log(location)
        
      
          gridCTX.fillStyle = fill;
         
          
          //PAINTS THE SQUARES
         gridCTX.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
         
          if(x == rx && y == ry){

            rz = carto[i].z
          
          }  }  }

          function paint() {

            var paintColour = document.getElementById("paintFill").value
           

            gridCTX.fillStyle = paintColour;
                 
            //PAINTS THE SQUARE
            console.log('')
            console.log('+++++++++PAINTING DATA++++++++++')
            console.log('Painting ' + gridCTX.fillStyle  + ' at ' + rx + ',' + ry)
            gridCTX.fillRect(rx * tileSize, ry * tileSize, tileSize, tileSize)
            paintArray.push({x:rx, y: ry, z: rz, fill: paintColour})
            console.table(paintArray)

           
            //AUTOMATICALLY FILL EDITOR AS PAINTING
            
            //document.getElementById('testLocation').value =  currentLocation[0].location
            //document.getElementById('testCategory').value = currentLocation[0].category
            document.getElementById('testFill').value = paintColour
            //document.getElementById('TextA').value = currentLocation[0].desc1
            //document.getElementById('TextB').value = currentLocation[0].desc2
            //document.getElementById('TextC').value = currentLocation[0].desc3
            //document.getElementById('TextD').value = currentLocation[0].desc4
            //document.getElementById('TextE').value = currentLocation[0].desc5

            //AUTOMAGICALLY SUBMIT FORM DATA
            document.forms['mapData'].dispatchEvent(new Event('submit'));

            
         
            //NEED TO PREVENT DEFAULT
                        

          }


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
  console.table(currentLocation[0])
  console.log(currentLocation.length + ' records found.')
  console.log('(X: ' + rx+','+'Y: ' + ry+')')
  console.log('FPS: ' +fps);

  //EDITOR VARIABLES
   
    document.getElementById('testLocation').value =  currentLocation[0].location
    document.getElementById('testCategory').value = currentLocation[0].category
    document.getElementById('testFill').value = currentLocation[0].fill
    document.getElementById('TextA').value = currentLocation[0].desc1
    document.getElementById('TextB').value = currentLocation[0].desc2
    document.getElementById('TextC').value = currentLocation[0].desc3
    document.getElementById('TextD').value = currentLocation[0].desc4
    document.getElementById('TextE').value = currentLocation[0].desc5
    


    LoadQuestions();
  
  }
  
 
function drawLabels(){

for (let i = 0; i < carto.length; i++) {
        
      let location = carto[i].location   
      
                 if(location.length>0){
                   
                  let ix = carto[i].x * tileSize + (tileSize * 1.2)
                  let iy = carto[i].y * tileSize
                  let iwidth = location.length * 8
                  let iheight =  tileSize
                  
                  
                  if(rx == carto[i].x && ry == carto[i].y){

                  //Behind Name
                  mapCTX.fillStyle = 'black'
                  mapCTX.fillRect(ix,iy,iwidth,iheight);
                  //Write name
                  mapCTX.font = "Courier Prime";
                  mapCTX.fillStyle = 'wheat';
                  
                  //PAINTS LOCATION NAMES
                  mapCTX.fillText(location,ix+ 0.35 * tileSize, iy + 0.75 * tileSize);
                  } 

                  if(Math.floor(x/tileSize) == carto[i].x && Math.floor(y/tileSize) == carto[i].y){           
                    //Behind Name
                    mapCTX.fillStyle = 'black'
                    mapCTX.fillRect(ix,iy,iwidth,iheight);
                    //Write name
                    mapCTX.font = "italic calibri";
                    mapCTX.fillStyle = 'wheat';
                        //PAINTS LOCATION NAMES
                    mapCTX.fillText(location,ix+ 0.35 * tileSize, iy + 0.75 * tileSize);
              } 
        
                }
              
              
              
              }
            
              
            
            }

                function drawUser(){

                  rUser = document.getElementById("user").value

                  mapCTX.strokeStyle = "orange";
                  mapCTX.strokeRect(rx * tileSize, ry * tileSize,tileSize,tileSize);
                  //Behind Name
                  mapCTX.fillStyle = 'black'
                  mapCTX.fillRect(rx * tileSize + (tileSize * 1.2), ry * tileSize + tileSize, rUser.length * 8, tileSize);
                  //Write name
                  mapCTX.font = "12px Helvetica";
                  mapCTX.fillStyle = 'orange';
                  mapCTX.fillText(rUser, rx * tileSize + (tileSize * 1.2) + 6, ry * tileSize + (tileSize) * 1.75 );


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
                  
                  mapCTX.strokeStyle = "orange";
                  mapCTX.strokeRect(x,y,tileSize,tileSize);

                  mapCTX.strokeStyle = "pink";
                  
                  
                  //Behind Name
                  mapCTX.fillStyle = 'black'
                  mapCTX.fillRect(x + (tileSize * 1.2), y+ tileSize, xward, yward);
                  //Write name
                  mapCTX.font = "12px Helvetica";
                  mapCTX.fillStyle = 'orange';
                  mapCTX.fillText(user, x + (tileSize * 1.2) + 6, y + (tileSize) * 1.75 );



                  }}}

                
               

function fillMap_Random(){
  
   for (var x = 0; x <= mapwidth; x += tileSize) {
    for (var y = 0; y <= mapheight; y += tileSize) {
   
            mapCTX.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';        
            mapCTX.fillRect(x, y, tileSize, tileSize)
                        
     }} }
  

//-----------------------------------------------------------------------------

// MOUSE TRACKING
function Move(){

//Everything that happens when we move either by mouse or wasd

rLocation = ""
rCategory = ""
document.getElementById('testX').value = rx
document.getElementById('testY').value = ry
document.getElementById('testZ').value = rz
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



//LoadQuestions()


}


// Add the event listeners for mousedown, mousemove, and mouseup
map.addEventListener('mousedown', e => {
  
  x = e.offsetX;
  y = e.offsetY;
  //z = 0

  rx = Math.floor( x / tileSize) 
  ry = Math.floor( y / tileSize) 
  rz = 0        

  Move()

  

 
    
});

map.addEventListener('mouseup', e => {
  
  if(paintCheck === 1){
   
        paint()
 
  }
  
  console.log('')
  console.log('+++++++++DEVELOPER VARIABLES++++++++++')
  console.log('(x: ' + x+','+' y: ' + y+')')
  console.log('(rx: ' + rx+','+' ry: ' + ry+')')
  console.log('FPS: ' + fps);
  console.log('Active Element: ' + activeElement);
  console.log('paintCheck: ' + paintCheck)
    
  mapData()
 
  
  

    }
    
);


grid.addEventListener('mousemove', e => {
  
  x = e.offsetX;
  y = e.offsetY;

  console.log('(x: ' + x+','+' y: ' + y+')')


});

//-----------------------------------------------------------------------------

//HOT KEYS
var Reload 

document.onkeyup = function(e) {

  var ignoreElement = document.getElementById('editor');
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
      
    } else if (e.which == 81) {
          
      //Q
      //Exit
      zoomOut()
      console.log('Scale: '+sheetName)

    }

    Move()
    mapData()
    permMap()
   
  }};

//-----------------------------------------------------------------------------
function zoomIn(){

  if(sheetName === "Global"){
  
      sheetName ="Local"
  
        } else if (sheetName === "Local") {
  
            sheetName = "Dungeon"}}
  
  function zoomOut(){
  
    if(sheetName == "Dungeon"){
              
      sheetName = "Local"
              
       } else if (sheetName === "Local") {
              
       sheetName = "Global"}}
  
  


   
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
   

const newData = new FormData(form);
const mapData = e.target.action

console.log('+++++++++INTERCEPTING++++++++++')

//LOOK UP THE SYNTAX FOR FETCH

  fetch(mapData, {
    method: 'POST',
    body: newData,
    
  })

 
  
  //console.log('sending... ' + newData.length)


LoadMap()

})

}
)



//-----------------------------------------------------------------------------
  //FILL CATEGORY DROP DOWN

var textCategory = document.getElementById("testCategory");


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
  //DRAGGABLE EDITOR

  // Make the DIV element draggable:
dragElement(document.getElementById("editor"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}