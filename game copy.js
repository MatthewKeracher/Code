//import TileMap from "./TileMap.js";

//arrays
var carto = []
var users = []


var xList = []
var yList = []
var fps = []
var x 
var y 

var rx //nearest square
var ry
var rz 
var rLocation

var lastLoop = new Date();
var visible = window.toolbar.visible;


document.addEventListener('DOMContentLoaded',permMap);


//-----------------------------------------------------------------------------
//




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
setInterval(gridLoop, 1000 / 60);


//-----------------------------------------------------------------------------
//FUNCTION TO IMPORT MAP DATA FROM SPREADSHEET

function LoadMap(){

 //Connection to Google Sheet
//Sheet URL between /d/ and /edit/
const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
//SPECIFICS THAT CHANGE
const sheetName = 'Global'
const qu = 'Select *';
const query = qu
//AGGREGATE
const url = `${base}&sheet=${sheetName}&tq=${query}`;
//const output = document.querySelector('.output');
console.log('+++++++++++++++++++')
console.log('Connection to ' + sheetName + ' has been made.');
console.log(qu + ' from ' + sheetName)

//carta = []

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
console.table(carto[10])

}

//-----------------------------------------------------------------------------
//FUNCTION TO IMPORT MAP DATA FROM SPREADSHEET

function LoadUsers(){

  //Connection to Google Sheet
 //Sheet URL between /d/ and /edit/
 const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
 const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
 //SPECIFICS THAT CHANGE
 const sheetName = 'Users'
 const qu = 'Select *';
 const query = qu
 //AGGREGATE
 const url = `${base}&sheet=${sheetName}&tq=${query}`;
 //const output = document.querySelector('.output');
 console.log('+++++++++++++++++++')
 console.log('Connection to ' + sheetName + ' has been made.');
 console.log(qu + ' from ' + sheetName)
 
 //carta = []
 
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
     users.push(row)
    }) 
      
 
 })
 
 console.log('Rows returned from '+ sheetName + ' ' + users.length)
 console.table(users[1])
 
 }
 
 



//-----------------------------------------------------------------------------
// DRAW MAP!

const mapwidth = 2000
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
drawUser();
drawLabels();

}

function permMap(){
//Contains all map elements not included in the Gameloop, permMap() contains those left in.
gridCTX.clearRect(0, 0, mapwidth, mapheight);
drawBlackground();
drawGreenGrid();
LoadMap()
LoadUsers()
fillMap(); //_Random 



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

console.log('running FillMap()')

  for (let i = 0; i < carto.length; i++) {

        let fill = carto[i].fill
        let x = carto[i].x
        let y = carto[i].y
        
        //console.log(location)
        
          //Paintbrush
          switch (fill) {
          case 0:
          gridCTX.fillStyle = "black";
          break;
          case 1:
          gridCTX.fillStyle = "red"
          break;
          case 2:
          gridCTX.fillStyle = "orange"
          break;
          case 3:
          gridCTX.fillStyle = "yellow"
          break;
          case 4:
          gridCTX.fillStyle = "green"
          break;
          case 5:
          gridCTX.fillStyle = "blue"
          break;
          case 6:
          gridCTX.fillStyle = "indigo"
          break;
          case 7:
          gridCTX.fillStyle = "violet"
          break;
          case 8:
          gridCTX.fillStyle = "white"
          break;
          case 9:
          gridCTX.fillStyle = "cyan"
          break;
          case 10:
          gridCTX.fillStyle = "darkred"
          break;
          case 11:
          gridCTX.fillStyle = "darkorange"
          break;
          case 12:
          gridCTX.fillStyle = "wheat"
          break;
          case 13:
          gridCTX.fillStyle = "darkgreen"
          break;
          case 14:
          gridCTX.fillStyle = "midnightblue"
          break;
          case 15:
          gridCTX.fillStyle = "purple"
          break;
          case 16:
          gridCTX.fillStyle = "brown"
          break;
          case 17:
          gridCTX.fillStyle = "gray"
          break;
          case 18:
          gridCTX.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';
          break;
          }
          
          //PAINTS THE SQUARES
         gridCTX.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
         
          if(x == rx && y == ry){

            rz = carto[i].z
          
          }  }  }


