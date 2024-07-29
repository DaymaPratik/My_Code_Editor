import { useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContextProvider";
import { MdMenuOpen } from "react-icons/md";
import '../../index.css'

function Navbar() {
  const{userDetails,setIsLogin,logout,openNavSidebar,setOpenNavSidebar}=useContext(UserContext);
 
  const setIsLoginTrue=()=>{
    setIsLogin(true);
  }
  const setIsLoginFalse=()=>{
    setIsLogin(false);
  }
  return (
    <nav className="navbar w-[100%] bg-[#131451c9] py-3 max-[600px]:px-[20px] flex justify-between  
    items-center backdrop-blur-[7px]">
      <div className=" px-3 flex justify-center items-center  ">
        <h1 className="max-[768px]:hidden px-2 text-[25px] min-[1024px]:text-[30px] font-bold text-[red]">
          My Code Editor
        </h1>
        <img src="../../../public/logo_2(2)_jpg.jpg" alt=""  className="h-[40px] min-[1024px]:h-[50px] "/>
      </div>
      <ul className="max-[600px]:hidden  text-white  text-[20px] min-[1024px]:text-[25px] flex gap-3 px-2 min-[1024px]:gap-5 
      items-center min-[1024px]:px-5">
        <Link to={"/"}>
          <li className=" glow transtition duration-100 ease-in rounded-md hover:bg-[rgba(0,0,0,0.61)] px-3 py-2">Home</li>
        </Link>
        <Link to={"/newProject"}>
          <li className="glow transtition duration-100 ease-in rounded-md hover:bg-[rgba(0,0,0,0.61)] px-3 py-2">New Project</li>
        </Link>
       {userDetails.token 
       ?
      <>
      <Link to={'/allProjects'}> 
      <li className="glow transtition duration-100 ease-in rounded-md hover:bg-[rgba(0,0,0,0.61)] px-3 py-2" >My Projects</li>
      </Link>
      <li className="glow transtition duration-100 ease-in rounded-md hover:bg-[rgba(0,0,0,0.61)] px-3 py-2" onClick={logout}>Logout</li>
      
      </>
       :
      <>
       <Link to={"/auth"}>
       <li className="glow transtition duration-100 ease-in rounded-md hover:bg-[rgba(0,0,0,0.61)] px-3 py-2" onClick={setIsLoginTrue}>Login</li>
     </Link>
     <Link to={"/auth"}>
       <li className="glow transtition duration-100 ease-in rounded-md hover:bg-[rgba(0,0,0,0.61)] px-3 py-2" onClick={setIsLoginFalse}>Sign Up</li>
     </Link>
     </>
     }
      </ul>
      <div className="min-[600px]:hidden glow text-[40px] border-2 border-red-600" onClick={()=>{setOpenNavSidebar(!openNavSidebar)}}>
      <MdMenuOpen />
      </div>
    </nav>
  
  );
}

export default Navbar;
