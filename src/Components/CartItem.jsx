import React from "react";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  DecreaseCartQuantity,
  IncreaseCartQuantity,
  RemoveReducer,
} from "../Slices/ProductSlice";
import { getDiscountedPrice } from "../Utils/price";
import { Link } from "react-router";


const CartItem = ({ product }) => {
  const dispatch = useDispatch()
  const { thumbnail: imgScr, title, id, quantity = 1 } = product
  const itemQuantity = Number(quantity) || 1
  const price = getDiscountedPrice(product)

  return (
    <div className="mt-4 grid grid-cols-2 items-center gap-4 rounded-sm border border-gray-200 p-4 shadow-sm md:mt-10 md:grid-cols-4 md:gap-0 md:border-0 md:py-6 md:px-10 md:shadow-sm">
      <div className="col-span-2 flex min-w-0 items-center justify-between gap-4 md:col-span-1">
        <div className="flex min-w-0 items-center gap-4">
          <img className="h-14 w-14 shrink-0 object-contain" src={imgScr} alt={title} />
          <Link to={`/productDetails/${id}`} title={title} className="min-w-0 truncate hover:underline">
            {title}
          </Link>
        </div>
        <button
          type="button"
          aria-label={`Remove ${title} from cart`}
          onClick={() => dispatch(RemoveReducer({ id }))}
          className="shrink-0 rounded-full text-xl text-pink-500 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
        >
          <IoIosCloseCircle aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center justify-between text-sm md:block md:text-base">
        <span className="text-gray-500 md:hidden">Price</span>
        <span>${price.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between md:block">
        <span className="text-sm text-gray-500 md:hidden">Quantity</span>
        <div className="flex w-fit items-center gap-3 rounded-sm border px-3 py-1">
          <span>{String(itemQuantity).padStart(2, "0")}</span>
          <div className="flex flex-col">
            <button
              type="button"
              aria-label={`Increase quantity for ${title}`}
              onClick={() => dispatch(IncreaseCartQuantity({ id }))}
              className="cursor-pointer"
            >
              <MdKeyboardArrowUp />
            </button>
            <button
              type="button"
              aria-label={`Decrease quantity for ${title}`}
              onClick={() => dispatch(DecreaseCartQuantity({ id }))}
              className="cursor-pointer"
            >
              <MdKeyboardArrowDown />
            </button>
          </div>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-between text-sm font-medium md:col-span-1 md:block md:text-base">
        <span className="text-gray-500 md:hidden">Subtotal</span>
        <span>${(price * itemQuantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartItem;