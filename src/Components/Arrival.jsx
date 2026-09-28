import React from 'react'
import Container from './Container'
import SecHead from './SecHead'
import gucci from '../assets/gucci.png'
import PS5 from '../assets/ps5.png'
import Frame from '../assets/frame-685.png'
import Speakers from '../assets/Speakers.png'
import Services from './Services'
import car from '../assets/car.png'
import customer from '../assets/Customer.png'
import GUARANTEE from '../assets/services-2.png'
import { Link } from 'react-router'




const Arrival = () => {
    return (
        <div className="py-16 lg:pt-35 lg:pb-34">
            <Container>
                <SecHead
                    title="Featured"
                    heading="New Arrival"
                />

                <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-15 sm:grid-cols-2 sm:gap-6 lg:gap-8">


                    <div
                        className="h-100 rounded bg-no-repeat bg-cover bg-center sm:h-150"
                        style={{ backgroundImage: `url(${PS5})` }}
                    >
                        <div className='w-full max-w-60.5 text-white'>
                            <div className='pt-60 pl-6 sm:pt-111.5 sm:pl-8'>
                                <h2 className='text-[24px] font-inter'>PlayStation 5</h2>
                                <p className='text-[14px] font-inter py-4'>Black and White version of the PS5 coming out on sale.</p>
                                <Link to="/search?q=playstation" className='inline-block font-inter border-b border-[#ffffff62] w-20.25 hover:border-white'>Shop Now</Link>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col gap-8">


                        <div
                            className="h-71 rounded bg-no-repeat bg-cover bg-center"
                            style={{ backgroundImage: `url(${Frame})` }}
                        >
                            <div className='w-full max-w-63.75 text-white'>
                                <div className='pt-24 pl-4 sm:pt-34.5 sm:pl-6'>
                                    <h2 className='text-[24px] font-inter'>PlayStation 5</h2>
                                    <p className='text-[14px] font-inter py-4'>Black and White version of the PS5 coming out on sale.</p>
                                    <Link to="/search?q=playstation" className='inline-block font-inter border-b border-[#ffffff62] w-20.25 hover:border-white'>Shop Now</Link>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">


                            <div
                                className="h-71 rounded bg-no-repeat bg-cover bg-center"
                                style={{ backgroundImage: `url(${Speakers})` }}
                            >
                                <div className='text-white pt-42 pl-6 '>
                                    <h2 className='text-[24px] font-inter'>Speakers</h2>
                                    <p className='text-[14px] font-inter py-0.1'>Amazon wireless speakers</p>
                                    <Link to="/search?q=speaker" className='inline-block font-inter border-b border-[#ffffff62] w-20.25 hover:border-white'>Shop Now</Link>
                                </div>
                            </div>


                            <div
                                className="h-71 rounded bg-no-repeat bg-cover bg-center"
                                style={{ backgroundImage: `url(${gucci})` }}
                            >
                                <div className='text-white pt-42 pl-6 '>
                                    <h2 className='text-[24px] font-inter'>Perfume</h2>
                                    <p className='text-[14px] font-inter py-0.1'>GUCCI INTENSE OUD EDP</p>
                                    <Link to="/ShopByCategory?category=fragrances" className='inline-block font-inter border-b border-[#ffffff62] w-20.25 hover:border-white'>Shop Now</Link>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className='mt-16 grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:mt-34 lg:grid-cols-3'>
                    <Services
                        IMG={car}
                        headLine='FREE AND FAST DELIVERY'
                        title='Free delivery for all orders over $140'
                    />
                    <Services
                        IMG={customer}
                        headLine='24/7 CUSTOMER SERVICE'
                        title='Friendly 24/7 customer support'
                    />
                    <Services
                        IMG={GUARANTEE}
                        headLine='MONEY BACK GUARANTEE'
                        title='We reurn money within 30 days'
                    />
                </div>
            </Container>
        </div>
    )
}

export default Arrival