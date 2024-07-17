import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  
  const [projects, setProjects] = useState([])

  useEffect(() => {
      
    fetch('/data.json')
    .then((response) => response.json())
    .then((responseData) => {
        
      setProjects(responseData.projects);
  
    });
  }, []);
  return (
    <div>
      <p>About</p>

      <div>
        <h1 className='titleMora'>madebymora ©projects</h1>
        <p className='subtitleMora'>Integral & Multidisciplinary Designer</p>
      </div>

      <div className='categoryBox'>
        <p className='categoryItem'>All</p>
        <p className='categoryItem'>Graphic</p>
        <p className='categoryItem'>Audiovisual</p>
        <p className='categoryItem'>UX&UI</p>
        <p className='categoryItem'>3D</p>
      </div>

      <div className='allProjectsBox'>
        {
        projects.map(e=> {
          return (
            <div>
              <p className='projectTitle'>{e.name}</p>
              <p className='projectDetail'>{e.detail}</p>
              <p className='projectDescription'>{e.description}</p>
              
            </div>  
          )
        })
        }
      </div>
    </div>
  )
}

export default Home