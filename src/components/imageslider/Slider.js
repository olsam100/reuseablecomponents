import React, { useState, useEffect } from 'react';
import arrowLeft from 'assets/images/back.svg';
import arrowRight from 'assets/images/next.svg';
import { sliderData } from './sliderData';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLength = sliderData.length;
  const autoScroll = true;

  let slideInterval;
  let intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className='slider'>
      <img src={arrowLeft} alt='' onClick={prevSlide} width={16} height={16} />

      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            className={index === currentSlide ? 'slide current' : 'slide'}
            key={index}
          >
            {index === currentSlide ? (
              <>
                <img
                  src={image}
                  alt='slide'
                  style={{ maxWidth: '100%', height: '100%' }}
                />
                <div className='content'>
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />

                  <a href='#product' className='--btn --btn-primary'>
                    Shop Now
                  </a>
                </div>
              </>
            ) : null}
          </div>
        );
      })}
      <img src={arrowRight} alt='' onClick={nextSlide} width={16} height={16} />
    </div>
  );
};

export default Slider;
