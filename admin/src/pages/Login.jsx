import React from 'react'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { useState, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';  
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let [show,setShow]=useState(false);
  let[email,setEmail]=useState("");
  let[password,setPassword]=useState("");
  let {serverUrl}= useContext(authDataContext);
  let {adminData, getAdmin} = useContext(adminDataContext);   
  let navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault(); 
    try {
      const result = await axios.post(`${serverUrl}/api/auth/adminLogin`, {
        email, 
        password
      }, { withCredentials: true });
      console.log(result.data);

      await getAdmin();
      navigate("/");
      await axios.get(`${serverUrl}/api/user/getAdmin`, { withCredentials: true });
    } catch (error) {
      console.log(error)
    }  
  }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Counter-Strike_CS_logo.svg/1024px-Counter-Strike_CS_logo.svg.png" 
          alt="" 
          className='h-[60px] w-[60px]' 
        />        
      </div>

      <div className='w-[100%] h-[100px] flex flex-col items-center justify-center gap-[10px]'>
        <span className='text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-semibold'>
          LOGIN PAGE
        </span>
        <span className='text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] font-outfit'>
          WELCOME TO 
          <span className='text-[red] m-[10px] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px]'>
            CS STORE
          </span> 
          ADMIN LOGIN
        </span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-[2px] rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={AdminLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] px-[20px]'>
          <div className='w-[90%] h-[400px] flex flex-col item-center justify-center gap-[15px]' >
            
            <input 
              type="text" 
              autoComplete="username"
              className='w-[100%] h-[50px] border-[2px] border-[#95969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' 
              placeholder='Email' 
              required 
              onChange={(e)=>setEmail(e.target.value)} 
              value={email}
            />

            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                className='w-full h-[50px] border-[2px] border-[#95969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold pr-[40px]'
                placeholder='Password'
                required 
                onChange={(e)=>setPassword(e.target.value)} 
                value={password}
              />
              {!show &&
                <MdOutlineRemoveRedEye 
                  className='w-[20px] h-[20px] cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white' 
                  onClick={()=>setShow(prev=>!prev)} 
                />}
              {show &&
                <IoMdEye 
                  className='w-[20px] h-[20px] cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white' 
                  onClick={()=>setShow(prev=>!prev)} 
                />}
            </div>

            <button 
              className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
