import React from 'react'
import Button from './Button'
import { useForm } from 'react-hook-form';

const SignupForm = () => {
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = (data: any) => console.log(data);
    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='form__fieldgroup'>
                <input type="text" placeholder='Email' {...register('email')} />
            </div>
            <div className='form__fieldgroup'>
                <input type="text" placeholder="Password" {...register('password')} />
            </div>
            <button type="submit" className='form__button'>Signup</button>
        </form>
    )
}

export default SignupForm