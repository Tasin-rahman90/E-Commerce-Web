import React from 'react'
import { Outlet } from 'react-router'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const RootLayout = () => {
    return (
        <div>
            <Header />
            <Navbar/>
            <Outlet />
            <Footer/>
        </div>
    )
}

export default RootLayout
