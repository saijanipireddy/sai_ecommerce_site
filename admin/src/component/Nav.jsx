import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'

function Nav() {
    let navigate = useNavigate()
    let { serverUrl } = useContext(authDataContext)
    let { getAdmin } = useContext(adminDataContext) 

    const logOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            console.log(result.data);
            await getAdmin();
            navigate("/login");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black'>
            <div
                className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer'
                onClick={() => navigate("/")}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Counter-Strike_CS_logo.svg/1024px-Counter-Strike_CS_logo.svg.png"
                    alt=""
                    className='w-[60px] shadow-black'
                />
            </div>
            <button
                className='text-[13px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white'
                onClick={logOut}
            >
                LogOut
            </button>
        </div>
    )
}

export default Nav
