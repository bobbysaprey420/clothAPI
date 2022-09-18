const mongoose = require("mongoose");
const dotenv   = require("dotenv");
dotenv.config();

var url = `mongodb+srv://clothAPI:clothAPI@cluster0.06dwg0l.mongodb.net/cloth?retryWrites=true&w=majority`;


const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

var db = mongoose.connect(url,connectionParams).then( () => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})

module.exports = db;