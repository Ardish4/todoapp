import React from 'react';

const sideBarStyle = {
  width: '200px',
  height: '100vh',
  backgroundColor: '#f4f4f4',
  padding: '15px',
  boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
};

const SideBar = () => {
  return (
    <aside style={sideBarStyle}>
      <h3>Dashboard Menu</h3>
      <ul>
        <li>Profile</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </aside>
  );
};

export default SideBar;