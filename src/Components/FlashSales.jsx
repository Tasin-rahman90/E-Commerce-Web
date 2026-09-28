import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { countDownDateAndTime } from "countdown-date-time";

import Container from "./Container";
import SecHead from "./SecHead";
import CountDown from "./CountDown";
import Card from "./Card";
import Btn from "./Btn";

const FlashSales = ({ products = [] }) => {

  

  function SampleNextArrow({ onClick }) {
    return (
      <button
        type="button"
        aria-label="Next flash sale products"
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
        aria-label="Previous flash sale products"
        onClick={onClick}
        className="absolute -top-16 right-14 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-primary hover:text-white"
      >
        <GoArrowLeft className="text-2xl" />
      </button>
    );
  }

  // Slider Settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const conduct_date = "2026-12-25 14:52:00";
  const [count, setCount] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(countDownDateAndTime(conduct_date));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-38.5">
      <Container className="border-b border-[#0000004f] pb-16">
        <div className="flex items-center gap-20">
          <SecHead title="Today's" heading="Flash Sales" />

          <CountDown
            Days={count.days}
            Hours={count.hours}
            Minutes={count.minutes}
            Seconds={count.seconds}
          />
        </div>

        <div className="relative mt-10">
          <Slider {...settings}>
            {products.slice(0, 6).map((product) => (
              <div className="px-3" key={product.id}>
                <Card
                  id={product.id}
                  productDeatils={product}
                  parcent={product.discountPercentage}
                  itemImg={product.thumbnail}
                  modle={product.title}
                  discountPrice={`$${product.price.toFixed(2)}`}
                  regularPrice={`$${(
                    product.price / (1 - product.discountPercentage / 100)
                  ).toFixed(2)}`}
                  rate={product.rating}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="flex justify-center mt-14">
          <Btn text="View All Products" to="/ShopByCategory" />
        </div>
      </Container>
    </div>
  );
};

export default FlashSales;