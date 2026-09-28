import React from "react";
import { Rate } from "antd";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToWishlist,
  CartReducer,
  RemoveFromWishlist,
} from "../Slices/ProductSlice";
import { toast, Bounce } from "react-toastify";

const Card = ({
  parcent,
  modle,
  discountPrice,
  regularPrice,
  rate,
  itemImg,
  id,
  productDeatils,
}) => {
  const data = useSelector((state) => state.products.cart);
  const wishlist = useSelector((state) => state.products.wishlist);
  const isWishlisted = wishlist.some((item) => item.id === id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify = (matchItem) => {
    if (matchItem) {
      toast.warn("Product is already in your cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.success("Product added to cart successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleProductDetails = () => {
    navigate(`/productDetails/${id}`);
  };

  const handleAddToCart = () => {
    const matchItem = data.find((item) => item.id === id);

    if (matchItem) {
      notify(true);
      return;
    }

    dispatch(CartReducer(productDeatils));
    notify(false);
  };

  const handleWishlistToggle = (event) => {
    event.stopPropagation();
    if (isWishlisted) {
      dispatch(RemoveFromWishlist({ id }));
      toast.info("Product removed from your wishlist.");
    } else {
      dispatch(AddToWishlist(productDeatils));
      toast.success("Product added to your wishlist.");
    }
  };

  return (
    <div className="w-67.5 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="relative group py-8.75 px-10 bg-[#F5F5F5] rounded-sm overflow-hidden">
        <span className="absolute text-white top-3 left-3 py-1 px-3 bg-primary rounded-sm z-10">
          -{parcent}%
        </span>

        <div className="overflow-hidden">
          <img
            onClick={handleProductDetails}
            src={itemImg}
            alt={modle}
            className="w-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="absolute top-3 right-3 space-y-2">
          <button
            type="button"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="text-2xl p-2.5 bg-white rounded-full transition-all duration-300 hover:bg-black hover:text-white hover:scale-110"
            onClick={handleWishlistToggle}
          >
            {isWishlisted ? <IoIosHeart className="text-primary" /> : <IoIosHeartEmpty />}
          </button>

          <div
            className="text-2xl p-2.5 bg-white rounded-full transition-all duration-300 hover:bg-black hover:text-white hover:scale-110"
            onClick={handleProductDetails}
          >
            <IoEyeOutline />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={handleAddToCart}
            className="bg-black w-full text-white py-2 cursor-pointer transition-colors duration-300 hover:bg-primary"
          >
            Add To Cart
          </button>
        </div>
      </div>

      <h3 className="font-medium mt-4">{modle}</h3>

      <div className="flex gap-3 py-1">
        <p className="text-primary font-medium">{discountPrice}</p>

        <p className="font-medium text-[#00000062] line-through">
          {regularPrice}
        </p>
      </div>

      <div className="flex gap-2">
        <Rate allowHalf value={Number(rate) || 0} disabled />

        <h4 className="text-[#0000006c]">({rate})</h4>
      </div>
    </div>
  );
};

export default Card;