import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import './HeroProjects.css'
import Contact from '../Contact/Contact';

function HeroProjects({ onCategoryChange }) {
    
  const [projects, setProjects] = useState([])
  const [isBlurred, setIsBlurred] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = [     'All' , 'Graphic', 'Audiovisual', 'Photos', '3D']
  const containerRef = useRef(null);
  const extraProjects = [
    {   name: "CHOCOLATE EN RAMA", image: "/images/photography/photo1.jpg", detail2: "PHOTOGRAPHY"   },
    {   name: "REVOLUTION 909", image: "/images/photography/photo7.jpg", detail2: "PHOTOGRAPHY"       }
  ]
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const slides = document.querySelectorAll('.heroProjectSlide');
      if (slides.length > 0) {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % slides.length;
          updateSlideClasses(newIndex);
          return newIndex;
        });
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [projects.length]);

  const updateSlideClasses = (newIndex) => {
    const slides = document.querySelectorAll('.heroProjectSlide');
    slides.forEach((slide, index) => {
      slide.classList.remove('prev', 'next', 'active');
      if (index === newIndex) {
        slide.classList.add('active');
      } else if (index === (newIndex - 1 + slides.length) % slides.length) {
        slide.classList.add('prev');
      } else if (index === (newIndex + 1) % slides.length) {
        slide.classList.add('next');
      }
    });

    const container = containerRef.current;
    if (container) {
      const slideWidth = slides[0].clientWidth;
      container.style.transform = `translateX(-${slideWidth * newIndex}px)`;
    }
  };
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const container = document.querySelector('.projectsScrollable');
  //     const slides = document.querySelectorAll('.heroProjectSlide');
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  //     if (container && slides.length > 0) {
  //       const slideWidth = slides[0].clientWidth;
  //       const currentTransform = container.style.transform || 'translateX(0%)';
  //       const newTransform = currentTransform === 'translateX(0%)' ? `translateX(-${slideWidth}px)` : 'translateX(0%)';
  //       container.style.transform = newTransform;


  //       if (currentTransform === 'translateX(0%)') {
  //         newTransform = `translateX(-${slideWidth}px)`;
  //         newIndex = 1;
  //       } else {
  //         newTransform = 'translateX(0%)';
  //         newIndex = 0;
  //       }

  //       container.style.transform = newTransform;

  //       slides.forEach((slide, index) => {
  //         slide.classList.remove('prev', 'next', 'active');
  //         if (index === newIndex) {
  //           slide.classList.add('active');
  //         } else if (index === (newIndex - 1 + slides.length) % slides.length) {
  //           slide.classList.add('prev');
  //         } else if (index === (newIndex + 1) % slides.length) {
  //           slide.classList.add('next');
  //         }
  //       });
  //     }
  //   }, 3000); // Cambia la slide cada 3 segundos

  //   return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonte
  // }, [projects.length]);

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

  return (
    <div>
      
      <Contact isActive={isBlurred} onClose={handleClose} />

      <div className='titlesBoxHero'>
        <h1 className='titleMora'>madebymora ©projects</h1>
        <p className='subtitleMora'>Integral & Multidisciplinary Designer</p>
      </div>

      <div className='heroProjectsContainer'>
      <div className='projectsScrollable'>
        {projects
          .filter(e => e.name !== 'PHOTOGRAPHY')
          .filter((e) => selectedCategory === 'All' || (e.brand && e.brand.some(brand => brand === selectedCategory)))
          .map((project, index) => (
            <div 
              key={index} 
              className={`heroProjectSlide ${index === currentIndex ? 'active' : index === currentIndex - 1 ? 'prev' : index === currentIndex + 1 ? 'next' : ''}`}
              // className="heroProjectSlide"
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
        {extraProjects
          .filter(e => selectedCategory === 'All' || selectedCategory === 'Photos' || (e.brand && e.brand.some(brand => brand === selectedCategory)))
          .map((e, index)=> (
            <div key={index} className="heroProjectSlide">
              <div className="heroProjectInfo">
                <p>"{e.name}"</p>
                <p>{e.detail2}</p>
              </div>
              <div className="slider-fade-container">
                <img src={e.image} alt={e.name} className="heroProjectsImage" />
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