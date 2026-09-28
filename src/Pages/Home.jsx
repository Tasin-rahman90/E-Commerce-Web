import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import FlashSales from '../Components/FlashSales'
import Category from '../Components/Category'
import BestProduct from '../Components/BestProduct'
import Explore from '../Components/Explore'
import Arrival from '../Components/Arrival'
import LoadingAnimation from '../Components/LoadingAnimation'
import HomeSkeleton from '../Components/HomeSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import { ProductReducer } from '../Slices/ProductSlice'

let hasShownLoadingAnimation = false

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.value)
  const [showLoadingAnimation] = useState(() => !hasShownLoadingAnimation)
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(() => products.length === 0)

  useEffect(() => {
    if (!showLoadingAnimation) return

    hasShownLoadingAnimation = true
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [showLoadingAnimation])

  useEffect(() => {
    if (products.length > 0) {
      setProductsLoading(false)
      return
    }

    const controller = new AbortController()
    fetch('https://dummyjson.com/products?limit=20', { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => dispatch(ProductReducer(data.products || [])))
      .catch((error) => {
        if (error.name !== 'AbortError') console.log(error)
      })
      .finally(() => {
        if (!controller.signal.aborted) setProductsLoading(false)
      })

    return () => controller.abort()
  }, [dispatch, products.length])

  if (showLoadingAnimation && loading) {
    return <LoadingAnimation />
  }

  if (productsLoading) {
    return <HomeSkeleton />
  }

  return (
    <div>
      <Banner/>
      <FlashSales products={products}/>
      <Category/>
      <BestProduct products={products}/>
      <Explore products={products}/>
      <Arrival/>
    </div>
  )
}

export default Home
