import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Sidebar() {
    let navigate = useNavigate()
  return (
    <div className='w-[18%] min-h-[100vh] border-r-[1px] py-[60px] fixed top-0 left-0 top-0'>
        <div className='flex flex-col gap-5 pt-[40px] pl-[20%] text-[15px]'>
            <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200
            border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]' onClick={()=>navigate("/add")}>
                <IoIosAddCircleOutline className='w-[20px] h-[20px]'/>
                <p className='hidden md:block'>ADD ITEMS</p>
            </div>
             <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200
            border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]' onClick={()=>navigate("/lists")}>
                <FaList className='w-[20px] h-[20px]'/>
                <p className='hidden md:block'>LIST ITEMS</p>
            </div>
             <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200
            border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]' onClick={()=>navigate("/orders")}>
                <FaCheckCircle className='w-[20px] h-[20px]'/>
                <p className='hidden md:block'>VIEW ORDERS</p>
            </div>
        </div>

    </div>
  )
}

export default Sidebar