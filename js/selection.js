function generateMap(name){
  const num = '1';

  return new Promise((resolve,reject) =>{
    sessionStorage.setItem('spawn_name' , name);

    //reading JSON and determining which map to present - will only use 5 for right now
    fetch('locations/' + name + '/' +  name + '_spawns.json')
      .then(response => response.json())
      .then(data => {
        var len = data.length;
        var rand = Math.floor(Math.random() * len);
        sessionStorage.setItem('spawn_num' , num);

        let spawn = data.factory.find(spawn => spawn.id === num);
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
