import React from 'react'
import { useLocation } from 'react-router'

const BreadCrump = () => {
    let location = useLocation()
    let PathName = location.pathname.split("/")
   
    return (
        <div className='flex gap-4 text-[#00000069]'>
            <h4>home</h4>
            <h4>/</h4>
            <h4>
                {PathName}
            </h4>
        </div>
    )
}

export default BreadCrump
