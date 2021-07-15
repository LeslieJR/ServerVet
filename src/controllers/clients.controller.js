const uuid = require("uuid");

const fs = require("fs");

const dbPath = "src/database.json";
const strDB = fs.readFileSync(dbPath, "utf-8");
const clients_db = JSON.parse(strDB);

//create one client
const create = (req, res) => {
    const { dni, name, surname, dogs } = req.body;
    if (!dni || !name || !surname || !dogs) {
      return res.send("Please fill the required fields.");
    }
  
    const newClient = {
      id: uuid.v4(),
      dni,
      name,
      surname,
      dogs,
    };
    clients_db.push(newClient);
  
    fs.writeFile(dbPath, JSON.stringify(clients_db), (err) => {
      if (err) {
        console.log("There was an error");
      }
    });
    res.json(newClient);
  };

  //Update one client
  const update = (req, res) => {
    const clientId = req.params.id;
    let clientUpdated = null;
    for (let i = 0; i < clients_db.length; i++) {
      if (clients_db[i].id === clientId) {
        clientUpdated = clients_db[i];
        clientUpdated.dni = req.body.dni;
        clientUpdated.name = req.body.name;
        clientUpdated.surname = req.body.surname;
        clientUpdated.dogs = req.body.dogs;
        fs.writeFile(dbPath, JSON.stringify(clients_db), (err) => {
          if (err) {
            console.log("There was an error");
          }
        });
        break;
      }
    }
  
    res.json({ clientUpdated });
  };

//Delete one client
const remove = (req, res) => {
    const client = req.params.id;
  
    let index = -1;
    for (let i = 0; i < clients_db.length; i++) {
      if (clients_db[i].id === client) {
        index = i;
        break;
      }
    }
  
    if (index > -1) {
      clients_db.splice(index, 1);
      fs.writeFile(dbPath, JSON.stringify(clients_db), (err) => {
        if (err) {
          console.log("There was an error");
        }
      });
    }
    res.json(clients_db);
  };

// Get one client
const getOne = (req, res) => {
    const clientId = req.params.id;
    let client = null;
  
    for (let i = 0; i < clients_db.length; i++) {
      if (clients_db[i].id === clientId) {
        client = clients_db[i];
        break;
      }
    }
    res.json({ client });
  };

//Get all clients
const getAll = (req, res) => {
    res.json(clients_db);
  };

  module.exports = {
    create,
    getOne,
    getAll,
    update,
    remove,
  };