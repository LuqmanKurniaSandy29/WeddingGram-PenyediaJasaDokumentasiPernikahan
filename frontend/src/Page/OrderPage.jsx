
import React from 'react'
import Navigasi from "../Components/Navbar/Navigasi";
import Footer from "../Components/Footer/Footer";
import Order from "../Components/Order/Order";


const OrderPage = () => {
  return (
    <div>
      <Navigasi />
      <main>
        <Order />
      </main>
      <Footer />
    </div>
  )
}

export default OrderPage
