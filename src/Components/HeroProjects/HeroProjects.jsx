import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './HeroProjects.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Contact from '../Contact/Contact';

function HeroProjects({ onCategoryChange }) {
    
  const [projects, setProjects] = useState([])
  const [isBlurred, setIsBlurred] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = [     'All' , 'Graphic', 'Audiovisual', 'Photos', '3D']
  
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // centerPadding: '50px',
    centerMode: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 1300,
        settings: {
          centerPadding: '60px',
        }
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          // centerPadding: '40px',
        }
      }
    ]
  };
  return (
    <div>
      
      <Contact isActive={isBlurred} onClose={handleClose} />

      <div className='titlesBoxHero'>
        <h1 className='titleMora'>madebymora ©projects</h1>
        <p className='subtitleMora'>Integral & Multidisciplinary Designer</p>
      </div>

      <div className='heroProjectsContainer'>

        <Slider {...settings}>
          {projects
            .filter((e) => selectedCategory === 'All' || (e.brand && e.brand.some(brand => brand === selectedCategory)))
            .map((project, index) => (
              <div key={index} className="heroProjectSlide">
                <div className="heroProjectInfo">
                  <p>"{project.name}"</p>
                  <p>{project.detail2}</p>
                </div>
                <div className="slider-fade-container">
                  <img src={project.image} alt={project.name} className="heroProjectsImage" />
                </div>
              </div>
          ))}
        </Slider>
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