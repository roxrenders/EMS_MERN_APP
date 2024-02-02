
import axios from '../axios';
import React, { createContext, useContext, useEffect, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState({});
  const [isAdmin,setIsAdmin] = useState(false)

  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("AllUsers");
  const [selectedDept, setSelectedDept] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/me', {
        headers: {
          Authorization: token
        }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
        const response = await axios.get('/api/allusers', {
            headers: {
                Authorization: token
            }
        });
        setAllUsers(response.data.users);
    } catch (error) {
        console.error('Error fetching all users:', error);
    }
};

  useEffect(() => {
   
    if (token) {
      fetchUserData();
      fetchAllUsers()
    }
  }, [token]);

  useEffect(()=>{
    if( user?.role >= 1 ){
      setIsAdmin(true)
    }
  },[user])
 
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const contextValues = {isAdmin,setIsAdmin,
      allUsers,setAllUsers,selectedDept, setSelectedDept,token, activeTab, setActiveTab,setToken, logout,user, setUser
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
