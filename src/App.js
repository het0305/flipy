
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './login';
import HowItWorks from './HowItWorks';
import './App.css';
import SignUp from './SignUp'; 
import Browse from './Browse';
import Home from './Home'; 
import NotFound from './NotFound';



function App() {
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
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li> 

          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
