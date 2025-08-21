import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext';


export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getAdmin`, {
        withCredentials: true,
      });
      setAdminData(result.data);
      console.log("Admin data:", result.data);
    } catch (error) {
      setAdminData(false);
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <adminDataContext.Provider value={{ adminData, setAdminData, getAdmin }}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;