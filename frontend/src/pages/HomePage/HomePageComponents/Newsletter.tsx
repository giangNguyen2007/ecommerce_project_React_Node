import { SendOutlined } from '@material-ui/icons'
import './Newsletter.css';
import React from 'react'

const Newsletter = () => {
  return (
    <div className='newsletter-container'>
        <h1>Newsletter</h1>
        <p> Get timely update from your favourite product</p>
        <div className="input-container">
            <input type="text" placeholder='Your email'/>
            <div className='button'>
                <SendOutlined />
            </div>
        </div>
         
    </div>
  )
}

export default Newsletter