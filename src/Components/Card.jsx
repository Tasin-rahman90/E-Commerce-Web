
import React from "react";
import { Rate } from "antd";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const Card = ({
  parcent,
  modle,
  discountPrice,
  regularPrice,
  rate,
  itemImg,
  id
}) => {
  const navigate = useNavigate();

  const handleProductDetails = () => {
    navigate(`/productDetails/${id}`);
  };

  return (
    <div
      onClick={handleProductDetails}
      className="w-67.5 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
    >
      
      <div className="relative group py-8.75 px-10 bg-[#F5F5F5] rounded-sm overflow-hidden">
        
       
        <span className="absolute text-white top-3 left-3 py-1 px-3 bg-primary rounded-sm z-10">
          -{parcent}%
        </span>

       
        <div className="overflow-hidden">
          <img
            src={itemImg}
            alt={modle}
            className="w-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>

       
        <div className="absolute top-3 right-3 space-y-2">
          <div
            className="text-2xl p-2.5 bg-white rounded-full transition-all duration-300 hover:bg-black hover:text-white hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          >
            <IoIosHeartEmpty />
          </div>

          <div
            className="text-2xl p-2.5 bg-white rounded-full transition-all duration-300 hover:bg-black hover:text-white hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          >
            <IoEyeOutline />
          </div>
        </div>

       
        <div className="absolute bottom-0 left-0 w-full translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-black w-full text-white py-2 cursor-pointer transition-colors duration-300 hover:bg-primary"
          >
            Add To Cart
          </button>
        </div>
      </div>

     
      <h3 className="font-medium mt-4">
        {modle}
      </h3>

      
      <div className="flex gap-3 py-1">
        <p className="text-primary font-medium">
          {discountPrice}
        </p>
        <p className="font-medium text-[#00000062]">
          {regularPrice}
        </p>
      </div>

     
      <div className="flex gap-2">
        <Rate
          allowHalf
          defaultValue={2.5}
        />

        <h4 className="text-[#0000006c]">
          ({rate})
        </h4>
      </div>
    </div>
  );
};

export default Card;

