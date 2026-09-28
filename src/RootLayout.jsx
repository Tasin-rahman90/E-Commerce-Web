import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const RootLayout = () => {
    return (
        <div>
            <Header />
            <Navbar/>
            <Outlet />
            <ScrollRestoration />
            <Footer/>
        </div>
    )
}

export default RootLayout
