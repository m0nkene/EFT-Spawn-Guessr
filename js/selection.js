function generateMap(name){

  return new Promise((resolve,reject) =>{
    sessionStorage.setItem('spawn_name' , name);

    let num = '1';

    //reading JSON and determining which map to present - will only use 5 for right now
    fetch('locations/' + name + '/' +  name + '_spawns.json')
      .then(response => response.json())
      .then(data => {
        let len = data.factory.length;
        console.log(len);
        let rand = (Math.floor(Math.random() * len)).toString();
        sessionStorage.setItem('spawn_num' , num);
        console.log(rand);

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
