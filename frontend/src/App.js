import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import LandingPage from "./Page/LandingPage";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import OrderPage from "./Page/OrderPage";
import PaymentPage from "./Page/PaymentPage";
import ProfilePage from "./Page/ProfilePage";
import EditProfilePage from "./Page/EditProfilePage";
import DashboardAdmin from "./Page/DashboardAdmin";
import LoginAdminPage from "./Page/LoginAdminPage";
import AddAdminPage from "./Page/AddAdminPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext"; // Import AuthProvider

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/editprofile" element={<EditProfilePage />} />
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/loginadmin" element={<LoginAdminPage />} />
          <Route path="/addadmin" element={<AddAdminPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
