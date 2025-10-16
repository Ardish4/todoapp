import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./pages/hero";
import Login from "./pages/login";
import Signup from "./pages/signup";

import './index.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Hero" />}/>
      <Route path="/hero" element={<Hero />} />
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />} />
     
    </Routes>
  );
}

export default App;
