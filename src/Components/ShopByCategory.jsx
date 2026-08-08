import React, { useEffect, useState } from "react";
import Container from "./Container";
import BreadCrump from "./BreadCrump";
import Paginate from "./Paginate";
import Skeleton from "./Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { ProductReducer } from "../Slices/ProductSlice";

const ShopByCategory = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const dispatch = useDispatch();

  // Redux store থেকে products নেওয়া
  const products = useSelector((state) => state.products.value);

  // API থেকে products fetch
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch(ProductReducer(data.products || []));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  // Unique Category
  const UniqueCategory = [
    ...new Set(products.map((item) => item.category)),
  ];

  // Category অনুযায়ী products filter
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <div className="pt-20.25 pb-26">
      <Container>
        <BreadCrump />

        {/* Header */}
        <div className="flex justify-between items-center pt-12.5 pb-6">
          <h3 className="text-[20px] font-bold">Shop by Category</h3>

          <div className="flex items-center gap-3">
            <h3>Show :</h3>

            <select
              value={itemsPerPage}
              onChange={(e) =>
                setItemsPerPage(Number(e.target.value))
              }
              className="border rounded-md py-1 px-5"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-between">
          {/* Category */}
          <div className="w-[20%]">
            <ul className="space-y-4 cursor-pointer">

              {/* All Category */}
              <li
                onClick={() => setSelectedCategory("all")}
                className={`capitalize hover:text-red-400 hover:underline ${
                  selectedCategory === "all"
                    ? "text-red-500 font-bold"
                    : ""
                }`}
              >
                All
              </li>

              {/* Unique Categories */}
              {UniqueCategory.map((item) => (
                <li
                  key={item}
                  onClick={() => setSelectedCategory(item)}
                  className={`capitalize hover:text-red-400 hover:underline ${
                    selectedCategory === item
                      ? "text-red-500 font-bold"
                      : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="w-[78%]">
            {loading ? (
              <div className="flex flex-wrap gap-x-7.5 gap-y-10">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ) : (
              <Paginate
                itemsPerPage={itemsPerPage}
                products={filteredProducts}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShopByCategory;