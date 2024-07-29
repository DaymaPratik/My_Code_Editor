import React, { useContext } from 'react'
import '../../index.css'
import { Link } from 'react-router-dom'
import { GiSplitCross } from 'react-icons/gi'
import { UserContext } from '../../Context/UserContext/UserContextProvider';
function SideBar() {
    const {openNavSidebar,userDetails,logout,setIsLogin,setOpenNavSidebar}=useContext(UserContext);
    const setIsLoginTrue=()=>{
      setIsLogin(true);
    }
    const setIsLoginFalse=()=>{
      setIsLogin(false);
    }
  return (
    <main className='min-[600px]:hidden h-[fit] py-5 shadow-[0px_0px_10px_0px_#ff0000] bg-fixed bg-[rgba(1,1,1,0.35)]  z-10  w-[70%] 
    absolute right-0 top-0 backdrop-blur-[7px]'>
    
     <GiSplitCross className='absolute text-[30px]  text-[#ff0000] top-2 right-2' onClick={()=>{setOpenNavSidebar(!openNavSidebar)}}/>
     
    <ul className="  text-[20px] min-[1024px]:text-[25px] flex flex-col gap-5 px-2 min-[1024px]:gap-5 
       items-center min-[1024px]:px-5">
         <Link to={"/"} className=''>
           <li className="glow transtition duration-100 ease-in  rounded-md text-white 
           hover:shadow-[0px_0px_10px_1px_#ff0000] hover:bg-[rgba(35,35,35,0.25)] px-3 py-2">Home</li>
         </Link>
         <Link to={"/newProject"}>
           <li className="glow transtition duration-100 ease-in rounded-md text-white 
           hover:shadow-[0px_0px_10px_1px_#ff0000] hover:bg-[rgba(35,35,35,0.25)] px-3 py-2">New Project</li>
         </Link>
        {userDetails.token 
        ?
       <>
       <Link to={'/allProjects'}> 
       <li className="glow transtition duration-100 ease-in rounded-md text-white 
           hover:shadow-[0px_0px_10px_1px_#ff0000] hover:bg-[rgba(35,35,35,0.25)] px-3 py-2" >My Projects</li>
       </Link>
       <li className="glow transtition duration-100 ease-in rounded-md text-white 
           hover:shadow-[0px_0px_10px_1px_#ff0000] hover:bg-[rgba(35,35,35,0.25)] px-3 py-2" onClick={logout}>Logout</li>
       
       </>
        :
       <>
        <Link to={"/auth"}>
        <li className="glow transtition duration-100 ease-in rounded-md text-white 
           hover:shadow-[0px_0px_10px_1px_#ff0000] hover:bg-[rgba(35,35,35,0.25)] px-3 py-2" onClick={setIsLoginTrue}>Login</li>
      </Link>
      <Link to={"/auth"}>
        <li className="glow transtition duration-100 ease-in rounded-md text-white 
           hover:shadow-[0px_0px_10px_1px_#ff0000] hover:bg-[rgba(35,35,35,0.25)] px-3 py-2" onClick={setIsLoginFalse}>Sign Up</li>
      </Link>
      </>
      }
       </ul> 
     
    </main>
  )
}

export default SideBar