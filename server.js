const mongoose = require('mongoose');
require("dotenv").config()

const {DB_HOST, PORT } = process.env;
console.log(DB_HOST, PORT )

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

const app = require('./app');
