import React from 'react'

const Services = ({IMG,headLine,title}) => {
    return (
        <>
            <div className='w-70'>
                <div className='flex justify-center items-center'>
                    <img src={IMG} alt="" />
                </div>
                <h2 className='text-center text-[20px] font-semibold pt-6 pb-2'>{headLine}</h2>
                <h3 className='text-center text-[14px]'>{title}</h3>
            </div>
        </>
    )
}

export default Services
