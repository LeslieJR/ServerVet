const express = require('express');
const routes = require('./routes')

const cors = require('cors');
const app = express();

//Settings
app.use(express.json());
app.use(cors())
//Routes
app.use(routes.clientsRoutes);
app.use(routes.dogsRoutes);
//Public
 
module.exports= app;
