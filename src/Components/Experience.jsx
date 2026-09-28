import React, { useEffect, useState } from 'react'
import Img from '../assets/BackGroundImg.png'
import { countDownDateAndTime } from "countdown-date-time";
import { Link } from 'react-router'


const Experience = ({ className }) => {

    const conduct_date = "2026-12-25 14:52:00";

    const [count, setCount] = useState({});


    useEffect(() => {

        const interval = setInterval(() => {
            setCount(countDownDateAndTime(conduct_date));
        }, 1000);


        return () => clearInterval(interval);

    }, []);


    return (
        <>

            <div
                className={`${className}
                min-h-100
                h-auto
                lg:h-125
                bg-cover
                bg-center
                bg-no-repeat
                `}
                style={{
                    backgroundImage: `url(${Img})`
                }}
            >

                <div className='px-4 py-10 sm:px-8 sm:py-14 lg:py-17.5 lg:pl-14'>

                    <p className='text-[#00FF66] text-[16px] font-semibold'>
                        Categories
                    </p>


                    <h2 className='w-full max-w-110.75 py-6 font-inter text-3xl font-semibold leading-tight text-white sm:py-8 sm:text-4xl lg:text-[48px] lg:leading-15'>
                        Enhance Your Music Experience
                    </h2>


                    <div className='flex flex-wrap gap-3 sm:gap-6'>


                        <TimeBox 
                            number={count.days}
                            title="Days"
                        />

                        <TimeBox 
                            number={count.hours}
                            title="Hours"
                        />

                        <TimeBox 
                            number={count.minutes}
                            title="Minutes"
                        />

                        <TimeBox 
                            number={count.seconds}
                            title="Seconds"
                        />


                    </div>


                    <Link to="/ShopByCategory?category=mobile-accessories" className='mt-8 inline-block rounded-sm bg-[#00FF66] px-8 py-4 text-white transition-opacity hover:opacity-90 sm:mt-10 sm:px-12'>
                        Buy Now!
                    </Link>


                </div>

            </div>

        </>
    )
}





const TimeBox = ({number, title}) => {

    return (

        <div className="
        w-16 
        h-16 
        bg-white 
        rounded-full 
        flex 
        flex-col 
        items-center 
        justify-center
        ">

            <h4 className="font-semibold text-lg">
                {String(number || 0).padStart(2,"0")}
            </h4>

            <p className="text-[11px]">
                {title}
            </p>

        </div>

    )

}


export default Experience