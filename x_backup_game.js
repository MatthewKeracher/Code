//import TileMap from "./TileMap.js";

var data = []
var fillList = []
var xList = []
var yList = []

//-----------------------------------------------------------------------------
//GAMELOOP

function gameLoop() {
  //Variables
  var thisLoop = new Date();
  var fps = Math.floor(1000 / (thisLoop - lastLoop));
  lastLoop = thisLoop;

  
  //Draw The Map  
  drawMap()

  //Draw Selection  
  ctx.strokeStyle = "pink";
  ctx.strokeRect(rx * tileSize , ry * tileSize , tileSize, tileSize);
 
  
  //Show FPS etc.

  //console.log('FPS: ' +fps);
  //console.log('(X): ' + rx);
  //console.log('(Y): ' + ry);

}

//Something to do with how long each loop is...
setInterval(gameLoop, 1000 / 60);


//-----------------------------------------------------------------------------
//IMPORT DATA
//Connection to Google Sheet
//Sheet URL between /d/ and /edit/
const sheetID = '1lGlBfPSeCIjMOCyAUvtOiaUDU0f1J_l5FV_N0sRUY48';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`
const sheetName = 'Global'
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`;


document.addEventListener('DOMContentLoaded',LoadMap);

const output = document.querySelector('.output');

function LoadMap(){
  console.log('Connection to ' + sheetName + ' has been made.');
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
       //console.log(ele);
        //iferror syntax here
        row[ele] = (main.c[ind] != null) ? main.c[ind].v : '';
      })
      data.push(row)
     }) 
 
     getData()
  })

}

function getData(){

  var i = 0
   
      data.forEach(function(datum) {

      fillList.push(datum.fill[i])
      xList.push(datum.x[i])
      yList.push(datum.y[i])
      i++      

   })

}


//-----------------------------------------------------------------------------
// DRAW MAP!

const mapwidth = 2000
const mapheight = 1600
const p = 0;
const tileSize = 18;
const EndX = Math.floor(mapheight/tileSize)
const EndY = Math.floor(mapwidth/tileSize)

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function drawMap(){
//const tileMap = new TileMap(tileSize);

ctx.clearRect(0, 0, mapwidth, mapheight);
drawgrid();
drawBoard();
fillMap_Random(); //_Random 

}

function drawgrid() {
  for (var x = 0; x <= mapwidth; x += tileSize) {
    for (var y = 0; y <= mapheight; y += tileSize) {
      ctx.fillStyle = "black";
      ctx.moveTo(p, 0.5 + x + p);
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}

function drawBoard() {
  for (var x1 = 0; x1 <= mapwidth; x1 += tileSize) {
    ctx.moveTo(0.5 + x1 + p, p);
    ctx.lineTo(0.5 + x1 + p, mapheight + p);
  }

  for (var x2 = 0; x2 <= mapheight; x2 += tileSize) {
    ctx.moveTo(p, 0.5 + x2 + p);
    ctx.lineTo(mapwidth + p, 0.5 + x2 + p);
  }
  ctx.strokeStyle = "green";
  ctx.stroke();
}

function fillMap(){

for (var i = 1; i >= fillList.length; i++){

   
        let fill = fillList[i]
        let x = xList[i]
        let y = yList[i]

        console.log(x +',' + y + '; ' + fill)
        
        if(fill > 0 && x > 0 && y > 0){
        console.log('')
        }else{break}

          //Paintbrush
          switch (fill) {
          case 0:
          ctx.fillStyle = "black";
          break;
          case 1:
          ctx.fillStyle = "red"
          break;
          case 2:
          ctx.fillStyle = "orange"
          break;
          case 3:
          ctx.fillStyle = "yellow"
          break;
          case 4:
          ctx.fillStyle = "green"
          break;
          case 5:
          ctx.fillStyle = "blue"
          break;
          case 6:
          ctx.fillStyle = "indigo"
          break;
          case 7:
          ctx.fillStyle = "violet"
          break;
          case 8:
          ctx.fillStyle = "white"
          break;
          case 9:
          ctx.fillStyle = "cyan"
          break;
          case 10:
          ctx.fillStyle = "darkred"
          break;
          case 11:
          ctx.fillStyle = "darkorange"
          break;
          case 12:
          ctx.fillStyle = "wheat"
          break;
          case 13:
          ctx.fillStyle = "darkgreen"
          break;
          case 14:
          ctx.fillStyle = "midnightblue"
          break;
          case 15:
          ctx.fillStyle = "purple"
          break;
          case 16:
          ctx.fillStyle = "brown"
          break;
          case 17:
          ctx.fillStyle = "gray"
          break;
          case 18:
          ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';
          break;
          }
              
        
         ctx.fillRect(x, y, tileSize, tileSize)


}}

function fillMap_Random(){
  
   for (var x = 0; x <= mapwidth; x += tileSize) {
    for (var y = 0; y <= mapheight; y += tileSize) {
   
            ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')';        
            ctx.fillRect(x, y, tileSize, tileSize)
                        
  
   }} }
  

//-----------------------------------------------------------------------------

// MOUSE TRACKING

var x 
var y 

var rx //nearest square
var ry

var lastLoop = new Date();

// Add the event listeners for mousedown, mousemove, and mouseup
game.addEventListener('mousedown', e => {
  
  x = e.offsetX;
  y = e.offsetY;

  rx = Math.floor( x / tileSize)
  ry = Math.floor( y / tileSize)

});

window.addEventListener('mouseup', e => {
  //damned thing can't be deleted
    let isDrawing = false
    var drawLine
    if (isDrawing = true) {
    drawLine(ctx, x, y, e.offsetX, e.offsetY);
  //

    x = 0;
    y = 0;

    rx = 0
    ry = 0
    
  }
});

game.addEventListener('mousemove', e => {
  
  x = e.offsetX;
  y = e.offsetY;

});

//-----------------------------------------------------------------------------
