import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { countDownDateAndTime } from "countdown-date-time";

import Container from "./Container";
import SecHead from "./SecHead";
import CountDown from "./CountDown";
import Card from "./Card";
import Btn from "./Btn";

import console from "../assets/Frame 611.png";
import kybord from "../assets/kybord.png";
import monitor from "../assets/Frame 613 (1).png";
import chair from "../assets/chair.png";

const FlashSales = () => {

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
            <div className="px-3">
              <Card
                parcent="-24%"
                itemImg={console}
                modle="AK-900 Wired Keyboard"
                discountPrice="$990"
                regularPrice="$1120"
                rate="(88)"
              />
            </div>

            <div className="px-3">
              <Card
                parcent="-67%"
                itemImg={kybord}
                modle="IPS LCD Gaming Monitor"
                discountPrice="$370"
                regularPrice="$400"
                rate="(88)"
              />
            </div>

            <div className="px-3">
              <Card
                parcent="-30%"
                itemImg={chair}
                modle="HAVIT HV-G92 Gamepad"
                discountPrice="$120"
                regularPrice="$160"
                rate="(88)"
              />
            </div>

            <div className="px-3">
              <Card
                parcent="-23%"
                itemImg={monitor}
                modle="S-Series Comfort Chair"
                discountPrice="$375"
                regularPrice="$400"
                rate="(88)"
              />
            </div>

            <div className="px-3">
              <Card
                parcent="-45%"
                itemImg={chair}
                modle="HAVIT HV-G92 Gamepad"
                discountPrice="$120"
                regularPrice="$160"
                rate="(88)"
              />
            </div>

            <div className="px-3">
              <Card
                parcent="90%"
                itemImg={kybord}
                modle="IPS LCD Gaming Monitor"
                discountPrice="$370"
                regularPrice="$400"
                rate="(88)"
              />
            </div>
          </Slider>
        </div>

        <div className="flex justify-center mt-14">
          <Btn text="View All Products" />
        </div>
      </Container>
    </div>
  );
};

export default FlashSales;