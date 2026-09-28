import React from 'react'
import Container from './Container'
import SecHead from './SecHead'
import Btn from './Btn'
import Card from './Card'
import Experience from './Experience'
import { getDiscountedPrice } from '../Utils/price'

const BestProduct = ({ products = [] }) => {
  return (
    <>
      <div className='mt-17.5 mb-35'>
        <Container>
          <div className='flex justify-between items-end'>
            <SecHead
              title='This Month'
              heading='Best Selling Products'
            />
            <div>
              <Btn
                text='View All'
                to='/ShopByCategory'
              />
            </div>
          </div>
          <div className='mt-12 grid grid-cols-1 justify-items-center gap-8 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4'>
            {products.slice(0, 4).map((product) => (
              <Card
                key={product.id}
                id={product.id}
                productDetails={product}
                percent={product.discountPercentage}
                title={product.title}
                discountPrice={getDiscountedPrice(product)}
                rate={product.rating}
                itemImg={product.thumbnail}
              />
            ))}
          </div>
          <Experience className='mt-16 mb-16 lg:mt-35 lg:mb-17.75'/>
        </Container>
      </div>
    </>
  )
}

export default BestProduct
