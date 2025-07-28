import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Created By</h4>
          <p>Prashant Malaviya</p>
          <p>Het Patel</p>
        </div>
        <div className="footer-section">
          <h4>Email Ids</h4>
          <p> malaviyaprashant4050@gmail.com</p>
          <p> hetpatell0305@gmail.com</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us </h4>
          <a href="https://github.com/Prashant4050/practice" target="_blank" rel="noreferrer" >Prashant4050</a>
          <a href="https://github.com/het0305/practice" target="_blank" rel="noreferrer">hetpatel0305</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Flipy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
