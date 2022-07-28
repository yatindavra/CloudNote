const connectToMongo = require("./db");
const express = require('express');
const app = express();
const port = 3000;

connectToMongo();



// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port,()=>{
    console.log(`example app listening at ${port}`)
})