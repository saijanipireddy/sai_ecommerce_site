import React from 'react'

function Background({heroCount}) {

    if(heroCount === 0) {
        return <img src="https://t4.ftcdn.net/jpg/05/96/62/65/240_F_596626503_jrzjZNYStDexiWxQFqO7oCh6M8PdMlJs.jpg" alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
        
    }else if(heroCount === 1) {
        return <img src="https://t3.ftcdn.net/jpg/05/96/62/32/240_F_596623252_MrSptpFnvBHZbeCSCegHFASPBBXoNi9W.jpg" alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />

    }else if(heroCount === 2) {
        return <img src="https://t4.ftcdn.net/jpg/05/96/61/99/240_F_596619956_pMBtjoGHCqZKzRWwsYUY41xAIk2T2dvt.jpg" alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />

    }else if(heroCount === 3) {
        return <img src="https://t4.ftcdn.net/jpg/06/49/86/21/240_F_649862124_w91wlS08WfP2xSy9X0qVio5EFPtEWw4K.jpg" alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />

    }

}

export default Background