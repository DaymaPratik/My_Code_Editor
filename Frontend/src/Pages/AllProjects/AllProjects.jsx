import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext/UserContextProvider'
import { Link, useNavigate } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";
import { ProjectsContext } from '../../Context/ProjectsContextProvider';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SideBar from '../../Components/SideBar/SideBar';

function AllProjects() {
    const {openNavSidebar,userDetails}=useContext(UserContext);
    const {projectsArray,setProjectsArray,setEditTableProject,setEdit}=useContext(ProjectsContext);
    const [loading,setLoading] = useState(true);
    const navigate=useNavigate();
  
    useEffect(()=>{
        const getAllProjectFunction=async()=>{
         try {
          const response=await fetch(" http://localhost:10000/api/getAllProjects",{
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
        
         } catch (error) {
          console.log("Error while fetching all the projects",error);
         }
        }
        setTimeout(()=>{
            setLoading(false)
          },2000)
        getAllProjectFunction();
    },[])
    
    const handleEdit=async(item)=>{
      // console.log(item);
      setEditTableProject(item);
      // console.log(editTableProject);
      setEdit(true);
      navigate('/newProject');
     }




     const deleteProjectFunction=async(id)=>{
      const response=await fetch(` http://localhost:10000/api/deleteProject/:${id}`,{
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
                   onClick={()=>{handleEdit(item)}}/>
                    
                   </div>
                 </div>
               </div>
            )
        })
        :
        <div>
        <h3 className='w-[100%] py-2 px-5 text-red-500 text-center  shadow-[0px_0px_10px_0px_#ff0000] text-[30px]
         font-semibold my-5'>
           Seems like you don't have a projects yet ...
        </h3>
        <Link to={'/newProject'} className='my-10 block'><button className='block text-red-500 text-[25px] shadow-[0px_0px_10px_0px_#ff0000] 
        px-5  py-2 mx-auto hover:bg-[#ff00009a] hover:cursor-pointer ease-in hover:text-white hover:shadow-[0px_0px_10px_0px_#ffffff] duration-150 transition '>
          Create a new Project</button></Link>
        </div>
       
        
        
        }
    </div>
    }</>
  )
}

export default AllProjects