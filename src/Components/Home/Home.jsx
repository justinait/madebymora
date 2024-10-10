import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import HeroProjects from '../HeroProjects/HeroProjects';
import ItemsContainer from './ItemsContainer';

function Home() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
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


  return (
    <div className={`homeContainer heroProjectsWrapper category-${selectedCategory.toLowerCase()}`}>
      
      <HeroProjects onCategoryChange={handleCategoryChange} />
      
      <ItemsContainer projects={projects} selectedCategory={selectedCategory} />

    </div>
  );
}

export default Home;
