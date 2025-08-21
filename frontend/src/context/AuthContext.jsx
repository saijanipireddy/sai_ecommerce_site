// src/context/authContext.jsx
import React, { createContext } from "react";

// ✅ Create context
export const authDataContext = createContext();

export function AuthProvider({ children }) {
  const serverUrl = "http://localhost:8000"; // your backend API URL

  return (
    <authDataContext.Provider value={{ serverUrl }}>
      {children}
    </authDataContext.Provider>
  );
}

// ✅ Default export for consistency
export default AuthProvider;
