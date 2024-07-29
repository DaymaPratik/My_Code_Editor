import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext/UserContextProvider'
import { Link, useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { GiSplitCross } from "react-icons/gi";
import { ProjectsContext } from '../../Context/ProjectsContextProvider';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SideBar from '../../Components/SideBar/SideBar';

function AllProjects() {
    const {openNavSidebar,setOpenNavSidebar,userDetails,logout,setIsLogin}=useContext(UserContext);
    const {projectsArray,setProjectsArray,setEditTableProject,setEdit}=useContext(ProjectsContext);
    const [loading,setLoading] = useState(true);
    const navigate=useNavigate();
    const setIsLoginTrue=()=>{
      setIsLogin(true);
    }
    const setIsLoginFalse=()=>{
      setIsLogin(false);
    }
    useEffect(()=>{
        const getAllProjectFunction=async()=>{
            const response=await fetch("https://my-code-editor.onrender.com/api/getAllProjects",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                credentials:'include',
                body:JSON.stringify(userDetails),
            })
            const data=await response.json();
            setProjectsArray(data.allProjectArray);
            console.log("gettings all the projects of the user",data.allProjectArray);
            
        }
        setTimeout(()=>{
            setLoading(false)
          },2000)
        return ()=>getAllProjectFunction();
    },[])
    
    const handleEdit=async(id)=>{
      const response=await fetch(`https://my-code-editor.onrender.com/api/editProject/:${id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentails:'include',
      })
      const data=await response.json();
      setEditTableProject(data.project);
      setEdit(true);
      console.log(data);
      navigate('/newProject');
     }
     const deleteProjectFunction=async(id)=>{
      const response=await fetch(`https://my-code-editor.onrender.com/api/deleteProject/:${id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentails:'include',
      })
      const data=await response.json();
      window.location.reload();
      console.log(data);

     }
  return (
  <>
  {openNavSidebar && 
   <SideBar/>
     }
    {
        loading
        ?
        <div className='h-[90vh] w-full bg-black flex justify-center items-center'>
            <HashLoader color="#ff0101" />
        </div>
        :
        <div className='flex flex-wrap justify-center items-start py-8 gap-7 min-[1256px]:gap-10 px-[25px] min-[1256px]:px-[50px]
         min-h-[90vh] w-[100%] bg-[#000000]'>
        {
        projectsArray.length!==0
        ?
        projectsArray.map((item,idx)=>{
            return (
               <div key={item._id} className=' relative h-[440px] rounded-md
                min-[1024px]:h-[350px] w-[250px] min-[1024px]:w-[300px] 
                shadow-[0px_0px_10px_2px_red,0px_0px_10px_2px_blue] text-[rgb(255,0,0)]
                 min-[1256px]:w-[350px] px-4 py-3  bg-[#83545457]' >
               <div className='bg-white mb-2 h-[70%] '> 
                 <iframe  srcDoc={item.output} className='w-[100%] h-[100%] ' />
               </div>
                 <div className='text-center'>
                    <p className='text-[23px] font-semibold'>{item.title}</p>
                    <p className='text-[18px] font-bold'>{item.name}</p>
                  <div className='flex gap-3 text-[30px] absolute bottom-2 right-2'>
                   < MdDelete title='Delete' className='hover:cursor-pointer p-1 transition ease-in duration-200 hover:shadow-[0px_0px_5px_0px_#c3fdff] hover:text-[#c3fdff]' 
                    onClick={()=>{deleteProjectFunction(item._id)}}/>
                   <FaEdit title='Edit' className='hover:cursor-pointer transition p-1 ease-in duration-200 hover:shadow-[0px_0px_5px_0px_#c3fdff] hover:text-[#c3fdff]' 
                   onClick={()=>{handleEdit(item._id)}}/>
                    
                   </div>
                 </div>
               </div>
            )
        })
        :
        <div>
        <h3 className='w-[100%] py-2 border-2 text-center border-green-500 text-[30px] font-semibold my-2'>
           Seems like you don't have a projects yet ...
        </h3>
        <Link to={'/newProject'}><button className='block text-[25px] border-2 border-purple-600 px-3 my-2 py-1 mx-auto'>
          Create a new Project</button></Link>
        </div>
       
        
        
        }
    </div>
    }</>
  )
}

export default AllProjects