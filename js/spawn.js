
let spawn_num = sessionStorage.getItem('spawn_num');
let spawn_name = sessionStorage.getItem('spawn_name');
let spawn_data = JSON.parse(sessionStorage.getItem('spawn_data'));

let timerInterval;
let time = 0;

function timer(toggle){

  let panRead = document.getElementById("panRead");
  let mapRead = document.getElementById("mapRead");
  //readOut.disable(true);

  if (toggle){
    timerInterval = setInterval(function (){
      time+= 0.01;
      panRead.innerHTML = time.toFixed(2);
      mapRead.innerHTML = time.toFixed(2);
    },10);
  }
  else {
    //console.log(time);
    clearInterval(timerInterval);
    return time;
  }
}

 function startGame(){

   console.log(spawn_num);
   console.log(spawn_name);
   console.log(JSON.stringify(spawn_data));

   document.getElementById('startOverlay').style.display = 'none';
   document.getElementById('player').style.display = 'block';

   pannellum.viewer('panorama', {
     "type": "equirectangular",
     "panorama": "locations/"+spawn_name+"/pans/"+spawn_name+"_"+spawn_num+"_PAN.jpg",
     "autoLoad" : true,
   });

   timer(true);
}


function guess(e){

  const cor_x = spawn_data["x_cords"];
  const cor_y = spawn_data["y_cords"];

  let time = timer(false).toFixed(2);
  let pos_x = e.clientX;
  let pos_y = e.clientY;
  let SCORE = scorer(time,pos_x,pos_y,cor_x,cor_y);

  //logging the score to the console for reference
  //console.log(SCORE);
  let reader = document.getElementById('scoreReader');
  reader.innerHTML = SCORE +" | X: "+pos_x+" | Y: "+pos_y;



  //TOGGLING THE SCORE OVERLAY, CLOSING ALL OTHERS TO USE MAIN BACKGROUND
  document.getElementById('mapOverlay').style.display = 'none';
  document.getElementById('player').style.display = 'none';
  document.getElementById('startOverlay').style.display = 'none';
  document.getElementById('scoreOverlay').style.display = 'block';
}

function scorer (time, user_x, user_y, cor_x, cor_y){

  const origWidth = 7680;
  const origHeight = 4320;

  let rect = document.body.getBoundingClientRect();

  //calculating click position relative to the element size/location
  let x = user_x - rect.left;
  let y = user_y - rect.top;

  //normalize click to original screen size
  let normX = x / rect.width * origWidth;
  let normY = y / rect.height * origHeight;


  let dx = cor_x - normX;
  let dy = cor_y - normY
  let dist = Math.sqrt((dx * dx) + (dy * dy)).toFixed();

  return dist;

  // let time2 = time * 100;
  // const mod = 10;
  //
  // //return dist;
  //
  // switch (true){
  //   case (dist <= 30):
  //     return (100000 - (time2 * mod));
  //
  //   case (dist > 30 && dist <= 60):
  //     return (50000 - (time2 * mod));
  //
  //   case (dist > 60 && dist <= 90):
  //     return (25000 - (time2 * mod));
  //
  //   default:
  //     return (0 - (time2 * mod));
  // }
}


//WILL OPEN THE MAP OVERLAY WHEN THE GUESS BUTTON IS PRESSED, THE EVENT LISTENER WILL PASSIVELY WAIT FOR AN ESCAPE KEY PRESS
function showMapOverlay() {
  document.getElementById('mapOverlay').style.display = 'block';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' || e.keyCode === 27) {
    document.getElementById('mapOverlay').style.display = 'none'; // Hides the map overlay
  }
});
