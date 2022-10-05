import React, { useEffect } from 'react'
import HeroArt from '../components/HeroArt'
import LoginForm from '../components/LoginForm'
import { useDispatch } from 'react-redux'
import { loginUser, logOutUser } from '../features/auth/authSlice'
import SocialLogin from '../components/Login'
const Login = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(logOutUser())
    })
    return (
        <div className='login'>
            <div className="login__content">
                <HeroArt />
                <div className="login__content__form">
                    <LoginForm />
                    <SocialLogin/>
                </div>
            </div>
        </div>
    )
}

export default Login