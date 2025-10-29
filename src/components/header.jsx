import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  const sliderImages = [
    "https://i.ibb.co/cSBjJZyK/1H.jpg",
    "https://i.ibb.co/XxXWCMjJ/2H.jpg",
    "https://i.ibb.co/cXtt8qWf/4H.jpg",
    "https://i.ibb.co/v65mT2RX/3H.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About Us", hasDropdown: true },
    { id: "activities", label: "Activities" },
    { id: "SHATACHANDI MAHA YAGA", label: "Shatachandi Maha Yaga" },
    { id: "join", label: "Join Us" },
    { id: "contactus", label: "Contact Us" },
  ];

  const handleAboutClick = (e, item) => {
    if (item.hasDropdown) {
      e.preventDefault();
      setIsAboutDropdownOpen(!isAboutDropdownOpen);
    } else {
      setIsAboutDropdownOpen(false);
    }
  };

  const handleDropdownItemClick = (sectionId) => {
    setIsAboutDropdownOpen(false);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHeaderVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#DBDBDB] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            : "bg-gradient-to-b from-[#2a1810]/80 via-[#1a365d]/60 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 group relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-23 h-20">
              <img
                src="https://i.ibb.co/fzGj1HXS/logo3s.jpg"
                alt="Arghya Logo"
                className="w-full h-full object-contain transition-transform duration-800 group-hover:scale-105"
              />
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 items-center">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <motion.button
                      onClick={(e) => handleAboutClick(e, item)}
                      whileHover={{ y: -2 }}
                      className={`relative px-5 py-2.5 font-medium text-sm tracking-wider transition-all duration-300 rounded-full group ${
                        scrolled
                          ? "text-[#1a365d] hover:text-[#dc2626]"
                          : "text-white/90 hover:text-[#f5deb3]"
                      }`}
                    >
                      {item.label}
                      <motion.span
                        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          scrolled
                            ? "bg-gradient-to-r from-[#f5deb3]/20 to-[#d4af37]/20"
                            : "bg-white/10"
                        }`}
                        layoutId="navHover"
                      />
                      <motion.span
                        animate={{ rotate: isAboutDropdownOpen ? 180 : 0 }}
                        className="ml-2 inline-block transition-transform"
                      >
                        ▼
                      </motion.span>
                    </motion.button>

                    <AnimatePresence>
                      {isAboutDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                        >
                          <div className="p-2">
                            <button
                              onClick={() => handleDropdownItemClick("about-us")}
                              className="w-full text-left px-4 py-3 text-[#1a365d] hover:bg-[#f5deb3]/20 rounded-lg transition-colors duration-300 font-medium"
                            >
                              About Us
                            </button>
                            <button
                              onClick={() => handleDropdownItemClick("founder")}
                              className="w-full text-left px-4 py-3 text-[#1a365d] hover:bg-[#f5deb3]/20 rounded-lg transition-colors duration-300 font-medium"
                            >
                              Sri Ranjan Bellarpady
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.a
                    href={`#${item.id}`}
                    whileHover={{ y: -2 }}
                    onClick={() => {
                      setIsAboutDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className={`relative px-5 py-2.5 font-medium text-sm tracking-wider transition-all duration-300 rounded-full group ${
                      scrolled
                        ? "text-[#1a365d] hover:text-[#dc2626]"
                        : "text-white/90 hover:text-[#f5deb3]"
                    }`}
                  >
                    {item.label}
                    <motion.span
                      className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        scrolled
                          ? "bg-gradient-to-r from-[#f5deb3]/20 to-[#d4af37]/20"
                          : "bg-white/10"
                      }`}
                      layoutId="navHover"
                    />
                  </motion.a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? "bg-[#1a365d]" : "bg-white"
                } ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? "bg-[#1a365d]" : "bg-white"
                } ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? "bg-[#1a365d]" : "bg-white"
                } ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#f5deb3]/30"
            >
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={(e) => handleAboutClick(e, item)}
                        className="flex items-center justify-between w-full px-6 py-4 text-[#1a365d] hover:bg-[#f5deb3]/20 transition-colors border-b border-[#f5deb3]/20"
                      >
                        <span className="font-medium">{item.label}</span>
                        <motion.span
                          animate={{ rotate: isAboutDropdownOpen ? 180 : 0 }}
                          className="transition-transform"
                        >
                          ▼
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {isAboutDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white/80"
                          >
                            <button
                              onClick={() => handleDropdownItemClick("about-us")}
                              className="w-full text-left px-10 py-3 text-[#1a365d] hover:bg-[#f5deb3]/20 transition-colors border-b border-[#f5deb3]/20"
                            >
                              About Us
                            </button>
                            <button
                              onClick={() => handleDropdownItemClick("founder")}
                              className="w-full text-left px-10 py-3 text-[#1a365d] hover:bg-[#f5deb3]/20 transition-colors border-b border-[#f5deb3]/20"
                            >
                              Sri Ranjan Bellarpady
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.a
                      href={`#${item.id}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex items-center gap-3 px-6 py-4 text-[#1a365d] hover:bg-[#f5deb3]/20 transition-colors border-b border-[#f5deb3]/20 last:border-0"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsAboutDropdownOpen(false);
                      }}
                    >
                      <span className="font-medium">{item.label}</span>
                    </motion.a>
                  )}
                </div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0">
          {sliderImages.map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.05,
              }}
              transition={{ duration: 2 }}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className={`w-full h-full object-cover md:object-center
                  ${index === 0 ? "object-[center_25%]" : ""}
                  ${index === 1 ? "object-[center_35%]" : ""}`}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a365d]/70 via-[#2d5a4d]/50 to-[#000000]/60"></div>
            </motion.div>
          ))}
        </div>

        {/* Hero Text Slides */}
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div
              key="slide1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className="absolute left-8 md:left-16 top-40 md:top-48 text-white z-30"
            >
              <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg tracking-wide mb-2">
                OUR SOURCE OF INSPIRATION
              </h2>
              <p className="text-base md:text-xl text-[#e5e5e5]/90 italic font-light leading-relaxed max-w-xl border-l-4 border-[#9ad1b6] pl-4">
                SWAMI VIVEKANANDA
              </p>
            </motion.div>
          )}

          {currentSlide === 1 && (
            <motion.div
              key="slide2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className="absolute left-8 md:left-16 top-44 md:top-56 text-white z-30"
            >
              <h2 className="text-2xl md:text-4xl font-bold drop-shadow-lg tracking-wide mb-2 leading-tight">
                CLEANLINESS IS NEXT TO <br /> GODLINESS
              </h2>
            </motion.div>
          )}

          {currentSlide === 2 && (
            <motion.div
              key="slide3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className="absolute left-8 md:left-16 top-44 md:top-52 text-white z-30"
            >
              <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg tracking-wide mb-2">
                SWACCH MANAS
              </h2>
              <p className="text-base md:text-xl text-[#e5e5e5]/90 italic font-light leading-relaxed max-w-xl border-l-4 border-[#9ad1b6] pl-4">
                After-school program on life skills, cleanliness & civic awareness.
              </p>
            </motion.div>
          )}

          {currentSlide === 3 && (
            <motion.div
              key="slide4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className="absolute left-8 md:left-16 top-52 md:top-60 text-white z-30"
            >
              <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg tracking-wide mb-2">
                SUSTAINABILITY CIRCLES
              </h2>
              <p className="text-base md:text-xl text-[#e5e5e5]/90 italic font-light leading-relaxed max-w-xl border-l-4 border-[#9ad1b6] pl-4">
                Eco-awareness and Waste Management Training.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slider Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-40">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full border-2 border-white/80 bg-transparent cursor-pointer transition-all duration-300 ease-in-out ${
                index === currentSlide
                  ? "bg-white scale-125 border-[#2d5a4d] shadow-[0_0_12px_#2d5a4d]"
                  : "hover:bg-[#f5f5dc] hover:border-[#f5f5dc] hover:scale-110"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
