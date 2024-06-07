import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import LandingPage from "./Page/LandingPage";
import Login from "./Page/Login";
import Order from "./Page/Order";
import Register from "./Page/Register";
import Profile from "./Components/Profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentPage from "./Page/PaymentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
