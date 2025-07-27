import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/signin');
  };

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
