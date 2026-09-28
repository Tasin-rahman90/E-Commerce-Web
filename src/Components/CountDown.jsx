import React from 'react'

const CountDown = ({Days,Hours,Minutes,Seconds}) => {
    return (
        <>
            <div className='flex items-center gap-2 sm:gap-4 lg:gap-9.5'>
                <div>
                    <p className='text-[12px] font-medium'>Days</p>
                    <h3 className='text-[32px] font-bold font-inter'>{Days}</h3>
                </div>
                <div>
                    <p className='text-[12px] font-medium'>Hours</p>
                    <h3 className='text-[32px] font-bold font-inter'>{Hours}</h3>
                </div>
                <div>
                    <p className='text-[12px] font-medium'>Minutes</p>
                    <h3 className='text-[32px] font-bold font-inter'>{Minutes}</h3>
                </div>
                <div>
                    <p className='text-[12px] font-medium'>Seconds</p>
                    <h3 className='text-[32px] font-bold font-inter'>{Seconds}</h3>
                </div>
            </div>
        </>
    )
}

export default CountDown
