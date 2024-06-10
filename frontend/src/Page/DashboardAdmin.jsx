import React, { useState } from "react";
import Dashboard from "../Components/AdminComponent/Dashboard/Dashboard";
import Order from "../Components/AdminComponent/TableOrder/TableOrder";
import Payment from "../Components/AdminComponent/TablePayment/TablePayment";
import User from "../Components/AdminComponent/TableUser/TableUser";
import Home from "../Components/AdminComponent/HomeAdmin/HomeAdmin";
import "bootstrap/dist/css/bootstrap.min.css";

const DashboardAdmin = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  const handleMenuClick = (menu) => {
    setActiveComponent(menu);
  };

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
