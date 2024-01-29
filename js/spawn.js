
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
      //mapRead.innerHTML = time.toFixed(2);
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
  document.getElementById('map').style.display = 'block';
  document.getElementById('player').style.display = 'block';

  init();

  pannellum.viewer('panorama', {
    "type": "equirectangular",
    "panorama": "locations/"+spawn_name+"/pans/"+spawn_name+"_"+spawn_num+"_PAN.jpg",
    "autoLoad" : true,
  });

  timer(true);
}


function guess(e){

  let time = timer(false).toFixed(2);
  let coords = e.latlng;
  let SCORE = 0;

  if(spawn_data["type"]=== "targ"){
    const cor_x = spawn_data["x_cords"];
    const cor_y = spawn_data["y_cords"];

    SCORE = targScorer(time,coords.lat,coords.lng,cor_x,cor_y);
  }
  else{
    const cor_x1 = spawn_data["x1_cords"];
    const cor_y1 = spawn_data["y1_cords"];
    const cor_x2 = spawn_data["x2_cords"];
    const cor_y2 = spawn_data["y2_cords"];

    SCORE = boxScorer(time, coords.lat, coords.lng, cor_x1, cor_y1, cor_x2, cor_y2)
  }

  //logging the score to the console for reference
  console.log(SCORE);
  let reader = document.getElementById('scoreReader');
  reader.innerHTML = SCORE;


  //TOGGLING THE SCORE OVERLAY, CLOSING ALL OTHERS TO USE MAIN BACKGROUND
  document.getElementById('mapOverlay').style.display = 'none';
  document.getElementById('player').style.display = 'none';
  document.getElementById('startOverlay').style.display = 'none';
  document.getElementById('leaflet_container').style.display = 'none';
  document.getElementById('scoreOverlay').style.display = 'block';

  //clearing session values between guesses
  sessionStorage.setItem('spawn_num' , '0');
  sessionStorage.setItem('spawn_name' , null);
  sessionStorage.setItem('spawn_data', null);
}

function targScorer (time, user_x, user_y, cor_x, cor_y){

  let dx = cor_x - user_x;
  let dy = cor_y - user_y;
  let dist = Math.sqrt((dx * dx) + (dy * dy)).toFixed();

  const mod = 10;
  
  //return dist;
  
  switch (true){
    case (dist <= 5):
      return (((10000 / time).toFixed(2))*100).toFixed();
  
    case (dist > 5 && dist <= 10):
      return (((5000 / time).toFixed(2))*100).toFixed();
  
    case (dist > 10 && dist <= 15):
      return (((2500 / time).toFixed(2))*100).toFixed();
  
    default:
      return (0);
  }
}

function boxScorer(time, user_x, user_y, x1, y1, x2, y2){
  
  console.log("X: "+user_x.toFixed(2)+" Y: "+user_y.toFixed(2));


  if (x2 <= user_x && user_x <= x1 && y1 <= user_y && user_y <= y2){
    let score = (((10000 / time).toFixed(2))*100).toFixed();
    console.log(score);
    return score;
  }
  else
    return 0;
}

//WILL OPEN THE MAP OVERLAY WHEN THE GUESS BUTTON IS PRESSED, THE EVENT LISTENER WILL PASSIVELY WAIT FOR AN ESCAPE KEY PRESS
function showMapOverlay() {
  document.getElementById('map').style.display = 'block';
  document.getElementById('map').style.height = '60vh'; // reverts the map overlay
  document.getElementById('map').style.width = '50vw';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' || e.keyCode === 27) {
    document.getElementById('map').style.height = '35vh'; // reverts the map overlay
    document.getElementById('map').style.width = '30vw';
  }
});
