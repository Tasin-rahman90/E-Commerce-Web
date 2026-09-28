import React, { useEffect, useState } from "react";
import Container from "./Container";
import BreadCrump from "./BreadCrump";
import Paginate from "./Paginate";
import Skeleton from "./Skeleton";
import { useSearchParams } from "react-router";

const ShopByCategory = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const productsUrl = selectedCategory === "all"
      ? "https://dummyjson.com/products?limit=0"
      : `https://dummyjson.com/products/category/${encodeURIComponent(selectedCategory)}`;

    setLoading(true);
    fetch(productsUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const selectCategory = (category) => {
    setSearchParams(category === "all" ? {} : { category });
  };

  return (
    <div className="pt-20.25 pb-26">
      <Container>
        <BreadCrump />

        <div className="flex justify-between items-center pt-12.5 pb-6">
          <h3 className="text-[20px] font-bold">Shop by Category</h3>
          <div className="flex items-center gap-3">
            <h3>Show :</h3>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border rounded-md py-1 px-5"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-[20%]">
            <ul className="space-y-4 cursor-pointer">
              <li
                onClick={() => selectCategory("all")}
                role="button"
                tabIndex={0}
                className={`capitalize hover:text-red-400 hover:underline ${
                  selectedCategory === "all" ? "text-red-500 font-bold" : ""
                }`}
              >
                All
              </li>
              {categories.slice(0, 8).map((item) => (
                <li
                  key={item.slug}
                  onClick={() => selectCategory(item.slug)}
                  role="button"
                  tabIndex={0}
                  className={`capitalize hover:text-red-400 hover:underline ${
                    selectedCategory === item.slug ? "text-red-500 font-bold" : ""
                  }`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

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
              <Paginate itemsPerPage={itemsPerPage} products={products} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShopByCategory;