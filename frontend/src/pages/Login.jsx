import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';

// ✅ Correct context imports
import { authDataContext } from "../context/authContext";
import { userDataContext } from "../context/UserContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });

      getCurrentUser();
      navigate('/');
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(`${serverUrl}/api/auth/googlelogin`, {
        name,
        email
      }, { withCredentials: true });

      console.log(result.data);
      getCurrentUser();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate('/')}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Counter-Strike_CS_logo.svg/1024px-Counter-Strike_CS_logo.svg.png" alt="" className='h-[60px] w-[60px]' />
      </div>

      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[10px]'>
        <span className='text-[24px] font-semibold'>LOGIN PAGE</span>
        <span className='text-[18px]'>WELCOME TO <span className='text-red-500'>CS STORE</span> PLACE YOUR ORDER</span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-[2px] rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] px-[20px]'>
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleLogin}>
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="" className='w-[20px]'/>
            Login with Google
          </div>

          <div className='w-full h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>

          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]'>
            <input
              type="text"
              className='w-full h-[50px] border-[2px] border-[#95969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                className='w-full h-[50px] border-[2px] border-[#95969635] rounded-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold pr-[40px]'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!show && <MdOutlineRemoveRedEye className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white' onClick={() => setShow(prev => !prev)} />}
              {show && <IoMdEye className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white' onClick={() => setShow(prev => !prev)} />}
            </div>

            <button className='w-full h-[50px] bg-[#6060f5] rounded-lg text-[17px] font-semibold'>Login</button>

            <p className='flex justify-center gap-[10px]'>
              You have no account? 
              <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate('/signup')}>
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
