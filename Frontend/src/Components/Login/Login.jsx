import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Context/UserContext/UserContextProvider";
import Cookies from 'js-cookie';
import SideBar from "../SideBar/SideBar";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Login({ toggleForm, handleChangeFunction }) {
  const {openNavSidebar,userDetails, setUserDetails } = useContext(UserContext);
  const [allRequired, setAllRequired] = useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [validUser, setValidUser] = useState({
    emailResponse: "",
    passResponse: ""
  });
  const navigate = useNavigate();

  const loginUserFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(" http://localhost:10000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(userDetails)
      });
      const data = await response.json();
      const newUser = data.userObj;
      if (data.message === 'No user found with given Email') {
        setValidUser({ emailResponse: 'No user found with given Email' });
        return;
      } else if (data.message === 'Enter correct Password') {
        setValidUser({ passResponse: 'Enter correct Password' });
        return;
      } else if (response.status === 400) {
       setAllRequired(true);
       console.log('All feilds required');
        return;
      } 
      else if (data.message === 'Login Successfull') {
        const token =Cookies.get('token');
        setUserDetails(newUser);
        navigate('/');
      }
    } catch (error) {
      console.log("Error while user login ", error);
    }
  };

  return (
  
   <div className="">
    
    {openNavSidebar && 
  <SideBar/>
     }
    
    {/* backdrop-filter: blur(10px); */}
    <div className="bg-[rgba(1,1,1,0.15)] 
      text-white p-8 rounded-lg shadow-[0px_0px_10px_0px_red] w-full px-10  
      mx-auto max-w-sm backdrop-blur-[7px]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Login
      </h2>
      <form className="">
        <div className="mb-4">
          <label className="block  mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email || ""}
            onChange={handleChangeFunction}
            className="w-full px-3 py-2 border border-red-300  bg-[#93e0ff54]  rounded-lg 
            focus:outline-none focus:border-red-500 "
          />
          {validUser.emailResponse && (
            <p className="my-2 text-center font-bold text-[20px] text-[#00f8ff]">
              {validUser.emailResponse}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-2">
            Password
          </label>
          {
         showPassword
            ?
         <div  className="w-full border border-red-300  pr-2 flex justify-between items-center bg-[#93e0ff54] rounded-lg 
         focus:outline-none focus:border-red-500">
           <input
            type="text"
            name="password"
            value={userDetails.password || ""}
            onChange={handleChangeFunction}
             className="bg-transparent h-full px-3 py-2
            focus:outline-none focus:border-red-500"
          />
          < FaEyeSlash className="text-[25px] text-red-500" onClick={()=>{setShowPassword(false)}}/>
         </div>
            :
         <div className="w-full border border-red-300 pr-2 flex items-center justify-between bg-[#93e0ff54] rounded-lg 
            focus:outline-none focus:border-red-500" >
           <input
            type="password"
            name="password"
            value={userDetails.password || ""}
            onChange={handleChangeFunction} 
            className="bg-transparent h-full px-3 py-2
            focus:outline-none focus:border-red-500"
          />
           < FaEye className="text-[25px] text-red-500" onClick={()=>{setShowPassword(true)}}/>
         </div>
          }
          {validUser.passResponse && (
            <p className="my-2 text-center font-bold text-[20px] text-[#00f8ff]">
              {validUser.passResponse}
            </p>
          )}
        </div>
        {allRequired && (
          <p className="my-2 text-center font-bold text-[20px] text-[#00f8ff]">
            All fields are required
          </p>
        )}
        <button className="bg-[rgb(255,0,0)] border-2 border-red-500 transition duration-150 ease-in px-3 py-1 hover:bg-transparent mx-auto text-[20px] rounded-md w-[70%] block" 
        onClick={loginUserFunction}>
          Login
        </button>
      </form>
     
      <div className="mt-6 text-center">
        <button onClick={toggleForm} className="text-blue-500 hover:underline">
          Don't have an account? Sign Up
        </button>
      </div>
    </div>
   </div>
  );
}

export default Login;












