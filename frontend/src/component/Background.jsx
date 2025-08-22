import React from 'react'

function Background({heroCount}) {

    if(heroCount === 0) {
        return <img src="https://res.cloudinary.com/dymntfrwl/image/upload/v1755863330/WhatsApp_Image_2025-08-22_at_5.05.14_PM_1_lsgmzu.jpg" alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
        
    }else if(heroCount === 1) {
        return <img src="https://res.cloudinary.com/dymntfrwl/image/upload/v1755863360/WhatsApp_Image_2025-08-22_at_5.05.15_PM_gpxpcm.jpg" alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />

    }else if(heroCount === 2) {
        return <img src="https://res.cloudinary.com/dymntfrwl/image/upload/v1755863368/WhatsApp_Image_2025-08-22_at_5.05.15_PM_1_ddchsx.jpg" alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />

    }else if(heroCount === 3) {
        return <img src="https://res.cloudinary.com/dymntfrwl/image/upload/v1755863378/WhatsApp_Image_2025-08-22_at_5.05.14_PM_ejwqz4.jpg" alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />

    }

}

export default Background