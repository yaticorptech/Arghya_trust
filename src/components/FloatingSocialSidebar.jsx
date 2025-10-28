import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingSocialSidebar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
//noe 
  const socialLinks = [
    { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: 'https://wa.me/917448441972', color: '#25D366' },
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com/arghyatrust', color: '#1877F2' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com/arghyatrust', color: '#E1306C' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/company/arghyatrust', color: '#0A66C2' },
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://youtube.com/@arghyatrust', color: '#FF0000' },
  ];

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
      {socialLinks.map((social, index) => (
        <motion.div
          key={index}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, type: 'spring' }}
          className="relative"
          onMouseEnter={() => setHoveredIcon(index)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          {/* Tooltip Label */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: hoveredIcon === index ? 1 : 0, x: hoveredIcon === index ? 0 : 10 }}
            className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
          >
            <div className="px-3 py-1 rounded-lg shadow-lg bg-gray-800 text-white font-semibold text-sm">
              {social.name}
            </div>
          </motion.div>

          {/* Social Icon Button */}
          <motion.a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg text-white text-2xl relative overflow-hidden transition-all duration-300"
            style={{
              backgroundColor: social.color, // Always show actual brand color
              boxShadow:
                hoveredIcon === index
                  ? `0 0 20px ${social.color}80, 0 0 35px ${social.color}50`
                  : `0 4px 10px ${social.color}70`,
            }}
          >
            <i className={`${social.icon} relative z-10`} />
            {/* Glow pulse effect */}
            {hoveredIcon === index && (
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: `${social.color}50` }}
              />
            )}
          </motion.a>
        </motion.div>
      ))}

      {/* Decorative Line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-30 -z-10"
      />
    </div>
  );
};

export default FloatingSocialSidebar;
