const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:Number,
    },
    password:{
        type:String,
    },
    token:{
        type:String,
        default:null
    }
})
const userModel=mongoose.model('User_Data',userSchema);
module.exports=userModel;