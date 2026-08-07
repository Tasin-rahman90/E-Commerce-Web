import React from 'react'
import Container from './Container'
import Logo1 from '../assets/Logo (1).png'
import send from '../assets/send.png'
import QrCode from '../assets/Qr Code.png'
import GooglePlay from '../assets/GooglePlay.png'
import AppStore from '../assets/AppStore.png'
import { FaFacebookF } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import iconcopyri from '../assets/icon-copyright.png'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <Container className="px-4 sm:px-6 lg:px-0">

        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between gap-10 py-12 lg:py-20">

         
          <div className="w-full sm:w-62.5">
            <img src={Logo1} alt="Logo" />

            <h3 className="text-xl font-medium py-6">
              Subscribe
            </h3>

            <p>Get 10% off your first order</p>

            <div className="mt-4 relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-white rounded-sm bg-transparent py-3 pl-4 pr-12 text-white placeholder:text-white outline-none"
              />

              <img
                src={send}
                alt="Send"
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              />
            </div>
          </div>

       
          <div className="w-full sm:w-62.5">
            <h2 className="text-xl font-medium">Support</h2>

            <h3 className="pt-6 pb-4">
              111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.
            </h3>

            <p>exclusive@gmail.com</p>

            <p className="pt-4">+88015-88888-9999</p>
          </div>

         
          <div className="w-full sm:w-45">
            <h2 className="text-xl font-medium mb-6">Account</h2>

            <ul className="space-y-4">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>

         
          <div className="w-full sm:w-45">
            <h2 className="text-xl font-medium mb-6">
              Quick Link
            </h2>

            <ul className="space-y-4">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          
          <div className="w-full sm:w-65">
            <h3 className="text-xl font-medium">
              Download App
            </h3>

            <p className="text-gray-400 pt-6 pb-2">
              Save $3 with App New User Only
            </p>

            <div className="flex gap-3 items-center">
              <img src={QrCode} alt="QR Code" />

              <div className="flex flex-col gap-2">
                <img src={GooglePlay} alt="Google Play" />
                <img src={AppStore} alt="App Store" />
              </div>
            </div>

            <div className="flex gap-6 text-2xl pt-6">
              <FaFacebookF className="cursor-pointer hover:text-gray-300 duration-300" />
              <LuTwitter className="cursor-pointer hover:text-gray-300 duration-300" />
              <FaInstagram className="cursor-pointer hover:text-gray-300 duration-300" />
              <FaLinkedin className="cursor-pointer hover:text-gray-300 duration-300" />
            </div>
          </div>

        </div>

        
        <div className="border-t border-white/10 py-6">
          <div className="flex items-center justify-center gap-2">
            <img src={iconcopyri} alt="Copyright" />

            <p className="text-center text-white/30 text-sm">
              Copyright Rimel 2022. All rights reserved.
            </p>
          </div>
        </div>

      </Container>
    </footer>
  )
}

export default Footer