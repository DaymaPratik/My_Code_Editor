const mongoose=require('mongoose');
const projectSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    userId:{
        type:String,
    },
    title:{
        type:String,
    },
    html:{
        type:String,
    },
    css:{
        type:String,
    },
    js:{
        type:String,
    },
    output:{
        type:String,
    }

})
const projectModel=mongoose.model('Projects_Data',projectSchema);
module.exports=projectModel;