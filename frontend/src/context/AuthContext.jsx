import React, { createContext } from "react";


export const authDataContext = createContext();

export function AuthProvider({ children }) {
  const serverUrl = "https://cs-online-store-backend.onrender.com"; 

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}


export default AuthProvider;
