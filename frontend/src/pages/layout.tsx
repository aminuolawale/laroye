import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    
    return (

        <div className='layout'>
            <Navbar />
            <div className='layout__content'>
                <Outlet/>
            </div>
        </div>

    )
}

export default Layout