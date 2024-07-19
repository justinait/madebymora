import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './HeroProjects.css'

function HeroProjects() {
    
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((responseData) => {
        const shuffledProjects = responseData.projects.sort(() => Math.random() - 0.5);
        setProjects(shuffledProjects);
      });
  }, []);

  return (
    <div>
        
      <div className='titlesBoxHero'>
        <h1 className='titleMora'>madebymora ©projects</h1>
        <p className='subtitleMora'>Integral & Multidisciplinary Designer</p>
      </div>
      <div className='heroProjectsContainer'>

        <div className='heroProjectsBox'>
          {
          projects.map((e, index)=> {
            return (
              <div
              key={index}
              className="image-wrapper"
              style={{
                '--x': `${Math.random() * 90 }%`,
                '--y': `${Math.random() * 90 }%`,
                '--scale': 0.6 + Math.random() * 0.3,
                '--index': index,
              }}
            >
              <img src={e.image} alt={e.name} className="heroProjectsImage" />
            </div>
            )
          })
          }
        </div>
      </div>

      <div className='optionsHeroProjects'>
        <Link to='/about' className='aboutLink' >About</Link>

        <div className='categoryBox'>
          <p className='categoryItem'>All</p>
          <p className='categoryItem'>Graphic</p>
          <p className='categoryItem'>Audiovisual</p>
          <p className='categoryItem'>UX&UI</p>
          <p className='categoryItem'>3D</p>
        </div>
      </div>
    </div>
  )
}

export default HeroProjects