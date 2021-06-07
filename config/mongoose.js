const mongoose = require('mongoose');
const env = require('./environment')
mongoose.connect(`mongodb://localhost/${env.db}`, { useNewUrlParser: true ,useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to db"));

db.once('opne',function(){
    console.log("connected to mongodb");
});

module.exports =db;