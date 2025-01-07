const port = 4000;
const express = require("express");
const app =express();
const mongoose =require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://wutyeeuuu3132020:wutyeeuuu313202@cluster0.5wbjgdb.mongodb.net/Ecommerce");
//Api Creation//
app.get("/",(req,res)=>{
    res.send("Express App is Running")
})
// First, make sure the upload directory exists
const fs = require('fs');
const uploadDir = './upload/images';

// Create directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Image storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload/images');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    // Add file filter for security
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});

// Serve static files
app.use('/images', express.static('upload/images'));

// Upload endpoint with error handling
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        res.json({
            success: true,
            message: "File uploaded successfully",
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: "Error uploading file",
            error: error.message
        });
    }
});

app.get("/test", (req, res) => {
    res.json({ message: "Server is running" });
});
app.get("/test-static", (req, res) => {
    res.sendFile(path.join(__dirname, "upload/images/test.txt"));
});
//schema for creating products //
const Product =mongoose.model("Product",{
    id:{
        type: Number ,
        required : true,
    },
    name:{
        type: String ,
        required:true,
    },
    image:{
        type: String ,
        required:true,
    },
    category:{
        type: String ,
        required:true,
    },
    new_price:{
        type: Number ,
        required:true,
    },
    old_price:{
        type: Number ,
        required:true,
    },
    date:{
        type: Date ,
        default:Date.now,
    },
    avaliable:{
        type: Boolean,
        default :true,
    },
})
app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array= products.slice(-1);
        let last_product = last_product_array[0];
        id= last_product.id+1;
    }else{
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
     
      
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})
//Create Api for deleting products//
app.post('/removeproduct', async(req,res)=>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed")
  res.json({
    success:true,
    name:req.body.name
  })
})

//Creat Api for get all products//
app.get('./allproducts',async(res,req)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})
//user model//
const Users = mongoose.model('Users',{
    name:{
        type:String,
      unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
  type:Date,
  default:Date.now,
    },
})

//endpoint register//
app.post('/signup' ,async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if (check){
        return res.status(400).json({success:false,errors:"existing"})
    }
    let cart ={};
 for (let i=0; i< 300; i++){
    cart[i] = 0;
 }
 const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
 })
 await user.save();
 const data ={
    user:{
        id:user.id
    }
 }
 const token = jwt.sign(data,'secret_ecom');
 res.json({success:true,token})
})
// creat endpoint user login//
app.post('/login',async(req,res)=>{
  let user= await Users.findOne({email:req.body.email});
  if(user){
    const passCompare = req.body.password=== user.password;
    if(passCompare){
        const data ={
            user:{
              id:user.id
            }
        }
        consttoken = jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
    }
    else{
        res.json({success:false,errors:'Wrong Password'})
    }
  }
  else{
    res.json({success:false,errors:'Wrong Email Id'})
  }
})


// Create API for get new collections
app.get('/newcollection', async (req, res) => {  // Fixed parameter order
    let products = await Product.find({});
    let newcollection = products.slice(-8);  // Fixed slice syntax
    console.log('newcollection fetched');
    res.send(newcollection);
});

// Create API for popular in women
app.get('/popularwomen', async (req, res) => {  // Fixed parameter order
    let products = await Product.find({category: "women"});
    let popular = products.slice(0, 4);
    console.log('popular in women');
    res.send(popular);
});


// Middleware to fetch user from JWT token
const fetchUser = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ success: false, error: "Please authenticate using a valid token" });
        }

        const data = jwt.verify(token, 'secret_ecom'); // Use the same secret you used for signing
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: "Please authenticate using a valid token" });
    }
}

app.post('/sync-cart', fetchUser, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        user.cartData = req.body.cartItems;
        await user.save();
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: error.message });
    }
});


// creating endpoint to add product in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
  try{
     console.log("added to cart", req.body.itemId);
      let userData = await Users.findOne({ _id: req.user.id });
         userData.cartData[req.body.itemId] += 1;
        await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
      res.send({ success: true });

  } catch(error) {
     console.error('Error adding to cart', error);
     res.status(500).json({success:false,error:`Error adding to cart, message:${error.message}`});
 }
});

// creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
try {
     console.log("removed from cart", req.body.itemId);
   let userData = await Users.findOne({ _id: req.user.id });
      if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
      await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
          }
      res.send({ success: true });
}
catch (error) {
console.error('Error removing from cart', error);
     res.status(500).json({success:false,error:`Error removing from cart, message:${error.message}`});
 }
});

app.post('/getcart',fetchUser, async(req,res)=>{
    try{
        console.log("GetCart");
        let userData = await Users.findOne({ _id: req.user.id });
        res.json({success:true, cartData:userData.cartData});
    } catch(error){
            console.error('Error getting cart', error);
       res.status(500).json({success:false,error:`Error getting cart, message:${error.message}`});
      }

});
app.listen(port,(error)=>{
    if (!error) {
        console.log("Sever is Running on Port" + port) 
    }
    else
    {
        console.log("Error :" +error)
    }
})
