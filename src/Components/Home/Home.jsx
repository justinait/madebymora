import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import HeroProjects from '../HeroProjects/HeroProjects';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

function Home() {
  
  const [projects, setProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetch('/data.json')
    .then((response) => response.json())
    .then((responseData) => {
      setProjects(responseData.projects);
    });
  }, []);

  return (
    <div className='homeContainer'>
      < HeroProjects  onCategoryChange={handleCategoryChange}/>
      <div className='allProjectsBox'>
        {
        projects
        .filter((e) => selectedCategory === 'All' || (e.brand && e.brand.some(brand => brand === selectedCategory)))
        .map((e, i)=> {
          return (
            <div key={i}>
              <div className='separatorLine'></div>
              <h2 className='projectTitle'> <strong className='cantProjectCircle'>{i+1}</strong>  {e.name}</h2>
              <p className='projectDetail'>{e.detail}</p>
              <p className='projectDescription'>{e.description}</p>
              
              <div className='carouselContainer'>
              <Slider {...settings}>
                {e.images1?.map((el, index) => {
                  const isVideo = el.endsWith('.mp4');
                  return (
                    <div key={index} className='carouselImageContainer'>
                      {
                        isVideo ? (
                          <video className='imageCarousel' src={el} controls loading="lazy" />
                        ) : (
                          <img className='imageCarousel' src={el} loading="lazy" />
                        )
                      }
                    </div>
                  );
                })}
                {e.images2?.map((el, index) => {
                  const isVideo = el.endsWith('.mp4');
                  return (
                    <div key={index} className='carouselImageContainer'>
                      {
                        isVideo ? (
                          <video className='imageCarousel' src={el} controls loading="lazy" />
                        ) : (
                          <img className='imageCarousel' src={el} loading="lazy" />
                        )
                      }
                    </div>
                  );
                })}
              </Slider>
              </div>

            </div>  
          )
        })
        }
      </div>
    </div>
  )
}

export default Home