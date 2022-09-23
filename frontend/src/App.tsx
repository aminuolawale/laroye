
import React from 'react';
import Home from './pages/home';
import Layout from './pages/layout'
import { Route, Routes } from "react-router-dom"
import "./sass/main.scss";
import Login from './pages/login';
import Signup from './pages/signup';
import Account from './pages/account';
import SocialData from './pages/socialData';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<Account/>} />
          <Route path="social/social-data/:id" element={<SocialData/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
