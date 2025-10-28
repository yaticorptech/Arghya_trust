import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bg from "../assets/images/back.jpg";

// Add your gallery images - replace these with your actual images
// import gallery1 from "../assets/images/1H.jpg";
// import gallery2 from "../assets/images/2H.jpg";
// import gallery3 from "../assets/images/3H.JPG";
// import gallery4 from "../assets/images/4H.JPG";
// import gallery5 from "../assets/images/1O.jpg";
// import gallery6 from "../assets/images/3O.JPG";

const GallerySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const galleryImages = [
    { src: "https://i.ibb.co/cSBjJZyK/1H.jpg" },
    { src: "https://i.ibb.co/XxXWCMjJ/2H.jpg" },
    { src: "https://i.ibb.co/cXtt8qWf/4H.jpg" },
    { src: "https://i.ibb.co/v65mT2RX/3H.jpg" },
    { src: "https://i.ibb.co/cSBjJZyK/1H.jpg" },
    { src: "https://i.ibb.co/cXtt8qWf/4H.jpg" },
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
        <section className="relative min-h-screen pt-2 pb-12 overflow-hidden">

      {/* Same background image as App.js */}
      <div className="fixed inset-0 -z-20">
        <img
          src={bg}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#1a365d] mb-6">
              GALLERY
            </h2>
          </motion.div>

          {/* Main Slider Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Simple 3-Grid Layout */}
            <div className="relative h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="grid grid-cols-3 gap-6 h-full"
                >
                  {/* Left Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="relative group h-full"
                  >
                    <img
                      src={imageSets[currentSlide][0]?.src}
                      alt="Gallery left"
                      className="w-full h-full object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
                  </motion.div>

                  {/* Center Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative group h-full"
                  >
                    <img
                      src={imageSets[currentSlide][1]?.src}
                      alt="Gallery center"
                      className="w-full h-full object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
                  </motion.div>

                  {/* Right Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative group h-full"
                  >
                    <img
                      src={imageSets[currentSlide][2]?.src}
                      alt="Gallery right"
                      className="w-full h-full object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl" />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 transition-all duration-300 hover:scale-110 shadow-xl z-10"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 transition-all duration-300 hover:scale-110 shadow-xl z-10"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Simple Dot Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {imageSets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Simple Slide Counter */}
            <div className="text-center mt-4">
              <span className="text-gray-600 font-medium">
                {currentSlide + 1} / {imageSets.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;