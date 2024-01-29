function generateMap(name){

  //let num = '10';

  return new Promise((resolve,reject) =>{
    console.log(name);

    

    const fileNm =  'locations/' + name + '/' +  name + '_spawns.json';
    console.log(fileNm);

    //reading JSON and determining which map to present - will only use 8 for right now
    fetch(fileNm)
      .then(response => response.json())
      .then(data => {
        
        let len = data[name].length;
        
        let rand = ((Math.floor(Math.random() * len)+1)).toString();
        

        let spawn = data[name].find(spawn => spawn.id === rand);
        console.log(JSON.stringify(spawn));


        sessionStorage.setItem('spawn_name' , name);
        sessionStorage.setItem('spawn_num' , rand);
        sessionStorage.setItem('spawn_data' , JSON.stringify(spawn));
        resolve();
      })

      .catch(error => {
        console.error('Error loading JSON:', error);
        reject(error);
      });
  });
}
