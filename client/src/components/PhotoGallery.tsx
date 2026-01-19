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
        
        <div className="relative flex justify-center items-center h-[500px] md:h-[600px]">
          {/* Heart Frame Decoration */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute z-0 text-primary/10"
          >
            <Heart size={600} fill="currentColor" className="hidden md:block" />
            <Heart size={400} fill="currentColor" className="md:hidden" />
          </motion.div>

          {/* Masked Image Content */}
          <div className="relative z-10 w-full max-w-[400px] md:max-w-[500px] aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-full h-full relative"
                style={{
                  clipPath: "path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z')",
                  transform: "scale(20)" // Scale the path to fit the container
                }}
              >
                {/* Fallback for Safari/browsers with issues with direct path scaling */}
                <div 
                  className="w-full h-full bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                  style={{ 
                    clipPath: "url(#heart-clip)",
                    backgroundImage: `url(${photos[currentIndex].url})`
                  }}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* SVG Filter for clean heart clipping */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
                  <path d="M0.5,0.925 L0.435,0.866 C0.203,0.655 0.05,0.519 0.05,0.354 C0.05,0.22 C0.155,0.115 0.29,0.115 0.36,0.171 C0.408,0.208 0.46,0.264 0.5,0.32 C0.54,0.264 0.592,0.208 0.64,0.171 C0.71,0.115 0.845,0.115 0.95,0.22 C0.95,0.354 0.797,0.655 0.565,0.866 L0.5,0.925 Z" />
                </clipPath>
              </defs>
            </svg>

            {/* Caption Overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`caption-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute -bottom-16 left-0 right-0 text-center"
              >
                <p className="text-gray-800 font-handwriting text-3xl md:text-4xl drop-shadow-sm">
                  {photos[currentIndex].caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="flex justify-center gap-2 mt-24">
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
