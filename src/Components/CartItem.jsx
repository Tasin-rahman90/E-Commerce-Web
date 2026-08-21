import React from "react";
import Gamepad from "../assets/Gamepad-Cart-Small.png";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { RemoveReducer } from "../Slices/ProductSlice";


const CartItem = ({ subTotal, imgScr, price, title, id }) => {
  let dispatch = useDispatch()
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
          <span>01</span>

          <div className="flex flex-col">
            <MdKeyboardArrowUp className="cursor-pointer" />
            <MdKeyboardArrowDown className="cursor-pointer" />
          </div>
        </div>
      </div>


      <h4>${subTotal}</h4>

    </div>
  );
};

export default CartItem;