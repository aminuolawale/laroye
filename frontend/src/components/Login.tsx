import React from "react";
import { GoogleLogin } from "react-google-login";

const SocialLogin = () => {
  const handleSuccess = (response: any) => console.log(response);
  const handleFailure = (response: any) => console.log(response);
  return (
    <div>
      <GoogleLogin
        clientId="691190061509-6ulah8tk68kdhgus4cp1aal5bo27r6l4.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default SocialLogin;
