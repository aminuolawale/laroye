import React from "react";

type ErrorBannerProps = {
  errors: string[];
};
const ErrorBanner = ({ errors }: ErrorBannerProps) => {
  return (
    <>
      {errors.map((e) => (
        <p key={e}>{e}</p>
      ))}
    </>
  );
};

export default ErrorBanner;
