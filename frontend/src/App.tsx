import React, { useEffect } from "react";
import Home from "./pages/home";
import Layout from "./pages/layout";
import { Route, Routes } from "react-router-dom";
import "./sass/main.scss";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Account from "./pages/account";
import SocialData from "./pages/socialData";
import NotFound from "./pages/notFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="signup" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="account" element={<Account />} />
          <Route path="social/social-data/:id" element={<SocialData />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
