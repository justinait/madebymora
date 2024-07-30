import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './HeroProjects.css'
import Contact from '../Contact/Contact';

function HeroProjects({ onCategoryChange }) {
    
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isBlurred, setIsBlurred] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const categories = [     'All' , 'Graphic', 'Audiovisual', '3D', 'Photos']
  const containerRef = useRef(null);
  const extraProjects = [
    {   name: "CHOCOLATE EN RAMA", image: "/images/photography/photo1.jpg", detail2: "PHOTOGRAPHY", brand:["Photos"]   },
    {   name: "REVOLUTION 909", image: "/images/photography/photo7.jpg", detail2: "PHOTOGRAPHY", brand:["Photos"]       }
  ]
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % filteredProjects.length);
    }, 3000);
  
    return () => clearInterval(interval);
  }, [filteredProjects.length]);
  
  useEffect(() => {
    const filtered = projects
      .filter(e => e.name !== 'PHOTOGRAPHY')
      .filter((e) => selectedCategory === 'All' || (e.brand && e.brand.some(brand => brand === selectedCategory)));
    const filteredExtra = extraProjects
      .filter(e => selectedCategory === 'All' || selectedCategory === 'Photos');
    setFilteredProjects([...filtered, ...filteredExtra]);
  }, [projects, selectedCategory]);

  const getItemStyle = (index) => {
    const diff = (index - activeIndex + filteredProjects.length) % filteredProjects.length;
    let translateX = 0;
    let scale = 0.7;
    let height = '40vh';
    let zIndex = 0;
    let marginBottom = '30%'

    if (diff === 0) {
      scale = 1;
      zIndex = 2;
      height = '60vh';
      marginBottom = '0%'
    } else if (diff === 1 || diff === projects.length - 1) {
      translateX = diff === 1 ? 100 : -100;
      zIndex = 1;
    } else {
      translateX = diff === 2 ? 200 : -200;
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      height,
      marginBottom,
      transition: 'all 0.5s ease',
    };
  };

  const handleMouseDown = (e) => {
    const startX = e.pageX;
    const handleMouseMove = (e) => {
      const diff = startX - e.pageX;
      if (Math.abs(diff) > 50) {
        setActiveIndex((current) => 
          (current + (diff > 0 ? 1 : -1) + filteredProjects.length) % filteredProjects.length
        );
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
  };
  
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = startX - currentX;
  
    if (Math.abs(diff) > 50) {
      moveCarousel(diff > 0 ? 1 : -1);
      setIsDragging(false);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const moveCarousel = (direction) => {
    setActiveIndex((current) => 
      (current + direction + filteredProjects.length) % filteredProjects.length
    );
  };


  useEffect(() => {
    fetch('/data.json')
    .then((response) => response.json())
    .then((responseData) => {
      const shuffledProjects = responseData.projects.sort(() => Math.random() - 0.5);
      const allProjects = [...shuffledProjects, ...extraProjects];
      setProjects(allProjects);
    });
  }, []);
  
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  }

  const projectCounts = projects.reduce((acc, project) => {
    if (project.brand) {
      project.brand.forEach(brand => {
        if (!acc[brand]) {
          acc[brand] = 0;
        }
        acc[brand]++;
      });
    } else if (project.detail2 === "PHOTOGRAPHY") {
      if (!acc["Photos"]) {
        acc["Photos"] = 0;
      }
      acc["Photos"]++;
    }
    acc['All'] = (acc['All'] || 0) + 1;
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
      9: '⁹', 
      10: '¹⁰',
    };
    return num.toString().split('').map(digit => superscriptMap[digit]).join('');
  };

  
  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };
  const handleClose = (e) => {
    if (e.target.className.includes('blur-overlay')) {
      setIsBlurred(false);
    }
  };

  return (
    <div>
      
      <Contact isActive={isBlurred} onClose={handleClose} />

      <div className='titlesBoxHero'>
        <h1 className='titleMora'>madebymora ©projects</h1>
        <p className='subtitleMora'>Integral & Multidisciplinary Designer</p>
      </div>

      <div className="carousel-container">
        <div
        className="carousel" 
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}>
          {filteredProjects
            .map((project, index) => (
              <div 
                key={index} 
                className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                style={getItemStyle(index)}
              >
                <div className="heroProjectInfo">
                  <p>"{project.name}"</p>
                  <p>{project.detail2}</p>
                </div>
                <div className="slider-fade-container">
                  <img src={project.image} alt={project.name} className="heroProjectsImage" />
                </div>
              </div>
          ))}
          
        </div>
    </div>


      <div className='optionsHeroProjects'>
        <div className='heroLinks'>
          <Link to='/about' className='aboutLink' >About</Link>
          <p className='aboutLink' onClick={toggleBlur}>Contact</p>
        </div>

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