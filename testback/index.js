const express = require("express");

const app = express();

const port = 8000;

const admin = (req, res) => {
  res.send("This is admin dashboard")
}

const isAdmin = (req, res, next) => {
  console.log("Inside isAdmin Function");
  next();
};

const isLoggedIn = (req, res, next) => {
  console.log("Inside isLoggedIn Function");
  next();
};

app.get('/login', (req, res) =>{
  res.send('You are visiting a login route');
});

app.get('/admin', isLoggedin, isAdmin, admin);

app.listen(port, () =>{
  console.log('Listening at port 8000');
});

// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })