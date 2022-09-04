
import React from 'react'
import Home from './pages/home';
import Layout from './pages/layout'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./sass/main.scss";
import Login from './pages/login';
import Signup from './pages/signup';

const App = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App
