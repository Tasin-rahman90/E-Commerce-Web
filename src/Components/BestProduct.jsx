import React from 'react'
import Container from './Container'
import SecHead from './SecHead'
import Btn from './Btn'
import Card from './Card'
import Experience from './Experience'

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
          <div className='flex justify-between mt-20'>
            {products.slice(0, 4).map((product) => (
              <Card
                key={product.id}
                id={product.id}
                productDeatils={product}
                parcent={product.discountPercentage}
                modle={product.title}
                discountPrice={`$${product.price.toFixed(2)}`}
                regularPrice={`$${(
                  product.price / (1 - product.discountPercentage / 100)
                ).toFixed(2)}`}
                rate={product.rating}
                itemImg={product.thumbnail}
              />
            ))}
          </div>
          <Experience className='mt-35 mb-17.75'/>
        </Container>
      </div>
    </>
  )
}

export default BestProduct
