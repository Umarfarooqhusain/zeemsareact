import { useState, useEffect, useRef } from "react";

export default function ImageSlider() {
  const images = ["/assets/hero2.jpg", "/assets/hero1.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const intervalRef = useRef(null); // Use ref to store interval ID

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, 300);
    }, 2000);

    return () => clearInterval(intervalRef.current); // Clean up interval on unmount
  }, [images.length]);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current); // Pause the slider when hovering
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, 300);
    }, 5000); // Resume slider when mouse leaves
  };

  return (
    <div
      className="relative w-full overflow-hidden mt-6 md:mt-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={images[currentIndex]}
        alt="ImageSlider"
        className={`w-full h-auto transition-all duration-500 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
