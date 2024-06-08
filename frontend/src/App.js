import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import LandingPage from "./Page/LandingPage";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import OrderPage from "./Page/OrderPage";
import PaymentPage from "./Page/PaymentPage";
// import Profile from "./Components/Profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./Page/ProfilePage";
import EditProfilePage from "./Page/EditProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
