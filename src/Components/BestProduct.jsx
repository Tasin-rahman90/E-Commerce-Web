import React from 'react'
import Container from './Container'
import SecHead from './SecHead'
import Btn from './Btn'
import Card from './Card'
import Frame from '../assets/Frame 605.png'
import bag from '../assets/Frame 606.png'
import CpuColer from '../assets/Frame 610.png'
import BookSlef from '../assets/Frame 612 (1).png'
import Experience from './Experience'

const BestProduct = () => {
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
              />
            </div>
          </div>
          <div className='flex justify-between mt-20'>
            <Card
              parcent='43%'
              modle='The north coat'
              discountPrice='$342'
              regularPrice='$4536'
              rate='(64)'
              itemImg={Frame}
            />
            <Card
              parcent='31%'
              modle='The north coat'
              discountPrice='$245'
              regularPrice='$876'
              rate='(65)'
              itemImg={bag}
            />
            <Card
              parcent='23%'
              modle='The north coat'
              discountPrice='$216'
              regularPrice='$345'
              rate='(63)'
              itemImg={CpuColer}
            />
            <Card
              parcent='34%'
              modle='The north coat'
              discountPrice='$245'
              regularPrice='$345'
              rate='(45)'
              itemImg={BookSlef}
            />
          </div>
          <Experience className='mt-35 mb-17.75'/>
        </Container>
      </div>
    </>
  )
}

export default BestProduct
