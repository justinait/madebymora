import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Items = React.memo(({ el, index, length, e }) => {
  const isVideo = el.endsWith('.mp4');  // Comprueba si es un video

  return (
    <div className="carouselItemHome grid-item">
      <div className="carouselImageContainerHome">
        {isVideo ? (
          <video className="imageCarouselHome" src={el} controls loading="lazy" />
        ) : (
          <LazyLoadImage className="imageCarouselHome" src={el} loading="lazy" alt={`carousel-item-${index}`} />
        )}
      </div>
      <div className="infoCarouselHome">
        <p className="infoCarouselHomeBox">YEAR / {e.year}</p>
        <p className="infoCarouselHomeBox">{index + 1} / {length}</p>
      </div>
    </div>
  );
});

export default Items;