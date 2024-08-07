const mongoose = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();

const mongoURI=process.env.mongouri;
async function connectToMongo() {
    await mongoose.connect(mongoURI)
    .then(()=> console.log("Connected to Mongo Successfully"))
    .catch(err => console.log(err));
}  

module.exports = connectToMongo;



