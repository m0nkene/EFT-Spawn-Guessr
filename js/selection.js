function generateMap(name){

  return new Promise((resolve,reject) =>{
    sessionStorage.setItem('spawn_name' , name);

    //reading JSON and determining which map to present - will only use 5 for right now
    fetch('locations/' + name + '/' +  name + '_spawns.json')
      .then(response => response.json())
      .then(data => {
        let len = data.factory.length;
        console.log(len);
        let rand = (Math.floor(Math.random() * len)).toString();
        sessionStorage.setItem('spawn_num' , rand);
        console.log(rand);

        let spawn = data.factory.find(spawn => spawn.id === rand);
        console.log(JSON.stringify(spawn));
        sessionStorage.setItem('spawn_data' , JSON.stringify(spawn));
        resolve();
      })

      .catch(error => {
        console.error('Error loading JSON:', error);
        reject(error);
      });
  });
}
