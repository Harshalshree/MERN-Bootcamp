require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Connecting to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() => {
    console.log("DB Connected");
}).catch(() => {
    console.log("DB NOT CONNECTED")
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api', authRoutes);

//Port
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
});