const userModel=require('../Model/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
var cookieParser = require('cookie-parser');


//REGISTRATION OF USER FUNCTION
const registerUserFunction=async (req,res)=>{
const {name,email,mobile,password}=req.body;
// Vlidating all the Feilds are present or not.
if(!(name && email && mobile && password)){
  return  res.status(400).json({
    message:"all field required"
  })
}
// If all the feilds are present then checking that user is already registered by given or not
const ifUserExists=await userModel.findOne({email});
if(ifUserExists){
  return res.json({
    status:false,
    message:"User already exists with given mail"
  })

 
}
//If no user exists with given email then Regustering new user to database
try {
  // Encrypting password using bcrypt js so that it remains secure.
  const encryptedPass=await bcrypt.hash(password, 10 );
 //Creating new user in database
   const newlyCratedUser=await userModel.create({
    name,
    email,
    mobile,
    password:encryptedPass
   }); 
   
   //genetraing the jwt token
   const token=jwt.sign(
    {id:newlyCratedUser._id,email},
    "ajfwjrirewifhwfwrgfwhrfghwihwgfwuiwrefwyruecyrwuwfyecurchburctr9b",
    {expiresIn:"1h"}
   )

   newlyCratedUser.token=token;
   newlyCratedUser.password=undefined;
  //  sending cookie to web page using options object
   const options={
    expires:new Date(Date.now()+3*24*60*60*1000),
    path:'/',
   }
   res.cookie("token",token,options)
  return res.status(200).json({
    message:"Register user successfully",
    userObj:newlyCratedUser,
  })
} catch (error) {
    return res.json({
        status:false,
        message:"Error while creating user "
 })
}
}
//FUNCTION FOR USER LOGIN
const handleLoginFunction=async(req,res)=>{
  const {email,password}=req.body;
  if(!(email && password)){
   return res.status(400).json({
      status:false,
      message:"All feilds Required "
})
  }
  const ifUserExists=await userModel.findOne({email})
  if(!ifUserExists){
   return res.json({
      status:false,
      message:"No user found with given Email"
    })
  }
  const isPasswordCorrect=await bcrypt.compare(password,ifUserExists.password)
  if(isPasswordCorrect){
    const token=jwt.sign(
      {id:ifUserExists._id,email},
      'ajfwjrirewifhwfwrgfwhrfghwihwgfwuiwrefwyruecyrwuwfyecurchburctr9b',
      {expiresIn:'1h'}
    )
    ifUserExists.token=token;
    ifUserExists.password=undefined;
    const options={
      expires:new Date(Date.now()+3*24*60*60*1000),
      path:'/',
      // httpOnly:true,
      // secure:true
     }
   res.cookie("token",token,options)
   return res.status(200).json({
      status:true,
      message:"Login Successfull",
      userObj:ifUserExists
    })
  }else{
   return res.json({
      status:false,
      message:"Enter correct Password"
    })
  }
}



  const userControllerObj={
    registerUserFunction,
   handleLoginFunction
  }
  module.exports=userControllerObj;



