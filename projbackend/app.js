require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

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
app.use('/api', userRoutes);

//Port
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
});