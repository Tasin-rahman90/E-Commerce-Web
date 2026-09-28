import React, { useEffect, useState } from "react";
import Container from "./Container";
import BreadCrump from "./BreadCrump";
import Paginate from "./Paginate";
import Skeleton from "./Skeleton";
import { useSearchParams } from "react-router";

const ShopByCategory = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(false);
  const [categoriesRetryKey, setCategoriesRetryKey] = useState(0);
  const [productsRetryKey, setProductsRetryKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const controller = new AbortController();
    setCategoriesError(false);
    fetch("https://dummyjson.com/products/categories", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Categories could not be loaded.");
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid category response.");
        setCategories(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setCategoriesError(true);
      });
    return () => controller.abort();
  }, [categoriesRetryKey]);

  useEffect(() => {
    const controller = new AbortController();
    const productsUrl = selectedCategory === "all"
      ? "https://dummyjson.com/products?limit=0"
      : `https://dummyjson.com/products/category/${encodeURIComponent(selectedCategory)}`;

    setLoading(true);
    setProductsError(false);
    fetch(productsUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Products could not be loaded.");
        return response.json();
      })
      .then((data) => {
        if (data.message || !Array.isArray(data.products)) throw new Error("Invalid product response.");
        setProducts(data.products);
      })
      .catch((error) => {
        if (error.name !== "AbortError") setProductsError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [selectedCategory, productsRetryKey]);

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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
          <div className="min-w-0 lg:w-full">
            {categoriesError ? (
              <div className="flex items-center gap-3 text-sm lg:flex-col lg:items-start">
                <p className="text-gray-600">Categories could not be loaded.</p>
                <button type="button" onClick={() => setCategoriesRetryKey((current) => current + 1)} className="text-primary underline">
                  Try again
                </button>
              </div>
            ) : (
              <ul aria-label="Product categories" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0">
                <li className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={selectedCategory === "all"}
                    onClick={() => selectCategory("all")}
                    className={`rounded-sm px-3 py-2 text-left capitalize hover:text-red-400 hover:underline focus-visible:outline-2 focus-visible:outline-primary lg:px-0 lg:py-0 ${selectedCategory === "all" ? "text-red-500 font-bold" : ""}`}
                  >
                    All
                  </button>
                </li>
                {categories.slice(0, 8).map((item) => (
                  <li key={item.slug} className="shrink-0">
                    <button
                      type="button"
                      aria-pressed={selectedCategory === item.slug}
                      onClick={() => selectCategory(item.slug)}
                      className={`rounded-sm px-3 py-2 text-left capitalize hover:text-red-400 hover:underline focus-visible:outline-2 focus-visible:outline-primary lg:px-0 lg:py-0 ${selectedCategory === item.slug ? "text-red-500 font-bold" : ""}`}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="min-w-0">
            {productsError ? (
              <div className="flex min-h-72 flex-col items-center justify-center gap-4 border border-gray-200 text-center">
                <p className="text-gray-600">Products could not be loaded. Check your connection and try again.</p>
                <button type="button" onClick={() => setProductsRetryKey((current) => current + 1)} className="rounded-sm bg-primary px-5 py-2 font-medium text-white">
                  Try again
                </button>
              </div>
            ) : loading ? (
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