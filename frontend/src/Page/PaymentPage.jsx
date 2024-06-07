import React from "react";
import Navigasi from "../Components/Navbar/Navigasi";
import Footer from "../Components/Footer/Footer";
import Payment from "../Components/Payment/Payment";

const PaymentPage = () => {
  return (
    <div>
      <Navigasi />
      <main className="py-5 px-3" style={{ backgroundColor: "#d5a351" }}>
        <Payment />
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
