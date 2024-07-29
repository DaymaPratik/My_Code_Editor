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



















{/* <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"> */}
{/* <h2 className="text-2xl font-bold mb-6 text-center">
  {isLogin ? "Login" : "Sign Up"}
</h2>
<form>
  {!isLogin && (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={userDetails.name}
        onChange={handleChangeFunction}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
  )}
  <div className="mb-4">
    <label className="block text-gray-700 mb-2" htmlFor="email">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={userDetails.email}
      onChange={handleChangeFunction}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
    />
   {emailResponseData
    ?
    <p className="my-2 text-center font-[20px] text-red-600">{emailResponseData}</p>
    :
    ""
    }
  </div>
  {!isLogin && (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor="mobile">
        Mobile
      </label>
      <input
        type="number"
        id="mobile"
        name="mobile"
        value={userDetails.mobile}
        onChange={handleChangeFunction}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
  )}
  <div className="mb-6">
    <label className="block text-gray-700 mb-2" htmlFor="password">
      Password
    </label>
    <input
      type="password"
      id="password"
      name="password"
      value={userDetails.password}
      onChange={handleChangeFunction}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
    />
  </div>
  {isLogin ? (
    <button className="bg-blue-400 px-3 py-1 mx-auto text-[20px] rounded-md w-[70%] block"
    onClick={loginUserFunction}>
      Login
    </button>
  ) : (
    <button
      className="bg-blue-400 px-3 py-1 mx-auto text-[20px] rounded-md w-[70%] block"
      onClick={registerUserFunction}
    >
      Sign Up
    </button>
  )}
</form>
<div className="mt-6 text-center">
  <button
    onClick={toggleForm}
    className="text-blue-500 hover:underline"
  >
    {isLogin
      ? "Don't have an account? Sign Up"
      : "Already have an account? Login"}
  </button>
</div>
</div> */}