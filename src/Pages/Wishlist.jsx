import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FiHeart, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import BreadCrump from "../Components/BreadCrump";
import Container from "../Components/Container";
import {
  CartReducer,
  ClearWishlist,
  RemoveFromWishlist,
} from "../Slices/ProductSlice";
import { getDiscountedPrice } from "../Utils/price";

const WishlistSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Loading wishlist" aria-busy="true">
    {Array.from({ length: 4 }, (_, index) => (
      <div key={index} className="animate-pulse">
        <div className="h-60 rounded-sm bg-gray-200" />
        <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
        <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
        <div className="mt-4 h-10 rounded-sm bg-gray-200" />
      </div>
    ))}
  </div>
);

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.products.wishlist);
  const cart = useSelector((state) => state.products.cart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const moveItemToBag = (item) => {
    dispatch(CartReducer(item));
    dispatch(RemoveFromWishlist({ id: item.id }));
    toast.success(`${item.title} moved to your bag.`);
  };

  const moveAllToBag = () => {
    const cartIds = new Set(cart.map((item) => item.id));
    const newItems = wishlist.filter((item) => !cartIds.has(item.id));
    newItems.forEach((item) => dispatch(CartReducer(item)));
    dispatch(ClearWishlist());
    if (newItems.length > 0) {
      toast.success(`${newItems.length} product(s) moved to your bag.`);
    } else {
      toast.info("All wishlist products are already in your bag.");
    }
    navigate("/cartPage");
  };

  const removeItem = (item) => {
    dispatch(RemoveFromWishlist({ id: item.id }));
    toast.info(`${item.title} removed from your wishlist.`);
  };

  return (
    <div className="pt-12 pb-24 sm:pt-20">
      <Container>
        <BreadCrump />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 sm:mt-16">
          <h1 className="text-2xl font-semibold">Wishlist ({wishlist.length})</h1>
          {wishlist.length > 0 && !loading && (
            <button
              type="button"
              onClick={moveAllToBag}
              className="flex items-center gap-2 rounded-sm border border-gray-400 px-6 py-3 font-medium transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              <FiShoppingBag aria-hidden="true" />
              Move All to Bag
            </button>
          )}
        </div>

        <div className="mt-8">
          {loading ? (
            <WishlistSkeleton />
          ) : wishlist.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {wishlist.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-sm border border-gray-200">
                  <div className="relative grid aspect-square place-items-center bg-[#F5F5F5] p-6">
                    <img
                      src={item.thumbnail || item.images?.[0]}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                    <button
                      type="button"
                      aria-label={`Remove ${item.title} from wishlist`}
                      title="Remove from wishlist"
                      onClick={() => removeItem(item)}
                      className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white text-lg transition-colors hover:bg-primary hover:text-white"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <div className="p-4">
                    <h2 className="truncate font-medium" title={item.title}>{item.title}</h2>
                    <div className="mt-2 flex gap-3 font-medium">
                      <p className="text-primary">${getDiscountedPrice(item).toFixed(2)}</p>
                      {Number(item.discountPercentage) > 0 && (
                        <p className="text-gray-500 line-through">${Number(item.price).toFixed(2)}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => moveItemToBag(item)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm bg-black py-3 font-medium text-white transition-colors hover:bg-primary"
                    >
                      <FiShoppingBag aria-hidden="true" />
                      Add to Bag
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center border border-gray-200 px-6 text-center">
              <FiHeart className="mb-4 text-4xl text-primary" aria-hidden="true" />
              <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
              <p className="mt-2 text-gray-500">Save products you love and find them here.</p>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-6 rounded-sm bg-primary px-7 py-3 font-medium text-white"
              >
                Browse Products
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Wishlist;