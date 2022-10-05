import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import ErrorBanner from "../components/ErrorBanner";
import { useSelector } from "react-redux";
import { selectErrors } from "../features/errors/errorsSlice";

const Layout = () => {
  const errors = useSelector(selectErrors);
  console.log(errors, "______");
  return (
    <div className="layout">
      <Helmet>
        <title> Laroye</title>
      </Helmet>
      <Navbar />
      <ErrorBanner errors={errors} />
      <div className="layout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
