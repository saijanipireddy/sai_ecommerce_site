import React, { createContext } from 'react'

export const authDataContext = createContext()

const AuthContext = ({ children }) => {
  const serverUrl = "https://sai-ecommerce-site-backend.onrender.com"
  const value = { serverUrl }

  return (
    <authDataContext.Provider value={{serverUrl}}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext
