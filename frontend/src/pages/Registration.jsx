import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { getCurrentUser } from '../../../backend/controllers/userController';



const Registration = () => {
    let [show,setShow]=useState(false);
    const { serverUrl } = useContext(authDataContext);
    let[name,setName]=useState("");
    let[email,setEmail]=useState("");
    let[password,setPassword]=useState("");
    let navigate = useNavigate();

    const handleSingUp = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(serverUrl + '/api/auth/signup', {
                name,
                email,
                password
            }, {
                withCredentials: true
            });
            getCurrentUser();
            navigate('/');
            console.log(result.data) 
            
        } catch (error) {
            console.log(error)
        }
    }

    const googleSignUp = async () => {
        try {
          const response = await signInWithPopup(auth,provider);
          let user = response.user;
          let name = user.displayName;
          let email = user.email; 

          const result = await axios.post(serverUrl + '/api/auth/googlelogin', {
            name,       
            email
          }, { withCredentials: true});
            console.log(result.data);  
            getCurrentUser();
            navigate('/');   

        } catch (error) {
            console.log(error);
        }
    }





  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
        <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate('/')}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Counter-Strike_CS_logo.svg/1024px-Counter-Strike_CS_logo.svg.png" alt="" className='h-[60px] w-[60px]' />        </div>
        <div className='w-[100%] h-[100px] flex  flex-col items-center justify-center gap-[10px]'>
            <span className='text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-semibold '>REGISTATION PAGE</span>
            <span className='text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[22px] font-outfit'>WELCOME TO <span className='text-[red] m-[10px] text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px]'>CS STORE</span> PLACE YOUR ORDER</span>

        </div>
        <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-[2px] rounded-lg shadow-lg flex items-center justify-center'>
            <form action="" onSubmit={handleSingUp} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] px-[20px]'>
                <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleSignUp}>
                    <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt=""  className='w-[20px]'/>Registration with Google
                </div>
                <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                    <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR
                    <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
                </div>
                <div className='w-[90%] h-[400px] flex flex-col item-center justify-center gap-[15px]' >
                    <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#95969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='User Name' required onChange={(e)=>setName(e.target.value)} value={name}/>
                    <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#95969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)} value={email}/>

                    <div className="relative w-full">
                        <input
                        type={show ? "text" : "password"}
                        className='w-full h-[50px] border-[2px] border-[#95969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold pr-[40px]'
                        placeholder='Password'
                        required onChange={(e)=>setPassword(e.target.value)} value={password}
                        />
                        {!show &&<MdOutlineRemoveRedEye className='w-[20px] h-[20px] cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white' onClick={()=>setShow(prev=>!prev)} />}
                        {show &&<IoMdEye className='w-[20px] h-[20px] cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white'onClick={()=>setShow(prev=>!prev)} />}
                    </div>

                    <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold '>Create Account</button>
                    <p className='flex justify-center gap-[10px]'>You have any account ?<span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate('/login')}>Login</span></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Registration