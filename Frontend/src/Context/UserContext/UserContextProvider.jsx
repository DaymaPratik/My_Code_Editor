import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const navigate=useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [openNavSidebar,setOpenNavSidebar]=useState(false);
 
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const [userDetails, setUserDetails] = useState(() => {
    // Get user details from local storage if available
    const savedUserDetails = sessionStorage.getItem('userDetails');
    return savedUserDetails ? JSON.parse(savedUserDetails) : {
      name: "",
      email: "",
      mobile: 0,
      password: "",
      token: "",
      _id: "",
      __v: ""
    };
  });

  // Update local storage whenever userDetails change
  useEffect(() => {
    sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  // Clear user details on logout
  const logout = () => {
    setUserDetails({
      name: "",
      email: "",
      mobile: 0,
      password: "",
      token: "",
      _id: "",
      __v: ""
    });
    sessionStorage.removeItem('userDetails');
    navigate('/auth')
  };

  return (
    <UserContext.Provider value={{ openNavSidebar,setOpenNavSidebar,userDetails, setUserDetails, logout,toggleForm,isLogin,setIsLogin }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
