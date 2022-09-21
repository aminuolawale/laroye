import React from 'react'
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser)
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = async (data: any) => {
        const { success, data: { access, refresh } } = await login(data).unwrap();
        if (success) {
            dispatch(loginUser({ accessToken: access, refreshToken: refresh }))
            navigate("/")
        }
    }
    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='form__fieldgroup'>
                <input type="text" placeholder='Email' {...register('email')} />
            </div>
            <div className='form__fieldgroup'>
                <input type="password" placeholder="Password" {...register('password')} />
            </div>


            <button type="submit" className='form__button'>Login</button>
        </form>
    )
}

export default LoginForm