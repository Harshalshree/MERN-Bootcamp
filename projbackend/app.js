require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() => {
    console.log("DB Connected");
})

const port = 8000;

app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
});