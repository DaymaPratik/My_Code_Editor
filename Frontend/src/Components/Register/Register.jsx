import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext/UserContextProvider";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { GiSplitCross } from "react-icons/gi";
import SideBar from "../SideBar/SideBar";
function Register({ handleChangeFunction, toggleForm }) {
  const navigate = useNavigate();
  const [emailResponseData, setEmailResponseData] = useState('');
  const [allRequired, setAllRequired] = useState(false);
  const { openNavSidebar,setOpenNavSidebar,userDetails,logout,setIsLogin, setUserDetails } = useContext(UserContext);
  const setIsLoginTrue=()=>{
    setIsLogin(true);
  }
  const setIsLoginFalse=()=>{
    setIsLogin(false);
  }

  const registerUserFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://my-code-editor.onrender.com/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      const newUser = data.userObj;
      if (data.message === 'User already exists with given mail') {
        setEmailResponseData('User already exists with given mail');
        return;
      }
      if (response.status === 200) {
        const token = Cookies.get('token');
        console.log(token);
        setUserDetails(newUser);
        navigate('/');
      } else {
        setAllRequired(true);
      }
    } catch (e) {
      console.log("Error while sending data from form ", e);
    }
  };

  return (
   < div >
    {openNavSidebar && 
   <SideBar/>
     }

    <div className="bg-[rgba(1,1,1,0.15)] 
      text-white p-8 rounded-lg shadow-[0px_0px_10px_0px_red] w-full px-10  
      mx-auto max-w-sm backdrop-blur-[7px]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Register
      </h2>
      <form>
        <div className="mb-4">
          <label className="block  mb-2" htmlFor="name">
            Name
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={userDetails.name || ""}
            onChange={handleChangeFunction}
            className="w-full px-3 py-2 border bg-[#93e0ff54]  rounded-lg 
            focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="mb-4">
          <label className="block  mb-2" htmlFor="email">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={userDetails.email || ""}
            onChange={handleChangeFunction}
            className="w-full px-3 py-2 border bg-[#93e0ff54]  rounded-lg 
            focus:outline-none focus:border-red-500"
          />
          {emailResponseData && (
            <p className="my-2 text-center font-bold text-[15px] text-[#00f8ff]">
              {emailResponseData}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block  mb-2" htmlFor="mobile">
            Mobile
          </label>
          <input
            required
            type="number"
            id="mobile"
            name="mobile"
            value={userDetails.mobile || ""}
            onChange={handleChangeFunction}
            className="w-full px-3 py-2 border bg-[#93e0ff54]  rounded-lg 
            focus:outline-none focus:border-red-5000"
          />
        </div>
        <div className="mb-6">
          <label className="block  mb-2" htmlFor="password">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={userDetails.password || ""}
            onChange={handleChangeFunction}
            className="w-full px-3 py-2 border bg-[#93e0ff54]  rounded-lg 
            focus:outline-none focus:border-red-500"
          />
        </div>
        {allRequired && (
          <p className="my-2 text-center font-bold text-[20px] text-[#00f8ff]">
            All fields are required
          </p>
        )}
        <button className="bg-[rgb(255,0,0)] border-2 border-red-500 transition duration-150 ease-in px-3 py-1 hover:bg-transparent mx-auto text-[20px] rounded-md w-[70%] block" onClick={registerUserFunction}>
          Sign Up
        </button>
      </form>
      <div className="mt-6 text-center">
        <button onClick={toggleForm} className="text-blue-500 hover:underline">
          Already have an account? Login
        </button>
      </div>
    </div>

   </div>
  );
}

export default Register;





















