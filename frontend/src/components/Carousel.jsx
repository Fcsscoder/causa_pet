import { useState, useEffect } from "react";
import Pets from "../assets/imgs/carousel/pets1.jpg";
import Pets1 from "../assets/imgs/carousel/pets2.jpg";
import Pets2 from "../assets/imgs/carousel/pets3.jpg";

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  const images = [Pets, Pets1, Pets2];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSlide]);

  const goToSlide = (slideIndex) => {
    setActiveSlide(slideIndex);
  };

  const goToNextSlide = () => {
    const newIndex = activeSlide === totalSlides - 1 ? 0 : activeSlide + 1;
    setActiveSlide(newIndex);
  };

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide">
      <div className="relative h-50 overflow-hidden sm:h-70 md:h-96 lg:h-110">
        {/* Animation container */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
          }}>
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img
                src={image}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Carousel item ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicator dots */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            type="button"
            className={`hidden sm:flex sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full cursor-pointer ${
              activeSlide === index ? "bg-white" : "bg-white/50"
            }`}
            aria-current={activeSlide === index ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
