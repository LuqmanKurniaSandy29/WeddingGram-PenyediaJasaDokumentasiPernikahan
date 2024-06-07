import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import LandingPage from "./Page/LandingPage";
import Login from "./Page/Login";
import Order from "./Page/Order";
import Register from "./Page/Register";
import Profile from "./Components/Profile/Profile"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<LandingPage />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
       <Route path="/register" element={<Register />} />
       <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
