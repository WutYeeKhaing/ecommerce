const port = 4000;
const express = require("express");
const app =express();
const mongoose =require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://wutyeeuuu3132020:<wutyeeuuu313202>@cluster0.5wbjgdb.mongodb.net/Ecommerce");

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})



app.listen(port,(error)=>{
    if (!error) {
        console.log("Sever is Running on Port" +port) 
    }
    else
    {
        console.log("Error :" +error)
    }
})