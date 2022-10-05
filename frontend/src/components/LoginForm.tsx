import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import FormGroupErrors from "./FormGroupErrors";
import { addErrors } from "../features/errors/errorsSlice";

type LoginFormGroupError = {
  email: string[];
  password: string[];
};
const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [errors, setErrors] = useState<LoginFormGroupError>({
    email: [],
    password: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = async (data: any) => {
    const {
      errors,
      success,
      data: { access, refresh },
    } = await login(data).unwrap();
    if (success) {
      console.log("successs", success)
      dispatch(loginUser({ accessToken: access, refreshToken: refresh }));
      navigate("/account");
    } else {
      setErrors(errors);
      dispatch(addErrors(errors.non_field_errors || []));
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__fieldgroup">
        <input type="text" placeholder="Email" {...register("email")} />
      </div>
      <FormGroupErrors errors={errors?.email || []} />
      <div className="form__fieldgroup">
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          required
        />
      </div>
      <FormGroupErrors errors={errors?.password || []} />
      <button type="submit" className="form__button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
