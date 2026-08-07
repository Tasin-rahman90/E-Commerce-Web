import React from 'react'

const CategoryCard = ({children,title}) => {
    return (
        <>
            <div className='w-42.5 h-36.25 rounded-sm border p-6.25 my-15 group hover:bg-primary hover:border-primary transition-all duration-300 categoryItem'>

                <div className="icon text-black group-hover:text-white transition-all duration-300">
                   {children}
                </div>

                <p className='text-center py-4 group-hover:text-white transition-all duration-300'>
                    {title}
                </p>

            </div>
        </>
    )
}

export default CategoryCard
