import React from 'react'
import HeroArt from '../components/HeroArt'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
const Login = () => {
    return (
        <div className='login'>
            <div className="login__content">
                <HeroArt />
                <div className="login__content__form">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login