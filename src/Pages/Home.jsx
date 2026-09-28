import React, { useEffect, useState } from 'react'
import Banner from '../Components/Banner'
import FlashSales from '../Components/FlashSales'
import Category from '../Components/Category'
import BestProduct from '../Components/BestProduct'
import Explore from '../Components/Explore'
import Arrival from '../Components/Arrival'
import HomeSkeleton from '../Components/HomeSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import { ProductReducer } from '../Slices/ProductSlice'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.value)
  const [productsLoading, setProductsLoading] = useState(() => products.length === 0)
  const [productsError, setProductsError] = useState(false)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    if (products.length > 0) {
      setProductsLoading(false)
      setProductsError(false)
      return
    }

    const controller = new AbortController()
    setProductsLoading(true)
    setProductsError(false)
    fetch('https://dummyjson.com/products?limit=20', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Products could not be loaded.')
        return response.json()
      })
      .then((data) => {
        if (data.message || !Array.isArray(data.products)) throw new Error('Invalid product response.')
        dispatch(ProductReducer(data.products))
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setProductsError(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setProductsLoading(false)
      })

    return () => controller.abort()
  }, [dispatch, products.length, retryKey])

  if (productsLoading) {
    return <HomeSkeleton />
  }

  if (productsError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold">Products could not be loaded</h1>
        <p className="mt-2 text-gray-500">Check your connection and try again.</p>
        <button
          type="button"
          onClick={() => setRetryKey((current) => current + 1)}
          className="mt-6 rounded-sm bg-primary px-6 py-3 font-medium text-white"
        >
          Try again
        </button>
      </div>
    )
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
