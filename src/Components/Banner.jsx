import React, { useEffect, useState } from 'react'
import Container from './Container'
import Vector from '../assets/Vector.png'
import BannerImg from '../assets/banner.jpg'
import Slider from "react-slick";
import { Link } from 'react-router'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    const [categories, setCategories] = useState([])
    const [categoriesLoading, setCategoriesLoading] = useState(true)

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.log(error))
            .finally(() => setCategoriesLoading(false))
    }, [])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,


        appendDots: dots => (
            <div

            >
                <ul className='absolute bottom-7.5 left-[50%] translate-x-[-50%]'> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                className='w-3.5 h-3.5 bg-[#828282] rounded-full'
            >

            </div>
        )
    };

    return (
        <Container className="px-4">
            <div className="flex flex-col lg:flex-row mt-6 lg:mt-10 gap-6">

                <div className="w-full lg:w-[20%] lg:border-r border-gray-300 lg:-mt-10 lg:pr-5">
                    <ul
                        className="space-y-4 lg:space-y-5 py-4 lg:py-8 text-sm md:text-base font-medium"
                        aria-label={categoriesLoading ? "Loading categories" : "Product categories"}
                        aria-busy={categoriesLoading}
                    >
                        {categoriesLoading
                            ? Array.from({ length: 8 }, (_, index) => (
                                <li key={index} className="flex h-5 items-center justify-between" aria-hidden="true">
                                    <span className="h-3.5 w-28 animate-pulse rounded bg-gray-200" />
                                    <span className="h-3 w-3 animate-pulse rounded-sm bg-gray-200" />
                                </li>
                            ))
                            : categories.slice(0, 8).map((item) => (
                                <li key={item.slug}>
                                    <Link
                                        to={`/ShopByCategory?category=${encodeURIComponent(item.slug)}`}
                                        className="flex items-center justify-between cursor-pointer hover:text-red-500 transition-all"
                                    >
                                        <span>{item.name}</span>
                                        <img src={Vector} alt="" />
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>




                <div className="w-full lg:w-[70%] lg:ml-6 xl:ml-12">
                    <Slider {...settings}>
                        {[1, 2, 3, 4].map((_, index) => (
                            <div className="w-full" key={index}>
                                <img src={BannerImg} alt={`Banner slide ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        </Container>
    )
}

export default Banner