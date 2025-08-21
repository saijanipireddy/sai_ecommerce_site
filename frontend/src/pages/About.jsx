import React from 'react'
import Title from '../component/Title'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='lg:w-[99vw] md:w-[100vw] w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] '>
      <Title text1={"ABOUT"} text2={"US"}/>
      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img src="https://i.pinimg.com/736x/0c/e8/c1/0ce8c1da729b950f6369b58ac10377a9.jpg" alt="" className='lg:w-[60%] w-[70%] shadow-md shadow-black rounded-[20px]'/>
        </div>
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px]  flex-col mt-[20px] lg:mt-[0px]'>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            CS-Store was created for smart, seamless shopping — bringing together quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, CS-Store makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            At CS-Store, we believe shopping should be more than just a transaction — it should be an experience you enjoy. That’s why we handpick every product, ensure transparent pricing, and back every order with dedicated customer support. Whether you’re chasing the latest trends or stocking up on daily essentials, we’re here to deliver convenience, quality, and trust at every step.
          </p>
          <p className='lg:w-[80%] w-[100%] text-[white] lg:text-[18px] text-[15px] mt-[10px] font-bold'>Our Mission</p>
          <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
            Our mission at CS-Store is to make online shopping effortless, enjoyable, and accessible for everyone. We strive to combine quality, affordability, and speed, ensuring every customer gets exactly what they need—when they need it. By embracing innovation and putting our customers first, we aim to create a trusted destination where style, convenience, and value meet.
          </p>
        </div>
      </div>
      <div className='w-[100%] flex items-center justify-center flex-col gap-[10px]'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
        <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px]'>
          <div className='lg:w-[30%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px]
          text-[white] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px]font-semibold text-[#bff1f9]'>Quality Assurance</b>
            <p>We gaurantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>
          <div className='lg:w-[30%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px]
          text-[white] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px]font-semibold text-[#bff1f9]'>Convinience</b>
            <p>Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.</p>
          </div>
          <div className='lg:w-[30%] w-[90%] h-[250px] border-[1px] border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px]
          text-[white] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px]font-semibold text-[#bff1f9]'>Exceptional Customer Services</b>
            <p>Our dedicated Support team ensures quick responces,helpful solutions, and a smooth shopping experience every time.</p>
          </div>
        </div>
      </div>
      <NewLetterBox/>
    </div>
  )
}

export default About