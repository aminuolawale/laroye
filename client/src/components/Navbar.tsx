import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="navbar__content">
                <div className='navbar__content__title'>
                    <Link to="/">Laroye</Link>
                </div>
                <ul className='navbar__content__links'>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;