import React, {useState} from 'react'
import { appendErrors, useForm } from 'react-hook-form';
import { useLinkSocialAccountMutation } from '../features/user/userApiSlice';
import { useDispatch } from 'react-redux';
import { setSocialAccount } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const LinkSocialAccountForm = () => {
    const { register, handleSubmit, watch, reset } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState<any>();
    const [linkSocialAccount, {isLoading}] = useLinkSocialAccountMutation();

    const onSubmit = async (data:any) => {
        setFormErrors(null)
        const {success, errors, data:socialData} = await linkSocialAccount({...data, provider:"twitter"}).unwrap();
        console.log("socil data", socialData, errors)
        setFormErrors(errors)
        if (success){
            dispatch(setSocialAccount(socialData))
            navigate("/account")
        }
        reset()
    };
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form__fieldgroup'>
            <input type="text" placeholder='Twitter Username' {...register('username')} required />
        </div>
        {formErrors?.username?.map((e:any)=> <p>{e}</p>)}
        {formErrors?.non_field_errors?.map((e:any)=> <p key={e}>{e}</p>)}

        <button type="submit" className='form__button'>Submit</button>
    </form>
)
}

export default LinkSocialAccountForm