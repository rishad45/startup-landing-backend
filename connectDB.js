const mongoose = require('mongoose')
require('dotenv').config()    

const dbConnect = async () => {
    mongoose
    .connect(
        process.env.DB_CONNECTION_STRING,
      {
        //   these are options to ensure that the connection is done properly
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}
module.exports = dbConnect 