
let id =0;

function getCoords(e){

  let coords = e.latlng;
  let x = coords.lat;
  let y = coords.lng;

  id++;
  console.log("id: "+id+" | X: "+x+" | Y: "+y);

}
