import React, { useEffect, useState } from "react";
import Navigasi from "../Components/Navbar/Navigasi";
import Footer from "../Components/Footer/Footer";
import Profile from "../Components/Profile/Profile";
import CheckOrder from "../Components/CheckOrder/CheckOrder";

const NotFound = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1>404 Page Not Found</h1>
  </div>
);

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State untuk mengelola status login

  useEffect(() => {
    const token = localStorage.getItem('token'); // Mendapatkan token dari localStorage
    if (!token) {
      setIsLoggedIn(false); // Set status login menjadi false jika token tidak ada
    }
  }, []);

  if (!isLoggedIn) {
    return <NotFound />; // Menampilkan halaman 404 jika tidak login
  }

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
