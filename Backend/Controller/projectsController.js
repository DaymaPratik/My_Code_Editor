const projectModel=require('../Model/projectsModel')
const getAllProjectFunction=async(req,res)=>{
  //  console.log("__",req.body);
  const {name,_id}=req.body;
   const allProjectsData=await projectModel.find({
    userId:_id
   });
  //  console.log(allProjectsData);
    res.json({
      status:true,
      message:"Getting all projects",
      allProjectArray:allProjectsData
    })
}




const deleteProjectFunction = async (req, res) => {
  try {
    let { id } = req.params;
    let newStr = id.replace(/:/g, '');
    const project = await projectModel.findByIdAndDelete(newStr);   
    res.json({
      status: true,
      message: "Getting deleted project",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error getting project",
      error: error.message,
    });
  }
};

const createNewProjectFunction= async (req,res)=>{
  // console.log(req.body);
  const {name,userId,title,html,css,js,output}=req.body;
  if(!(name && userId && title && html && output)){
    return res.status(200).json({message:"All fields of project must be required"})
  }
    try {
      const newlyCreatedProject= await projectModel.create(req.body);
      res.json({
        status:true,
        message:"Creating new Project"
     })
    } catch (error) {
      res.json({
        status:false,
        message:"Error while creating new project"
      })
      console.log(error);
    }
}
const saveEditProjectFunction=async(req,res)=>{
  try {
    console.log("Saving Project from body",req.body);
    const {_id,...projectObj}=req.body;
    console.log("id of project",_id);
    const editedProject=await projectModel.findByIdAndUpdate(
     _id,
    { $set: projectObj }
    );
    res.json({
      status:true,
      message:"Saving Edit Project"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status:true,
      message:error
    })
  }
}
module.exports={
    getAllProjectFunction,
    createNewProjectFunction,
    // editProjectFunction,
    saveEditProjectFunction,
    deleteProjectFunction
}