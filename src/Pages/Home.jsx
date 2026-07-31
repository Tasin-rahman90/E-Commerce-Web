import React from 'react'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import FlashSales from '../Components/FlashSales'
import Category from '../Components/Category'
import BestProduct from '../Components/BestProduct'
import Explore from '../Components/Explore'
import Arrival from '../Components/Arrival'


const Home = () => {
  return (
    <div>
      <Banner/>
      <FlashSales/>
      <Category/>
      <BestProduct/>
      <Explore/>
      <Arrival/>
    </div>
  )
}

export default Home
