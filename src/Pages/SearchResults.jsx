import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router";
import BreadCrump from "../Components/BreadCrump";
import Card from "../Components/Card";
import Container from "../Components/Container";
import { searchProducts } from "../Utils/productSearch";

const SearchSkeleton = () => (
  <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Loading search results" aria-busy="true">
    {Array.from({ length: 8 }, (_, index) => (
      <div key={index} className="w-full max-w-67.5 animate-pulse">
        <div className="h-60 rounded-sm bg-gray-200" />
        <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
        <div className="mt-3 h-3 w-1/2 rounded bg-gray-200" />
      </div>
    ))}
  </div>
);

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(Boolean(query));
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(false);

    searchProducts(query, { signal: controller.signal })
      .then((results) => setProducts(results))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(true);
          setProducts([]);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [query, retryKey]);

  const sortedProducts = [...products].sort((first, second) => {
    if (sortOrder === "price-low") return first.price - second.price;
    if (sortOrder === "price-high") return second.price - first.price;
    return 0;
  });

  return (
    <div className="min-h-[60vh] pb-24 pt-12 sm:pt-20">
      <Container>
        <BreadCrump />

        <div className="mb-8 mt-12 flex flex-wrap items-end justify-between gap-4 sm:mt-16">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <FiSearch aria-hidden="true" /> Product search
            </p>
            <h1 className="text-2xl font-semibold">
              {query ? `Results for “${query}”` : "Search products"}
            </h1>
            {!loading && !error && query && (
              <p className="mt-2 text-sm text-gray-500">{products.length} products found</p>
            )}
          </div>
          {!loading && products.length > 0 && (
            <label className="flex items-center gap-3 text-sm">
              Sort by
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          )}
        </div>

        {loading ? (
          <SearchSkeleton />
        ) : error ? (
          <div className="flex min-h-64 flex-col items-center justify-center border border-gray-200 px-6 text-center">
            <h2 className="text-lg font-semibold">Search could not be completed</h2>
            <p className="mt-2 text-sm text-gray-500">Check your connection and try again.</p>
            <button
              type="button"
              onClick={() => setRetryKey((current) => current + 1)}
              className="mt-5 rounded-sm bg-primary px-6 py-3 font-medium text-white"
            >
              Try Again
            </button>
          </div>
        ) : !query ? (
          <div className="flex min-h-64 flex-col items-center justify-center border border-gray-200 px-6 text-center">
            <FiSearch className="mb-4 text-4xl text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Enter a product name to search</h2>
            <p className="mt-2 text-sm text-gray-500">Use the search field above to find products.</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center border border-gray-200 px-6 text-center">
            <FiSearch className="mb-4 text-4xl text-gray-400" aria-hidden="true" />
            <h2 className="text-lg font-semibold">No products found</h2>
            <p className="mt-2 text-sm text-gray-500">Try a different product name or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                productDeatils={item}
                parcent={item.discountPercentage}
                modle={item.title}
                discountPrice={(item.price - (item.price * item.discountPercentage) / 100).toFixed(2)}
                regularPrice={item.price}
                rate={item.rating}
                itemImg={item.thumbnail}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default SearchResults;