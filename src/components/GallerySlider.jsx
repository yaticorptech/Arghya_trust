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

  // Group images into sets of 3
  const imageSets = [];
  for (let i = 0; i < galleryImages.length; i += 3) {
    imageSets.push(galleryImages.slice(i, i + 3));
  }

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imageSets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, imageSets.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % imageSets.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + imageSets.length) % imageSets.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="relative min-h-screen pt-8 pb-28 overflow-hidden bg-white">
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1a365d] mb-6">
              GALLERY
            </h2>
          </motion.div>

          {/* Slider */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Image grid */}
            <div className="relative h-auto sm:h-[450px] md:h-[500px]">
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
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    gap-4 
                    h-auto
                  "
                >
                  {imageSets[currentSlide].map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      className="relative group h-[230px] sm:h-[250px] md:h-full"
                    >
                      <img
                        src={image.src}
                        alt={`Gallery ${index}`}
                        className="w-full h-full object-cover md:object-center rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:-left-6 top-1/2 transform -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 transition-all duration-300 hover:scale-110 shadow-lg z-10"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 sm:-right-6 top-1/2 transform -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 transition-all duration-300 hover:scale-110 shadow-lg z-10"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2 sm:space-x-3">
              {imageSets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-center mt-4 text-gray-600 text-sm sm:text-base font-medium">
              {currentSlide + 1} / {imageSets.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;
