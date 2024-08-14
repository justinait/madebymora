import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import HeroProjects from '../HeroProjects/HeroProjects';
import autoAnimate from '@formkit/auto-animate';

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
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.grid-item');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - (window.innerHeight * 0.3)) {
          el.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
    // autoplayRef.current = setInterval(() => {
    //   projects.forEach((_, index) => nextSlide(index));
    // }, 4000);
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

  // useEffect(() => {
  //   autoplayRef.current = setInterval(() => {
  //     projects.forEach((_, index) => nextSlide(index));
  //   }, 4000);

  //   return () => clearInterval(autoplayRef.current);
  // }, [projects]);

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
                    const isVideo = el.endsWith('.mp4');
                    const length = e.projectsImages.length
                    return (
                      <div key={index} ref={parentRef} className='carouselItemHome grid-item'>
                        <div className='carouselImageContainerHome'>
                          {isVideo ? (
                            <video className='imageCarouselHome' src={el} controls loading="lazy" />
                          ) : (
                            <img className='imageCarouselHome' src={el} loading="lazy" />
                          )}
                        </div>
                        <div className='infoCarouselHome'>
                          <p className='infoCarouselHomeBox'>YEAR / {e.year}</p>
                          <p className='infoCarouselHomeBox'> {index+1} / {length} </p>
                        </div>
                      </div>
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
