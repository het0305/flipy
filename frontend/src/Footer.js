import React, { useEffect } from 'react';
import './Footer.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <footer className="site-footer" data-aos="fade-up">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Created By</h4>
          <p>Het Patel</p>
          <p>Prashant Malaviya</p>
        </div>
        <div className="footer-section">
          <h4>Email Ids</h4>
          <p>hetpatell0305@gmail.com</p>
          <p>malaviyaprashant4050@gmail.com</p>
        </div>
        <div className="footer-section">
  <h4>Follow Us</h4>
  <div className="social-links">
    <a href="https://github.com/Prashant4050/practice" target="_blank" rel="noreferrer">
      <GitHubIcon className="social-icon" />
    </a>
    <a href="https://github.com/het0305/practice" target="_blank" rel="noreferrer">
      <GitHubIcon className="social-icon" />
    </a>
    <a href="https://www.instagram.com/prashant_malaviya_95?igsh=MXF2ODVxaWUzbjgyaw==" target="_blank" rel="noreferrer">
      <InstaIcon className="social-icon" />
    </a>
    <a href="https://www.instagram.com/hettt._03?igsh=dnFwYXN5dW1xcHJ2" target="_blank" rel="noreferrer">
      <InstaIcon className="social-icon" />
    </a>
  </div>
</div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Flipy. All rights reserved.</p>
      </div>
    </footer>
  );
};

// GitHub SVG icon
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000" viewBox="0 0 24 24"
    style={{ marginRight: '8px', verticalAlign: 'middle' }}>
    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.12 3.32 9.47 7.94 11.01.58.1.79-.25.79-.55v-1.93c-3.23.7-3.9-1.55-3.9-1.55-.53-1.35-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.2 1.8 1.2 1.05 1.79 2.76 1.27 3.44.97.1-.76.41-1.27.74-1.56-2.58-.29-5.29-1.29-5.29-5.74 0-1.27.46-2.3 1.2-3.11-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.19a11.2 11.2 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.21-1.5 3.2-1.19 3.2-1.19.64 1.65.24 2.87.12 3.17.75.81 1.2 1.84 1.2 3.11 0 4.46-2.71 5.44-5.29 5.73.42.37.8 1.1.8 2.22v3.29c0 .31.21.66.8.55 4.62-1.54 7.94-5.89 7.94-11.01C23.5 5.74 18.27.5 12 .5z" />
  </svg>
);

// Instagram SVG icon
const InstaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#C13584" viewBox="0 0 24 24"
    style={{ marginRight: '8px', verticalAlign: 'middle' }}>
    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm4.5 3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
  </svg>
);

export default Footer;
