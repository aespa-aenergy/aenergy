import React, { useEffect, useRef } from "react";
import "./css/carouselBanner.css";
import Carousel1 from "../assets/carousel/Carousel1.png";
import Carousel2 from "../assets/carousel/Carousel2.png";
import Carousel3 from "../assets/carousel/Carousel3.png";
import Carousel4 from "../assets/carousel/Carousel4.png";

function CarouselBanner() {
  const slidesContainerRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    let index = 0;

    const slides =
      slidesContainerRef.current.querySelectorAll(".carousel_slide");
    const totalSlides = slides.length;

    const moveToPrevSlide = () => {
      index = index === 0 ? totalSlides - 1 : index - 1;
      updateSlidePosition();
    };

    const moveToNextSlide = () => {
      index = index === totalSlides - 1 ? 0 : index + 1;
      updateSlidePosition();
    };

    const updateSlidePosition = () => {
      slides.forEach((slide) => {
        slide.style.transform = `translateX(-${index * 100}%)`;
      });
    };

    prevButtonRef.current.addEventListener("click", moveToPrevSlide);
    nextButtonRef.current.addEventListener("click", moveToNextSlide);

    return () => {
      prevButtonRef.current.removeEventListener("click", moveToPrevSlide);
      nextButtonRef.current.removeEventListener("click", moveToNextSlide);
    };
  }, []);

  return (
    <div className="carousel_slider">
      <div className="carousel_slides-container" ref={slidesContainerRef}>
        <div className="carousel_slide">
          <img src={Carousel1} alt="Slide 1" className="carousel_image" />
        </div>
        <div className="carousel_slide">
          <img src={Carousel2} alt="Slide 2" className="carousel_image" />
        </div>
        <div className="carousel_slide">
          <img src={Carousel3} alt="Slide 3" className="carousel_image" />
        </div>
        <div className="carousel_slide">
          <img src={Carousel4} alt="Slide 4" className="carousel_image" />
        </div>
      </div>
      <button className="slide-arrow prev" ref={prevButtonRef}>
        &#10094;
      </button>
      <button className="slide-arrow next" ref={nextButtonRef}>
        &#10095;
      </button>
    </div>
  );
}

export default CarouselBanner;
