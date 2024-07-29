import { useContext, useState } from "react";
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
import { UserContext } from "../../Context/UserContext/UserContextProvider";
import Cookies from 'js-cookie';
function Authentication() {
  const {userDetails,setUserDetails,toggleForm,isLogin,setIsLogin}=useContext(UserContext)
 
  const handleChangeFunction = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  

  return (
    <div className="h-[90vh] flex items-center justify-center
    bg-[url('https://images.unsplash.com/photo-1689960250537-fc9c04d9422c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] 
    bg-cover bg-center bg-no-repeat">
     {isLogin
      ?
       <Login  handleChangeFunction={handleChangeFunction}  toggleForm={toggleForm}/>
      :
      <Register  handleChangeFunction={handleChangeFunction} toggleForm={toggleForm}  setIsLogin={setIsLogin}/>
      }
    </div>
  );
}

export default Authentication;
