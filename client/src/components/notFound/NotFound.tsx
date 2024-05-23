// NotFound.tsx
import React from 'react';
import './NotFound.scss'
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className='NotFound-container' style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 className='NotFound-status-code'>404 - Page Not Found</h1>
      <p className='NotFound-message'>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
       <p  className='NotFound-message'>Go back to <span className='NotFound-home'>Home</span></p> 
        </Link>
    </div>
  );
};

export default NotFound;
