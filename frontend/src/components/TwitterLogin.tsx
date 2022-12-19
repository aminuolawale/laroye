import React from "react";
import { default as TwitterLoginComponent } from "react-twitter-login";

const clientId = process.env.REACT_APP_TWITTER_OAUTH_CLIENT_ID as string;
const clientSecret = process.env
  .REACT_APP_TWITTER_OAUTH_CLIENT_SECRET as string;
const TwitterLogin = () => {
  const authHandler = (err: any, data: any) => {};
  return (
    <TwitterLoginComponent
      authCallback={authHandler}
      consumerKey={clientId}
      consumerSecret={clientSecret}
    />
  );
};

export default TwitterLogin;
