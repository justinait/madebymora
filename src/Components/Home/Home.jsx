import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import HeroProjects from '../HeroProjects/HeroProjects';

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
      < HeroProjects />
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