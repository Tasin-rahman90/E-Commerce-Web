import React from 'react'
import Container from './Container'
import Slider from "react-slick";
import Card from './Card';
import SecHead from './SecHead';
import dryFood from '../assets/dryFood.png'
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Canon from '../assets/Canon.png'
import laptop from '../assets/laptop.png'
import KYbord from '../assets/2kybord.png'
import Btn from './Btn';

const Explore = () => {
  function SampleNextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="absolute -top-16 right-0 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-[#DB4444] hover:text-white"
      >
        <GoArrowRight className="text-2xl" />
      </div>
    );
  }


  function SamplePrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="absolute -top-16 right-14 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-[#DB4444] hover:text-white"
      >
        <GoArrowLeft className="text-2xl" />
      </div>
    );
  }



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  return (
    <>
      <div>
        <Container>
          <SecHead
            title='Our Products'
            heading='Explore Our Products'
          />
          <div className='py-15'>
            <Slider {...settings}>

              <div className='space-y-15'>
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={KYbord}
                />
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={dryFood}
                />
              </div>
              <div className='space-y-15'>
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={Canon}
                />
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={laptop}
                />
              </div>
              <div className='space-y-15'>
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={dryFood}
                />
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={dryFood}
                />
              </div>
              <div className='space-y-15'>
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={laptop}
                />
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={Canon}
                />
              </div>
              <div className='space-y-15'>
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={KYbord}
                />
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={Canon}
                />
              </div>
              <div className='space-y-15'>
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={laptop}
                />
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={dryFood}
                />
              </div>
              <div className='space-y-15'>
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={KYbord}
                />
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={laptop}
                />
              </div>
              <div className='space-y-15'>
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={KYbord}
                />
                <Card
                  parcent='90%'
                  modle='Breed Dry Dog Food'
                  discountPrice='209$'
                  regularPrice='986'
                  rate='90'
                  itemImg={dryFood}
                />
              </div>

            </Slider>
          </div>
          <div className="flex justify-center mt-10">
            <Btn text="View All Products" />
          </div>
        </Container>
      </div>
    </>
  )
}

export default Explore
