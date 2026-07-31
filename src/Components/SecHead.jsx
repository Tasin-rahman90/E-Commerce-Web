import React from 'react'
import Container from './Container'

const SecHead = ({heading,title}) => {
    return (

        <div>
           
                <div className='flex items-center gap-4'>
                    <div className='w-5 h-10 bg-primary rounded-[3px]'>
                    </div>
                    <p className='text-[16px] font-semibold text-primary'>{title}</p>
                </div>
                <h2 className='text-[36px] font-semibold mt-6 font-inter'>{heading}</h2>
            
        </div>

    )
}

export default SecHead
