import React from "react";
import Navigasi from "../Components/Navbar/Navigasi";
import Footer from "../Components/Footer/Footer";
import Profile from "../Components/Profile/Profile";
import CheckOrder from "../Components/CheckOrder/CheckOrder";

const ProfilePage = () => {
  return (
    <div>
      <Navigasi />
      <main className="py-5 px-3" style={{ backgroundColor: "#d5a351" }}>
        <Profile />
        <CheckOrder />
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
