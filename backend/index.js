require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express();
const PORT = 3000;
const User = require("./Models/User.js")

app.use(cors());

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json()); 
app.use('/api',require("./Routes/userRoutes.js"))



app.listen(PORT, (error) =>{
    if(!error)
        console.log(`Server is Successfully Running, and App is listening on port  ${PORT}................`);
    else 
        console.log("Error occurred, server can't start", error);
    }
);