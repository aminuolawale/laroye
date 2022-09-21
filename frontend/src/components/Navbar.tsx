import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGetUserQuery } from '../features/user/userApiSlice'
import { setUser } from '../features/user/userSlice'
import { selectUser } from '../features/user/userSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Avatar from './Avatar'
const Navbar = () => {
    const dispatch = useDispatch();
    const {data, isSuccess} = useGetUserQuery();
    if(isSuccess){
        dispatch(setUser(data.data))
    }
    const user = data?.data;
    console.log(user)

    return (
        <div className='navbar'>
            <div className="navbar__content">
                <div className='navbar__content__title'>
                    <Link to="/">Laroye</Link>
                </div>
                {user?(<Avatar user={user}/>):(<ul className='navbar__content__links'>
                    <Link to="login">Login</Link>
                    <Link to="signup">Signup</Link>
                </ul>)}
                
            </div>
        </div>
    )
}

export default Navbar;