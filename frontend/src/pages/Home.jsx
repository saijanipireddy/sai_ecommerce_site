import React, { useEffect, useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

const Home = () => {
  let heroData = [
    { text1: "30% Off Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of BoldFashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now and Save Big!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now On Sale!" }
  ]

  
  let mobileImages = [
    "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    "https://media.istockphoto.com/id/1070193608/photo/elegant-businesswoman-shopping-on-weekend-checking-the-price-of-dress.jpg?s=612x612&w=0&k=20&c=sptt20XiL7MffWaUbGX-LE1H5l-kv3te-JCbyv2erDs=",
    "https://images.unsplash.com/photo-1521334884684-d80222895322"
  ]

  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='overflow-x-hidden relative'>

      
      <div className='hidden md:block w-[100vw] lg:h-[100vh] md:h-[60vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
        <Background heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>

      
      <div
        className='block md:hidden w-[100vw] h-[60vh] flex flex-col items-center justify-center text-center p-4 relative bg-cover bg-center'
        style={{ backgroundImage: `url(${mobileImages[heroCount]})` }}
      >
        <div className='absolute inset-0 bg-black/50'></div> {/* Dark Overlay */}
        <div className='relative z-10'>
          <h2 className='text-[22px] font-bold text-white leading-7'>
            {heroData[heroCount].text1}
          </h2>
          <p className='text-[15px] text-gray-200 mt-2'>
            {heroData[heroCount].text2}
          </p>
        </div>
      </div>

      
      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
