
import React from 'react';
import Home from './pages/home';
import Layout from './pages/layout'
import { Route, Routes } from "react-router-dom"
import "./sass/main.scss";
import Login from './pages/login';
import Signup from './pages/signup';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
