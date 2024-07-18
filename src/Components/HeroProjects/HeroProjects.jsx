import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './HeroProjects.css'

function HeroProjects() {
    
    const [projects, setProjects] = useState([])

    useEffect(() => {
        
      fetch('/data.json')
      .then((response) => response.json())
      .then((responseData) => {
        setProjects(responseData.projects);
      });
    }, []);
    const getClassName = (index) => {
        switch (index % 3) {
          case 0:
            return 'image-left';
          case 1:
            return 'image-right';
          case 2:
            return 'image-left-variant';
          default:
            return '';
        }
    };

    return (
    <div>
        

        <div className='titlesBoxHero'>
            <h1 className='titleMora'>madebymora ©projects</h1>
            <p className='subtitleMora'>Integral & Multidisciplinary Designer</p>
        </div>

        <div className='heroProjectsBox'>
            {
            projects.map((e, index)=> {
                return (
                    <div className={`image-wrapper ${getClassName(index)}`}>
                        <img src={e.image} alt={e.name} className='heroProjectsImage' />
                    </div>  
                )
            })
            }
        </div>

        <div>
            <Link to='about'>About</Link>

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