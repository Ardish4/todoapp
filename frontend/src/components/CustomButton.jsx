import React from 'react';

const CustomButton = ({ children, onClick }) => {
  return (
    <button style={{ padding: '10px', margin: '5px', backgroundColor: '#61dafb' }} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;