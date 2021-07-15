const uuid = require("uuid");

const fs = require("fs");

const dbPath = "src/database.json";
const str_db = fs.readFileSync(dbPath, "utf-8");
const db = JSON.parse(str_db);

//create one dog for a client
const createDog = (req, res) => {
    const clientId = req.params.id;
    const { name, age, breed } = req.body;
    if (!name || !age || !breed) {
      return res.send("required fields empty"); //sin el return seguiría la ejecución
    }
  
    const dog = {
      id: uuid.v4(),
      name,
      age,
      breed,
    };
  
    let client = null;
    //SEARCH A CLIENT BY ID
    for (let i = 0; i < db.length; i++) {
      if (db[i].id === clientId) {
        client = db[i];
        //PUSH UN NUEVO PERRO AL ARRAY
        client.dogs.push(dog);
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
          if (err) {
            console.log("There was an error");
          }
        });
        break;
      }
    }
    res.json({ client });
  }

  //get one dog of a client
  const getDog = (req, res) => {
    const clientId = req.params.clientid;
    const dogId = req.params.id;
    const { name, age, breed } = req.body;
    if (!name || !age || !breed) {
      return res.send("required fields empty"); //sin el return seguiría la ejecución
    }
    let client = null;
    let dog = null;
    for (let i = 0; i < db.length; i++) {
      //SEARCH A CLIENT BY ID
      if (db[i].id === clientId) {
        client = db[i];
        //SEARCH A DOG BY ID
        for (let j = 0; j < client.dogs.length; j++) {
          if (client.dogs[j].id === dogId) {
            dog = client.dogs[j];
  
            fs.writeFile(dbPath, JSON.stringify(db), (err) => {
              if (err) {
                console.log("There was an error");
              }
            });
            break;
          }
        }
      }
    }
    res.json({ dog });
  }

  //Update a dog
  const updateDog = (req, res) => {
    const clientId = req.params.clientid;
    const dogId = req.params.id;
    const { name, age, breed } = req.body;
    if (!name || !age || !breed) {
      return res.send("required fields empty"); //sin el return seguiría la ejecución
    }
    let client = null;
    let dog = null;
    for (let i = 0; i < db.length; i++) {
      //SEARCH A CLIENT BY ID
      if (db[i].id === clientId) {
        client = db[i];
        //SEARCH A DOG BY ID
        for (let j = 0; j < client.dogs.length; j++) {
          if (client.dogs[j].id === dogId) {
            dog = client.dogs[j];
            dog.name = req.body.name;
            dog.age = req.body.age;
            dog.breed = req.body.breed;
            fs.writeFile(dbPath, JSON.stringify(db), (err) => {
              if (err) {
                console.log("There was an error");
              }
            });
            break;
          }
        }
      }
    }
    res.json({ client });
  }

  //Delete a dog
  const deleteDog = (req, res) => {
    const clientId = req.params.clientid;
    const dogId = req.params.id;
  
    let client = null;
    let dog = null;
    for (let i = 0; i < db.length; i++) {
      //SEARCH A CLIENT BY ID
      if (db[i].id === clientId) {
        client = db[i];
        //SEARCH A DOG BY ID
        let index = -1;
        for (let j = 0; j < client.dogs.length; j++) {
          if (client.dogs[j].id === dogId) {
            index = i;
            break;
          }
        }
        if (index > -1) {
          client.dogs.splice(index, 1);
        }
      }
    }
    res.json({ client });
  }

  //Get all dogs of a client
  const getDogs = (req, res) => {
    const clientId = req.params.clientid;
    let dogs = null;
    //SEARCH A CLIENT BY ID
    for (let i = 0; i < db.length; i++) {
      if (db[i].id === clientId) {
        dogs = db[i].dogs;
        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
          if (err) {
            console.log("There was an error");
          }
        });
      }
    }
  
    res.json({ dogs });
  }

  module.exports = {
      createDog,
      updateDog,
      deleteDog,
      getDog,
      getDogs
  }