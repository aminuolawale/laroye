import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetUserQuery } from '../features/user/userApiSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Avatar from './Avatar'
import { getLoggedInStatus } from '../features/auth/authSlice'
const Navbar = () => {
    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(getLoggedInStatus)
    const {data, isSuccess} = useGetUserQuery();
    const user = data?.data;
    return (
        <div className='navbar'>
            <div className="navbar__content">
                <div className='navbar__content__title'>
                    <Link to="/">Laroye</Link>
                </div>
                {isUserLoggedIn?(<Link to="/account"><Avatar user={user} /></Link>):(<ul className='navbar__content__links'>
                    <Link to="login">Login</Link>
                    <Link to="signup">Signup</Link>
                </ul>)}
                
            </div>
        </div>
    )
}

export default Navbar;