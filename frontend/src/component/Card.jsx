import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({ name, image, id, price }) {
  let { currency } = useContext(shopDataContext)
  let navigate = useNavigate()

  return (
    <div
      className="w-[160px] sm:w-[200px] md:w-[220px] lg:w-[250px] h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] 
      bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[103%] transition-transform
      flex flex-col p-[8px] cursor-pointer border border-[#80808049]"
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-[65%] rounded-sm object-cover"
      />
      <div className="text-[#c3f6fa] text-[14px] sm:text-[16px] md:text-[18px] py-1">{name}</div>
      <div className="text-[#f3fafa] text-[12px] sm:text-[13px] md:text-[14px]">
        {currency} {price}
      </div>
    </div>
  )
}

export default Card
