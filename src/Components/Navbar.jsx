import React from 'react'
import Container from './Container'
import Logo from '../assets/Logo.png'
import { IoMdHeartEmpty } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <>
    <div className='border-b-2'>

   
      <Container className="px-4 py-6 md:py-8 ">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

         
          <div>
            <img src={Logo} alt="Logo" />
          </div>

          
          <ul className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
            <li className="cursor-pointer border-b-2 border-transparent hover:border-black duration-200">
             <NavLink to="/" end>Home</NavLink>
            </li>

            <li className="cursor-pointer border-b-2 border-transparent hover:border-black duration-200">
              Contact
            </li>

            <li className="cursor-pointer border-b-2 border-transparent hover:border-black duration-200">
              About
            </li>

            <li className="cursor-pointer border-b-2 border-transparent hover:border-black duration-200">
              Sign Up
            </li>
          </ul>

          
          <div className="flex items-center gap-3 md:gap-6 w-full lg:w-auto justify-center">

            <div className="relative w-full sm:w-72 md:w-80 lg:w-auto">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-[#F5F5F5] py-2.5 pl-4 pr-10 rounded-md outline-none w-full "
              />

              <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-xl md:text-2xl text-gray-600 cursor-pointer" />
            </div>

            <div className="flex gap-3 md:gap-4">
              <IoMdHeartEmpty className="w-7 h-7 md:w-8 md:h-8 cursor-pointer" />
              <FiShoppingCart className="w-7 h-7 md:w-8 md:h-8 cursor-pointer" />
            </div>

          </div>

        </div>
      </Container>
       </div>
    </>
  )
}

export default Navbar