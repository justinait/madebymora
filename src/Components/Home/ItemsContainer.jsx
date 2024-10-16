import React, { useEffect, useRef, useState } from 'react'
import Items from './Items';

function ItemsContainer({ projects, selectedCategory }) {

    const parentRef = useRef(null);
    const autoplayRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState({});
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    useEffect(() => {
      parentRef.current && autoAnimate(parentRef.current);
    }, []);
  
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // Verificamos si el elemento está en el viewport
          if (entry.isIntersecting) {
            entry.target.classList.add('animated'); // Al hacer scroll down
            entry.target.style.opacity = 1; // Hacer visible el elemento
          } else {
            entry.target.style.opacity = 0; // Hacer invisible el elemento al hacer scroll up
          }
        });
      }, {
        rootMargin: '0px 0px -300px 0px', // Ajusta el margen inferior para que inicie a 1000px
      });
    
      const elements = document.querySelectorAll('.grid-item');
      elements.forEach((el) => observer.observe(el));
    
      return () => {
        elements.forEach((el) => observer.unobserve(el));
        observer.disconnect();
      };
        
    }, [projects]);


    useEffect(() => {
        setCurrentSlide({});
    }, [selectedCategory]);
    
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
    
    const numbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
    
    return (
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
    )
}

export default ItemsContainer