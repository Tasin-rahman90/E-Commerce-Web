import React from 'react'
import Container from './Container'
import Slider from "react-slick";
import Card from './Card';
import SecHead from './SecHead';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Btn from './Btn';

const Explore = ({ products = [] }) => {
  function SampleNextArrow({ onClick }) {
    return (
      <button
        type="button"
        aria-label="Next explored products"
        onClick={onClick}
        className="absolute -top-16 right-0 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-primary hover:text-white"
      >
        <GoArrowRight className="text-2xl" />
      </button>
    );
  }


  function SamplePrevArrow({ onClick }) {
    return (
      <button
        type="button"
        aria-label="Previous explored products"
        onClick={onClick}
        className="absolute -top-16 right-14 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-primary hover:text-white"
      >
        <GoArrowLeft className="text-2xl" />
      </button>
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
              {products.slice(0, 16).map((product, index) => (
                <div className='space-y-15' key={product.id}>
                  {products.slice(index, index + 2).map((item) => (
                    <Card
                      key={item.id}
                      id={item.id}
                      productDeatils={item}
                      parcent={item.discountPercentage}
                      modle={item.title}
                      discountPrice={`$${item.price.toFixed(2)}`}
                      regularPrice={`$${(
                        item.price / (1 - item.discountPercentage / 100)
                      ).toFixed(2)}`}
                      rate={item.rating}
                      itemImg={item.thumbnail}
                    />
                  ))}
                </div>
              ))}

            </Slider>
          </div>
          <div className="flex justify-center mt-10">
            <Btn text="View All Products" to="/ShopByCategory" />
          </div>
        </Container>
      </div>
    </>
  )
}

export default Explore
