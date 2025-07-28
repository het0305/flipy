// File: src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HowItWorks from "./HowItWorks";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Browse from "./Browse";
import Home from "./Home";
import AboutUs from "./AboutUs";
import ForgotPassword from "./ForgotPassword";
import NotFound from "./NotFound";
import SwapForm from "./SwapForm";

import PrivateRoute from "./components/PrivateRoute";
import LogoutButton from "./components/LogoutButton";
import { useAuth } from "./context/AuthContext";

import Footer from "./Footer"; // ✅ Moved here from components
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="container-fluid">
        <span className="logo">
          Fl<span className="heighlight">i</span>py
        </span>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/browse">Browse</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>

            {!user && (
              <>
                <li><Link to="/signin">Sign In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </>
            )}

            {user && (
              <li><LogoutButton /></li>
            )}

            <li><Link to="/about">About Us</Link></li>
          </ul>
        </nav>
      </div>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<PrivateRoute><Browse /></PrivateRoute>} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/swap" element={<SwapForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ⬇ Footer added globally */}
      <Footer />
    </Router>
  );
}

export default App;
