const cookieParser = require('cookie-parser');
const express=require('express');
const morgan = require('morgan');
const app=express()
const cors=require('cors')

app.use(morgan("dev"));

app.use(express.json())


app.use(cookieParser());

app.use(
    cors({
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      credentials: true,
    })
  );


  app.get("/", (req, res) => {
    res.send("<h1>TRASH TALK</h1>");
  });

app.listen(3000,()=>{
    console.log('servidor escuchando en el puerto 3000');
})