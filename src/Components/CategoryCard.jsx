import React from 'react'
import { Link } from 'react-router'

const CategoryCard = ({children,title,to}) => {
    return (
        <Link to={to} className='block'>
            <div className='w-full h-36.25 rounded-sm border p-6.25 my-8 group hover:bg-primary hover:border-primary transition-all duration-300 categoryItem'>

                <div className="icon text-black group-hover:text-white transition-all duration-300">
                   {children}
                </div>

                <p className='text-center py-4 group-hover:text-white transition-all duration-300'>
                    {title}
                </p>

            </div>
        </Link>
    )
}

export default CategoryCard
