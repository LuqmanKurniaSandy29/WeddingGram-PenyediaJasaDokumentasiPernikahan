import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import LandingPage from "./Page/LandingPage";
import Login from "./Page/Login";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<LandingPage />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
