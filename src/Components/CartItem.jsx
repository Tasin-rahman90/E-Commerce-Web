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


const CartItem = ({ imgScr, price, title, id, quantity = 1 }) => {
  let dispatch = useDispatch()
  const itemQuantity = Number(quantity) || 1

  return (
    <div className="grid grid-cols-4 items-center py-6 px-10 rounded-sm shadow-sm mt-10">


      <div className="relative flex gap-5 items-center">
        <div className="relative">
          <img
            className="size-13.5 object-cover"
            src={imgScr}
            alt={title}
          />

          <IoIosCloseCircle onClick={() => dispatch(RemoveReducer({ id }))} className="text-pink-500 bg-white absolute -top-2 -right-2 text-xl rounded-full cursor-pointer" />
        </div>

        <h4>{title.slice(0, 15)}</h4>
      </div>


      <h4>${price}</h4>


      <div className="border rounded-sm py-1 px-3 w-fit">
        <div className="flex items-center gap-3">
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


      <h4>${(Number(price) * itemQuantity).toFixed(2)}</h4>

    </div>
  );
};

export default CartItem;