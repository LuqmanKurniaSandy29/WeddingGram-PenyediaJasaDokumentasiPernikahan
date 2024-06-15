import React, { useEffect, useState } from "react";
import Dashboard from "../Components/AdminComponent/Dashboard/Dashboard";
import Order from "../Components/AdminComponent/TableOrder/TableOrder";
import Payment from "../Components/AdminComponent/TablePayment/TablePayment";
import User from "../Components/AdminComponent/TableUser/TableUser";
import Home from "../Components/AdminComponent/HomeAdmin/HomeAdmin";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1>404 Page Not Found</h1>
  </div>
);

const DashboardAdmin = () => {
  const [activeComponent, setActiveComponent] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State untuk mengelola status login

  useEffect(() => {
    const token = localStorage.getItem('token'); // Mendapatkan token dari localStorage
    if (!token) {
      setIsLoggedIn(false); // Set status login menjadi false jika token tidak ada
    }
  }, []);

  const handleMenuClick = (menu) => {
    setActiveComponent(menu);
  };

  if (!isLoggedIn) {
    return <NotFound />; // Menampilkan halaman 404 jika tidak login
  }

  return (
    <div className="d-flex">
      <Dashboard onMenuClick={handleMenuClick} />
      <div className="container-fluid">
        {activeComponent === "home" && <Home />}
        {activeComponent === "order" && <Order />}
        {activeComponent === "payment" && <Payment />}
        {activeComponent === "user" && <User />}
      </div>
    </div>
  );
};

export default DashboardAdmin;
