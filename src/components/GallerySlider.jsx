import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GallerySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const galleryImages = [
    { src: "https://i.ibb.co/3yhrZ6xJ/1-OUR-SOURCE-OF-INSPIRATION-SWAMI-VIVEKANADA.jpg" },
    { src: "https://i.ibb.co/gbtzRYYm/2-CLEANLINESS-IS-NEXT-TO-GODLINESS.jpg" },
    { src: "https://i.ibb.co/FbPdHjmf/3-SUSTAINABILITY-CIRCLES-Eco-awareness-and-Waste-Management-Training.jpg" },
    { src: "https://i.ibb.co/sv3FPTyc/4-SWACCH-MANAS-After-school-program-on-life-skills-cleanliness-civic-awareness.jpg" },
    { src: "https://i.ibb.co/dwPqMh7z/2O.jpg" },
    { src: "https://i.ibb.co/H0Xg023/1O.jpg" },
  ];

  // Group images into sets of 3 for desktop, 1 for mobile
  const imageSets = [];
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  
  if (isMobile) {
    // For mobile: one image per slide
    galleryImages.forEach(image => {
      imageSets.push([image]);
    });
  } else {
    // For tablet/desktop: three images per slide
    for (let i = 0; i < galleryImages.length; i += 3) {
      imageSets.push(galleryImages.slice(i, i + 3));
    }
  }

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageSets.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, imageSets.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imageSets.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + imageSets.length) % imageSets.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="activities" className="relative min-h-screen pt-16 pb-20 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <img
          src="https://i.ibb.co/PZZx6jPw/back.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header with more spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1a365d] mb-8">
              GALLERY
            </h2>
            <div className="w-24 h-1 bg-[#1a365d] mx-auto rounded-full"></div>
          </motion.div>

          {/* Slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Image grid - Responsive layout */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="
                    grid 
                    grid-cols-1 
                    md:grid-cols-3 
                    gap-4 
                    sm:gap-6 
                    h-full
                    px-2
                    sm:px-0
                  "
                >
                  {imageSets[currentSlide].map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      className="
                        relative 
                        group 
                        h-[280px] 
                        sm:h-[350px] 
                        md:h-full
                        w-full
                        overflow-hidden
                      "
                    >
                      <img
                        src={image.src}
                        alt={`Gallery ${index}`}
                        className="
                          w-full 
                          h-full 
                          object-cover 
                          rounded-2xl 
                          shadow-xl 
                          transform 
                          group-hover:scale-105 
                          transition-transform 
                          duration-500
                          min-w-0
                        "
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows - Better mobile positioning */}
              <button
                onClick={prevSlide}
                className="
                  absolute 
                  left-2 
                  sm:left-4 
                  md:-left-6 
                  top-1/2 
                  transform 
                  -translate-y-1/2 
                  w-10 
                  h-10 
                  sm:w-12 
                  sm:h-12 
                  bg-white/90 
                  hover:bg-white 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  text-gray-800 
                  transition-all 
                  duration-300 
                  hover:scale-110 
                  shadow-lg 
                  z-10
                  border
                  border-gray-200
                "
                aria-label="Previous slide"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="
                  absolute 
                  right-2 
                  sm:right-4 
                  md:-right-6 
                  top-1/2 
                  transform 
                  -translate-y-1/2 
                  w-10 
                  h-10 
                  sm:w-12 
                  sm:h-12 
                  bg-white/90 
                  hover:bg-white 
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  text-gray-800 
                  transition-all 
                  duration-300 
                  hover:scale-110 
                  shadow-lg 
                  z-10
                  border
                  border-gray-200
                "
                aria-label="Next slide"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Dots - Better spacing */}
            <div className="flex justify-center mt-8 sm:mt-10 space-x-3 sm:space-x-4">
              {imageSets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    transition-all 
                    duration-300 
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:ring-offset-2
                    ${
                      index === currentSlide
                        ? "bg-blue-600 w-8 h-3"
                        : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                    }
                  `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter - Better styling */}
            <div className="text-center mt-4 text-gray-700 text-sm sm:text-base font-medium bg-white/80 rounded-full py-2 px-4 inline-block">
              <span className="font-bold text-blue-600">{currentSlide + 1}</span>
              <span className="text-gray-500"> / {imageSets.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;