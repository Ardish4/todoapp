import React from 'react';
import './loginsignup.css';

import user_icon from '../assets/person.png';
import gmail_icon from '../assets/gmail.jpeg';
import password_icon from '../assets/password.jpeg';
const loginsignup = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>sign up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} alt="" />
          <input type='text' />
        </div>
      </div>
       <div className='input'>
          <img src={gmail_icon} alt='' />
          <input type='gmail' />
        </div> 
        <div className='input'>
          <img src={password_icon} alt='' />
          <input type='password' />
        </div>
        <div className="forgot-password"> password vul geya? <spam>click here!!!!!s</spam></div>
        <div className="submit-cotainer">
          <div className="submit">signup</div>
          <div className="submit">login</div>
        </div>
    </div>
  );
};
