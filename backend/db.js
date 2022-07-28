const mongoose = require("mongoose")
const mongoUri = "mongodb://localhost:27017"

const connectToMongo =()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("connected successfully")
    });
}

module.exports = connectToMongo;