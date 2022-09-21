import React from 'react'
import HeroArt from '../components/HeroArt';
import SignupForm from '../components/SignupForm';


const Signup = () => {
    return (
        <div className='signup'>
            <div className='signup__content'>
                <HeroArt />
                <div className="signup__content__form">
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}

export default Signup;