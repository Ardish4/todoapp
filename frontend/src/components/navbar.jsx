import React from 'react';

const navBarStyle = {
  backgroundColor: '#333',
  color: 'white',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginLeft: '20px',
};

const NavBar = () => {
  return (
    <nav style={navBarStyle}>
      <span style={{ fontWeight: 'bold' }}>My App</span>
      <div>
        <a href="/login" style={linkStyle}>Login</a>
        <a href="/signup" style={linkStyle}>Sign Up</a>
      </div>
    </nav>
  );
};

export default NavBar;