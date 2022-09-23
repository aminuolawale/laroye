import React from 'react'
import Button from './Button'
import { useForm } from 'react-hook-form';
import { useSignupMutation, useLoginMutation } from '../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux'
const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, watch } = useForm();
    const [signup, { isLoading }] = useSignupMutation(); 
    const [login, { }] = useLoginMutation();
    const onSubmit = async (data: any) => {
        const result = await signup(data).unwrap();
        if (result.success) {
            const loginResult = await login(data).unwrap();
            dispatch(loginUser({ user: result.data, accessToken: loginResult.access, refreshToken: loginResult.refresh }))
            navigate(`/home`)
        }
    };
    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='form__fieldgroup'>
                <input type="text" placeholder='Email' {...register('email')} />
            </div>
            <div className='form__fieldgroup'>
                <input type="password" placeholder="Password" {...register('password')} required/>
            </div>
            <div className='form__fieldgroup'>
                <input type="text" placeholder="First Name" {...register('first_name')} required/>
            </div>
            <div className='form__fieldgroup'>
                <input type="text" placeholder="Last Name" {...register('last_name')} required/>
            </div>
            <button type="submit" className='form__button'>Signup</button>
        </form>
    )
}

export default SignupForm