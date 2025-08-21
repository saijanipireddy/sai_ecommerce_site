// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';

// ✅ Create Context
axios.defaults.withCredentials = true; 
export const userDataContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext); // comes from AuthProvider

  const getCurrentUser = async () => {
    try {
      console.log("Server URL:", serverUrl);
      const result = await axios.get(`${serverUrl}/api/user/getCurrentUser`, {
        withCredentials: true,
      });
      setUserData(result.data.user);
      console.log("Fetched User:", result.data.user);
    } catch (error) {
      console.error("❌ Failed to fetch User:", error);
      setUserData(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

// ✅ Default export (so you can `import UserProvider from './UserContext'` if you prefer)
export default UserProvider;
