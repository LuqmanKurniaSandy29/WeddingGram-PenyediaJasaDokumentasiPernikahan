import React from 'react'
import Navigasi from "../Components/Navbar/Navigasi";
import Hero from "../Components/Hero/Hero";
import About from "../Components/About/About";
import Services from "../Components/Service/Services"; 
import Contact from "../Components/Contact/Contact";
import FAQ from "../Components/FAQ/FAQ";
import Footer from "../Components/Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navigasi />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
