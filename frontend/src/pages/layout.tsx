import React from 'react'
import Navbar from '../components/Navbar'

const Layout = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
    return (

        <div className='layout'>
            <Navbar />
            <div className='layout__content'>
                {props.children}
            </div>
        </div>

    )
}

export default Layout