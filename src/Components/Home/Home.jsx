import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import HeroProjects from '../HeroProjects/HeroProjects';
import Items from './Items';

function Home() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSlide, setCurrentSlide] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const autoplayRef = useRef(null);

  const parentRef = useRef(null);

  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, []);

  const debounce = (func, wait = 20) => {
    let timeout;
    return function (...args) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      rootMargin: '0px 0px -30% 0px',
    });
  
    const elements = document.querySelectorAll('.grid-item');
    if (elements.length === 0) {
      console.log('No se encontraron elementos .grid-item al momento de la observación');
    } else {
      console.log('Elementos observados:', elements);
      elements.forEach((el) => observer.observe(el));
    }
  
    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [projects]);
  
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((responseData) => {
        setProjects(responseData.projects.map(project => ({
          ...project,
          projectsImages: [...(project.images1 || []), ...(project.images2 || [])]
        })));
      });
  }, []);

  const handleDragStart = (e, projectIndex) => {
    setIsDragging(true);
    setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
    clearInterval(autoplayRef.current);
  };

  const handleDragMove = (e, projectIndex) => {
    if (!isDragging) return;
    
    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      moveCarousel(diff > 0 ? 1 : -1, projectIndex);
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const moveCarousel = (direction, projectIndex) => {
    setCurrentSlide((prev) => {
      const slides = projects[projectIndex]?.projectsImages || [];
      const totalSlides = slides.length;
      if (totalSlides <= 1) return prev;

      let newIndex = (prev[projectIndex] || 0) + direction;
      if (newIndex < 0) newIndex = totalSlides - 1;
      if (newIndex >= totalSlides) newIndex = 0;

      return { ...prev, [projectIndex]: newIndex };
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentSlide({});
  };

  const numbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];

  return (
    <div className={`homeContainer heroProjectsWrapper category-${selectedCategory.toLowerCase()}`}>
      
      <HeroProjects onCategoryChange={handleCategoryChange} />
      
      <div className='allProjectsBox'>
        {projects
          .filter((e) => selectedCategory === 'All' || (e.brand && e.brand.some(brand => brand === selectedCategory)))
          .map((e, i) => (
            <div key={i}>
              <div className='separatorLine'></div>
              <h2 className='projectTitle'> {numbers[i]}{e.name}</h2>
              <p className='projectDetail'>{e.detail}</p>
              <p className='projectDescription'>{e.description}</p>
              
              <div
                className='carouselContainerHome'
                onMouseDown={(event) => handleDragStart(event, i)}
                onMouseMove={(event) => handleDragMove(event, i)}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={(event) => handleDragStart(event, i)}
                onTouchMove={(event) => handleDragMove(event, i)}
                onTouchEnd={handleDragEnd}
              >
                <div className='carouselHome grid-container' style={{ transform: `translateX(-${(currentSlide[i] || 0) * 100}%)` }}>
                {e.projectsImages?.map((el, index) => {
                  console.log("Generando grid-item:", el); // Agrega este log
                  return (
                    <Items 
                      key={index}
                      el={el}
                      index={index}
                      length={e.projectsImages.length}
                      e={e} 
                    />
                  );
                })}
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
