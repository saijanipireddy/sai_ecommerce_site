import React from 'react'

function Footer() {
  return (
    <div className='w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]'>
        <div className='w-[100%] md:h-[30vh] h-[15vh] md:mb-[0px] bg-[#dbfcfcec] flex items-center justify-center md:px[50px] px-[5px]'>
            <div className='md:w-[30%] w-[35%] h-[100%] flex justify-center flex-col gap-[5px]'>
                <div className='flex items-start justify-start gap-[5px] mt-[10px] md:mt[40px]'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Counter-Strike_CS_logo.svg/1024px-Counter-Strike_CS_logo.svg.png"
                    className='md:w-[85px] md:h-[85px] w-[60px] h-[60px]' alt="" />
                </div>
                 <p className='text-[15px] text-[#1e2223] hidden md:block'>
                        CS Store is your all-in-one online shopping destination, offering top quality products,unbeatable deals, and fast delivery-all backend by trusted service designed to make your life easier to every day.
                    </p>
                    <p className='text-[15px] text-[#1e2223] flex md:hidden'>Fast. Easy. Reliable. CsStore. Shopping</p>
            </div>
            <div className='md:w-[25%] w-[30%] h-[100%] flex items-center justify-center flex-col text-center'>
                    <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>
                        <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>COMPANY</p>
                    </div>
                    <ul>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Home</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>About Us</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Privacy Polacy</li>
                    </ul>
                </div>

                <div className='md:w-[25%] w-[40%] h-[100%] flex items-center justify-center flex-col text-center'>
                     <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>
                        <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans'>GET IN TOUCH</p>
                    </div>
                    <ul>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>+91-7680914066</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>cjanipireddy@gmail.com</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>+1-123-456-7890</li>
                        <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>admin@cs.com</li>
                    </ul>
                </div>
        </div>
        <div className='w-[100%] h-[1px] bg-slate-400'></div>
        <div className='w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center'>
            Copyright 2025@cs.com-All Rights Reserved
        </div>
    </div>
  )
}

export default Footer