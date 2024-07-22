import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './HeroProjects.css'

function HeroProjects({ onCategoryChange }) {
    
  const [projects, setProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = [     'All' , 'Graphic', 'Audiovisual', 'UX&UI', 'Photos', '3D']
  
  useEffect(() => {
    fetch('/data.json')
    .then((response) => response.json())
    .then((responseData) => {
      const shuffledProjects = responseData.projects.sort(() => Math.random() - 0.5);
      setProjects(shuffledProjects);
    });
  }, []);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  }
  const projectCounts = projects.reduce((acc, project) => {
    project.brand.forEach(brand => {
      if (!acc[brand]) {
        acc[brand] = 0;
      }
      acc['All'] = (acc['All'] || 0) + 1;
      acc[brand]++;
    });
    return acc;
  }, {});
  const toSuperscript = (num) => {
    const superscriptMap = {
      0: '⁰',
      1: '¹',
      2: '²',
      3: '³',
      4: '⁴',
      5: '⁵',
      6: '⁶',
      7: '⁷',
      8: '⁸',
      9: '⁹'
    };
    return num.toString().split('').map(digit => superscriptMap[digit]).join('');
  };

  return (
    <div>
        
      <div className='titlesBoxHero'>
        <h1 className='titleMora'>madebymora ©projects</h1>
        <p className='subtitleMora'>Integral & Multidisciplinary Designer</p>
      </div>
      <div className='heroProjectsContainer'>

        <div className='heroProjectsBox'>
          {
          projects
          .filter((e) => selectedCategory === 'All' || (e.brand && e.brand.some(brand => brand === selectedCategory)))
          .map((e, index)=> {
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
        <div className='categoryBox' >
          {categories
          .map((e, i) => (
            <p
              key={i}
              className={`categoryItem ${selectedCategory === e ? 'categoryItemActive' : ''}`}
              onClick={() => handleCategoryClick(e)}
            >
              {e} {projectCounts[e] ? toSuperscript(projectCounts[e]) : ''}   
            </p>
            
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroProjects