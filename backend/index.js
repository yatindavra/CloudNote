const connectToMongo = require("./db");
const express = require('express');
const app = express();
const port = 4000;

connectToMongo();


app.use(express.json())
// respond with "hello world" when a GET request is made to the homepage

// available routes

app.use("/api/auth",require('./routes/auth'))
app.use("/api/notes",require('./routes/notes'))


// app.get('/', (req, res) => {
//   res.send('hello world')
// })

// app.get('/api/v1/login', (req, res) => {
//     res.send('hello login')
//   })

//   app.get('/api/v1/signup', (req, res) => {
//     res.send('hello signup')
//   })

app.listen(port,()=>{
    console.log(`example app listening at ${port}`)
})