function drawLabels(){

for (let i = 0; i < data.length; i++) {
        

      let location = data[i].location   
                
                 if(location.length>0){
                  
                  let ix = data[i].x * tileSize + (tileSize * 1.2)
                  let iy = data[i].y * tileSize
                  let iwidth = location.length * 8
                  let iheight =  tileSize
                  

                  if(rx == data[i].x && ry == data[i].y){

                  //Behind Name
                  mapCTX.fillStyle = 'black'
                  mapCTX.fillRect(ix,iy,iwidth,iheight);
                  //Write name
                  mapCTX.font = "12px Helvetica";
                  mapCTX.fillStyle = 'wheat';

                  
                  //PAINTS LOCATION NAMES
                  mapCTX.fillText(location,ix+ 0.35 * tileSize, iy + 0.75 * tileSize);
                  } 

                  if(Math.floor(x/tileSize) == data[i].x && Math.floor(y/tileSize) == data[i].y){

                    
                    //Behind Name
                    mapCTX.fillStyle = 'black'
                    mapCTX.fillRect(ix,iy,iwidth,iheight);
                    //Write name
                    mapCTX.font = "12px Helvetica";
                    mapCTX.fillStyle = 'wheat';
  
                    
                    //PAINTS LOCATION NAMES
                    mapCTX.fillText(location,ix+ 0.35 * tileSize, iy + 0.75 * tileSize);
                    rLocation = location
                    } 
        
                }
              
              rLocation = ""
              
              }}

                function drawUser(){

                  for (var i = 0; i < users.length; i++) {

                  //User Information
                  let user = users[i].username
                  let x = (users[i].x * tileSize)
                  let y = (users[i].y * tileSize) 
                  let xward = user.length * 8
                  let yward = tileSize
                            
                  //Draw Selection 
                  
                  mapCTX.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';
                  mapCTX.fillRect(x,y,tileSize,tileSize);
                  
                  //Behind Name
                  mapCTX.fillStyle = 'black'
                  mapCTX.fillRect(x + (tileSize * 1.2), y+ tileSize, xward, yward);
                  //Write name
                  mapCTX.font = "12px Helvetica";
                  mapCTX.fillStyle = 'orange';
                  mapCTX.fillText(user, x + (tileSize * 1.2) + 6, y + (tileSize) * 1.75 );

                  }}

                
               

function fillMap_Random(){
  
   for (var x = 0; x <= mapwidth; x += tileSize) {
    for (var y = 0; y <= mapheight; y += tileSize) {
   
            mapCTX.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';        
            mapCTX.fillRect(x, y, tileSize, tileSize)
                        
  
   }} }
  

//-----------------------------------------------------------------------------

// MOUSE TRACKING



// Add the event listeners for mousedown, mousemove, and mouseup
map.addEventListener('mousedown', e => {
  
  x = e.offsetX;
  y = e.offsetY;

  rx = Math.floor( x / tileSize) 
  ry = Math.floor( y / tileSize) 


  if( y > 12){
  permMap() 

  document.getElementById('TextDesc1')


    
  }
    
});

window.addEventListener('mouseup', e => {
   
  console.log('+++++++++++++++++++')
  console.log('DEVELOPER VARIABLES')
  console.log('(x: ' + x+','+' y: ' + y+')')
  console.log('(rx: ' + rx+','+' ry: ' + ry+')')
  console.log('FPS: ' + fps);
    

  //if( y > 12){
  
    mapData()

    //}
  
  
});

function CallLocation(){

  for (let i = 0; i < data.length; i++) {

let ix = data[i].x 
let iy = data[i].y

    if(rx = ix && ry == iy){
    let Location = data[i].location
    let A = data[i].A
    let B = data[i].B
    let C = data[i].C
    let D = data[i].D
    let E = data[i].E

    console.log(Location + ' ' + A + ' ' + B + ' ' + C + ' ' + D + ' ' + E)}
    
}}


grid.addEventListener('mousemove', e => {
  
  x = e.offsetX;
  y = e.offsetY;

});

//-----------------------------------------------------------------------------

//HOT KEYS
var Reload 


document.onkeyup = function(e) {
  if (e.shiftKey && e.which == 40) {
     
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
    
    } else if (e.which == 189) {
           
      tileSize -= 2
    
    }


   
    }

   
//-----------------------------------------------------------------------------
//TOOLBAR AT TOP

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

  fetch(mapData, {
    method: 'POST',
    body: newData,
    
  })

LoadMap()

})

}
)




function mapData(){

  document.getElementById('testX').value = rx
  document.getElementById('testY').value = ry
  document.getElementById('testZ').value = 0
  document.getElementById('testLocation').value = rLocation
  console.log('+++++++++++++++++++')
  console.log('UPDATED')
  console.log('(X: ' + rx+','+'Y: ' + ry+')')
  console.log('FPS: ' +fps);

}
    
  