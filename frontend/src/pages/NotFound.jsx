import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    let navigate = useNavigate()
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] md:text-[70px] text-[30px] gap-[20px] text-[white] flex flex-col items-center justify-center'>
        404 Page Not Found
        <button className='bg-white px-[20px] py-[10px] rounded-xl text-[18px] text-[18px] text-[black] cursor-pointer' onClick={()=>navigate('/login')}>Login</button>
    </div>
  )
}

export default NotFound