import { useContext, useState } from "react";
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
import { UserContext } from "../../Context/UserContext/UserContextProvider";
import Cookies from "js-cookie";
function Authentication() {
  const { userDetails, setUserDetails, toggleForm, isLogin, setIsLogin } =
    useContext(UserContext);

  const handleChangeFunction = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  return (
    <div
      className="h-fit min-h-[90vh] py-[50px] flex items-center justify-center
    bg-[url('../../../LoginPage.jpg')] 
    bg-cover bg-center bg-no-repeat"
    >
      {isLogin ? (
        <Login
          handleChangeFunction={handleChangeFunction}
          toggleForm={toggleForm}
        />
      ) : (
        <Register
          handleChangeFunction={handleChangeFunction}
          toggleForm={toggleForm}
          setIsLogin={setIsLogin}
        />
      )}
    </div>
  );
}

export default Authentication;
