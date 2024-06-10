import React from "react";
import Navigasi from "../Components/Navbar/Navigasi";
import EditProfile from "../Components/EditProfile/EditProfile";
import Footer from "../Components/Footer/Footer";

const EditProfilePage = () => {
  return (
    <div>
      <Navigasi />
      <main className="py-5 px-3" style={{ backgroundColor: "#d5a351" }}>
        <EditProfile />
      </main>
      <Footer />
    </div>
  );
};

export default EditProfilePage;
