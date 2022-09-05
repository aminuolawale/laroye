import React from 'react'
import HeroArt from '../components/HeroArt'
import SignupForm from '../components/SignupForm'

const Login = () => {
    return (
        <div className='login'>
            <div className="login__content">
                <HeroArt />
                <div className="login__content__form">
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}

export default Login