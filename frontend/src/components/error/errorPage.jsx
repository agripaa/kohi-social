import React from 'react'
import err from '../images/err.jpg';
import './errorPage.css';

const ErrorPage = () => {
  return (
    <>
      <div className="error">
          <div className="image-error">
              <img src={err} alt="human error" />
          </div>
          <div className="body-error">
            <h2>UPS!! SOMETHING WRONG</h2>
          </div>
      </div> 
    </>
  )
}

export default ErrorPage
