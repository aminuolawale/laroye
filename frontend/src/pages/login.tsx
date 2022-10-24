import React, { useEffect } from "react";
import HeroArt from "../components/HeroArt";
import { useDispatch } from "react-redux";
import { logOutUser } from "../features/auth/authSlice";
import SocialLogin from "../components/Login";
const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOutUser());
  });
  return (
    <div className="login">
      <div className="login__content">
        <HeroArt />
        <div className="login__content__form">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
