import React from 'react'

function Footer() {
  return (
    <div className="w-full bg-[#dbfcfcec] text-[#1e2223]">
      
      
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between px-6 md:px-12 py-6 md:py-10">
        
        
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start mb-6 md:mb-0 text-center md:text-left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Counter-Strike_CS_logo.svg/1024px-Counter-Strike_CS_logo.svg.png"
            className="w-[60px] h-[60px] md:w-[85px] md:h-[85px] mb-3"
            alt="CS Store"
          />
          <p className="text-sm md:text-base leading-relaxed">
            CS Store is your all-in-one online shopping destination, offering top 
            quality products, unbeatable deals, and fast delivery—all backed by 
            trusted service designed to make your life easier every day.
          </p>
        </div>

        
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-center mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">COMPANY</h3>
          <ul className="flex flex-col gap-1 text-sm md:text-base">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About Us</li>
            <li className="cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold mb-2">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-1 text-sm md:text-base text-center md:text-right">
            <li>+91-7680914066</li>
            <li>cjanipireddy@gmail.com</li>
            <li>+1-123-456-7890</li>
            <li>admin@cs.com</li>
          </ul>
        </div>
      </div>

      
      <div className="w-full h-[1px] bg-slate-400"></div>

      
      <div className="w-full py-3 text-center text-sm">
        Copyright 2025 @cs.com - All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
