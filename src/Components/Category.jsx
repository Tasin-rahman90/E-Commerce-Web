import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import {
  FiBox,
  FiCamera,
  FiCoffee,
  FiDroplet,
  FiGift,
  FiHeadphones,
  FiHeart,
  FiHome,
  FiMonitor,
  FiShoppingBag,
  FiShoppingCart,
  FiSmartphone,
  FiTag,
  FiTruck,
  FiWatch,
} from "react-icons/fi";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "./Container";
import SecHead from "./SecHead";
import CategoryCard from "./CategoryCard";

const categoryIconMap = {
  beauty: FiHeart,
  fragrances: FiDroplet,
  furniture: FiHome,
  groceries: FiShoppingCart,
  "home-decoration": FiHome,
  "kitchen-accessories": FiCoffee,
  laptops: FiMonitor,
  "mens-shirts": FiTag,
  "mens-shoes": FiShoppingBag,
  "mens-watches": FiWatch,
  "mobile-accessories": FiSmartphone,
  motorcycle: FiTruck,
  "skin-care": FiDroplet,
  smartphones: FiSmartphone,
  "sports-accessories": FiGift,
  sunglasses: FiCamera,
  tablets: FiBox,
};

const fallbackIcons = [FiCamera, FiMonitor, FiHeadphones, FiShoppingBag];

const CategorySkeleton = () => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" aria-label="Loading categories" aria-busy="true">
    {Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="flex h-36 animate-pulse flex-col items-center justify-center gap-4 border border-gray-200">
        <div className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="h-4 w-20 rounded bg-gray-200" />
      </div>
    ))}
  </div>
);

const Category = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    fetch("https://dummyjson.com/products/categories", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load categories.");
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [retryKey]);

  function SampleNextArrow({ onClick }) {
    return (
      <button
        type="button"
        aria-label="Next categories"
        onClick={onClick}
        className="absolute -top-16 right-0 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-primary hover:text-white"
      >
        <GoArrowRight className="text-2xl" />
      </button>
    );
  }

  function SamplePrevArrow({ onClick }) {
    return (
      <button
        type="button"
        aria-label="Previous categories"
        onClick={onClick}
        className="absolute -top-16 right-14 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F5F5] transition-all duration-300 hover:bg-primary hover:text-white"
      >
        <GoArrowLeft className="text-2xl" />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: categories.length > 6,
    speed: 500,
    slidesToShow: Math.min(6, categories.length),
    slidesToScroll: 1,
    arrows: categories.length > 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="mt-20 mb-35">
      <Container className="border-b border-[#00000046] pb-16">
        <SecHead heading="Browse By Category" title="Categories" />

        <div className="mt-10">
          {loading ? (
            <CategorySkeleton />
          ) : error ? (
            <div className="flex min-h-36 flex-col items-center justify-center gap-3 border border-gray-200 text-center">
              <p className="text-gray-600">Categories could not be loaded.</p>
              <button
                type="button"
                onClick={() => setRetryKey((current) => current + 1)}
                className="rounded-sm bg-primary px-5 py-2 font-medium text-white"
              >
                Try Again
              </button>
            </div>
          ) : categories.length === 0 ? (
            <p className="py-12 text-center text-gray-500">No categories available.</p>
          ) : (
            <Slider {...settings}>
              {categories.map((category, index) => {
                const Icon = categoryIconMap[category.slug] || fallbackIcons[index % fallbackIcons.length];
                return (
                  <div key={category.slug} className="px-3">
                    <CategoryCard
                      title={category.name}
                      to={`/ShopByCategory?category=${encodeURIComponent(category.slug)}`}
                    >
                      <Icon className="mx-auto h-12 w-12" aria-hidden="true" />
                    </CategoryCard>
                  </div>
                );
              })}
            </Slider>
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/ShopByCategory")}
            className="rounded-sm bg-primary px-8 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            View All Categories
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Category;
