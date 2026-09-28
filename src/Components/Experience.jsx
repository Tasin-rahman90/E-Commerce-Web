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
                h-125
                bg-cover
                bg-center
                bg-no-repeat
                `}
                style={{
                    backgroundImage: `url(${Img})`
                }}
            >

                <div className='py-17.5 pl-14'>

                    <p className='text-[#00FF66] text-[16px] font-semibold'>
                        Categories
                    </p>


                    <h2 className='py-8 leading-15 font-inter text-[48px] font-semibold text-white w-110.75'>
                        Enhance Your Music Experience
                    </h2>


                    <div className='flex gap-6'>


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


                    <Link to="/ShopByCategory?category=mobile-accessories" className='inline-block text-white bg-[#00FF66] py-4 px-12 rounded-sm mt-10 transition-opacity hover:opacity-90'>
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