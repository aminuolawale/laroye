import React, { useEffect } from "react";
import { GoogleLogin as GoogleLoginComponent } from "@react-oauth/google";
import { useSocialLoginMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const GoogleLogin = () => {
  const [socialLogin, { isLoading }] = useSocialLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSuccess = async (response: any) => {
    const loginResponse = await socialLogin({
      token: response.credential,
      provider: "google",
    }).unwrap();
    const { access: accessToken, refresh: refreshToken } = loginResponse.data;
    dispatch(loginUser({ accessToken, refreshToken }));
    navigate("/account");
  };
  const handleFailure = () => {
    console.log("there was a failure");
  };
  return (
    <div>
      <GoogleLoginComponent
        onSuccess={handleSuccess}
        onError={handleFailure}
      ></GoogleLoginComponent>
    </div>
  );
};

export default GoogleLogin;
