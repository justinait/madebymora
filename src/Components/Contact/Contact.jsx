import React from 'react'
import './Contact.css'

function Contact({ isActive, onClose }) {
  return (
    <div className='contactContainer'>
        <div 
            className={`blur-overlay ${isActive ? 'active' : ''}`} 
            onClick={onClose}
        />
        
        <div className="focusedElement">
            <h4>BUENOS AIRES, ARGENTINA</h4>
            <div  className='linksContact'>
                <div className='linksContactSocial'>
                    <a target='_blank' href='https://www.behance.net/moraramirez'>Behance</a>
                    <a target='_blank' href='https://www.linkedin.com/in/moraramirezamable/'  >LinkedIn</a>
                    <a target='_blank' href='https://www.instagram.com/madebymor4/' >Instagram</a>
                </div>
                
                <a target='_blank' href="mailto:moraramirezamable@gmail.com">moraramirezamable@gmail.com</a>
            </div>
        </div>
    </div>
  )
}

export default Contact