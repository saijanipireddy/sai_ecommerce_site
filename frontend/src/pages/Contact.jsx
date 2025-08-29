import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='w-[99vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>
      <Title text1={'CONTACT'} text2={'US'}/>
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img src="https://i.pinimg.com/736x/57/ba/9a/57ba9aab625108731f2e85fd294c4f2d.jpg" alt=""  className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm'/>
        </div>
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
          <p className='lg:w-[80%] w-[100%] text-[white] font-bold lg:text-[18px] text-[15px]'>Our Store</p>
          <div className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            <p>CS-STORE</p>
            <p>Bhimavaram, Andhra Pradesh, India</p>
          </div>

          <div className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            <p>Tel: +91-9666592066 </p>
            <p>Email: admin@cs.com</p>
          </div>

          <p className='lg:w-[80%] w-[100%] text-[white] font-bold lg:text-[18px] text-[15px] mt-[10px]'>Careers at CS-STAORE</p>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>Learn more about our teams and job openings</p>
          <button className='px-[30px] py-[20px] flex items-center justify-center text-[white] bg-transparent border  active:bg-slate-600 rounded-md'>
            Explore Jobs
          </button>
        </div>
      </div>

      <NewLetterBox/>
    </div>
  )
}

export default Contact