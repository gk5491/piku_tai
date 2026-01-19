import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=800",
    caption: "Every touch is magic",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
    caption: "Moments just for us",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=800",
    caption: "Walking through life with you",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
    caption: "My forever date",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?auto=format&fit=crop&q=80&w=800",
    caption: "Your smile lights up my world",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?auto=format&fit=crop&q=80&w=800",
    caption: "Forever in love",
  },
];

export function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 overflow-hidden relative bg-gradient-to-b from-white to-pink-50/50">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-4"
        >
          <Heart className="text-primary w-12 h-12" fill="currentColor" />
        </motion.div>
        <h2 className="text-5xl md:text-6xl font-display text-primary mb-4 drop-shadow-sm">Our Love Story</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full mb-12" />
        
        <div className="relative flex flex-col justify-center items-center">
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
            {/* Heart Frame Decoration */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 z-0 text-primary/20 flex items-center justify-center"
            >
              <Heart size="100%" fill="currentColor" />
            </motion.div>

            {/* Masked Image Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="w-[85%] h-[85%] relative flex items-center justify-center"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center shadow-2xl border-4 border-white"
                    style={{ 
                      clipPath: "path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z')",
                      backgroundImage: `url(${photos[currentIndex].url})`,
                      // The path is defined on a 24x24 grid, so we need to scale it to fit the 100% container
                      // Instead of clip-path: path(), let's use a simpler SVG clipPath for better support and scaling
                      clipPath: "url(#heart-clip-path)"
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SVG Clip Path Definition */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <defs>
                <clipPath id="heart-clip-path" clipPathUnits="objectBoundingBox">
                  <path d="M0.5,0.88 L0.441,0.826 C0.23,0.635 0.091,0.509 0.091,0.355 C0.091,0.231 0.187,0.135 0.311,0.135 C0.381,0.135 0.449,0.168 0.493,0.22 C0.537,0.168 0.605,0.135 0.675,0.135 C0.799,0.135 0.895,0.231 0.895,0.355 C0.895,0.509 0.756,0.635 0.545,0.826 L0.486,0.88 L0.5,0.88 Z" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Caption */}
          <div className="h-20 mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`caption-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <p className="text-gray-800 font-handwriting text-3xl md:text-4xl drop-shadow-sm">
                  {photos[currentIndex].caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-primary w-8" : "bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
