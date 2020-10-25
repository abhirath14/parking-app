const sequelize = require('./utils/database');
const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const generalRoutes = require('./routes/index.js');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("", generalRoutes);

sequelize.sync().then(
  result => {
    console.log(process.env.PORT);
    app.listen(process.env.PORT);
  }
).catch(
  err => {
    console.log(err);
  }
);