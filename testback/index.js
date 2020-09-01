const express = require("express");

const app = express();

const port = 8000;

app.get('/login', (req, res) =>{
  res.send('You are visiting a login route');
});

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