const mongoose = require('mongoose');

const DB_HOST =
  'mongodb+srv://Serhii_Mukhin:Ir3jTppMXV8FB93M@cluster0.nldskyi.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

const app = require('./app');
