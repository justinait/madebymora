import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div>
        <p>
            These are some things that I have been developing during student and profesional career, 
            you can find from graphic design, 3d modeling to immersive audiovisual rooms.
        </p>

        <p>About</p>

        <div>
            <h1 className='titleMora'>madebymora</h1>
            <p className='subtitleMora'>Integral & Multidisciplinary Designer</p>
        </div>

        <div className='categoryBox'>
            <p className='categoryItem'>All</p>
            <p className='categoryItem'>Graphic</p>
            <p className='categoryItem'>Audiovisual</p>
            <p className='categoryItem'>UX&UI</p>
            <p className='categoryItem'>3D</p>
        </div>
    </div>
  )
}

export default Home