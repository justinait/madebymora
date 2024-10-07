import React from 'react'
import hero from '/src/assets/images/hero.jpg'
import './Hero.css'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='heroContainer'>
      <img src={hero} className='imageHero' alt="" />
      
      <div className='heroTextContainer'>
        <Link className='titleHero' to='/home'>madebymora ©projects</Link>
        <p className='subtitleHero'>Integral & Multidisciplinary Designer. <br />Based in Buenos Aires.</p>
      </div>

    </div>
  )
}

export default Hero