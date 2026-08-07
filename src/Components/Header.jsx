import React from "react";
import Container from "./Container";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <div className="bg-black text-white py-3">
      <Container className="px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">

          
          <div className="hidden md:block w-20"></div>

          
          <p className="text-xs sm:text-sm text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <NavLink to="/ShopByCategory"><span className="font-semibold underline cursor-pointer ml-2">
              Shop Now
            </span></NavLink>
          </p>

        
          <select
            className="bg-black text-white outline-none cursor-pointer text-xs sm:text-sm"
            defaultValue="en"
          >
            <option value="en" className="text-black bg-white">
              English
            </option>
            <option value="bn" className="text-black bg-white">
              বাংলা
            </option>
          </select>
        </div>
      </Container>
    </div>
  );
};

export default Header;