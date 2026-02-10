import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const photos = [
  {
    id: 1,
    url: "/assets/carousel/IMG_20260210_085953_1770703536035.jpg",
    caption: "Every touch is magic",
  },
  {
    id: 2,
    url: "/assets/carousel/IMG_20260210_090022_1770703536036.jpg",
    caption: "Moments just for us",
  },
  {
    id: 3,
    url: "/assets/carousel/IMG_20260210_090147_1770703536039.jpg",
    caption: "Walking through life with you",
  },
  {
    id: 4,
    url: "/assets/carousel/IMG_20260210_090404_1770703536042.jpg",
    caption: "My forever date",
  },
  {
    id: 5,
    url: "/assets/carousel/IMG_20260210_095926_1770703536043.jpg",
    caption: "Your smile lights up my world",
  },
  {
    id: 6,
    url: "/assets/carousel/IMG_20260210_100013_1770703536044.jpg",
    caption: "Forever in love",
  },
  {
    id: 7,
    url: "/assets/carousel/IMG_20260210_104706_1770703536045.jpg",
    caption: "Pure happiness with you",
  },
  {
    id: 8,
    url: "/assets/carousel/IMG_20260210_104747_1770703536046.jpg",
    caption: "Our beautiful journey",
  },
  {
    id: 9,
    url: "/assets/carousel/IMG_20260210_104819_1770703536050.jpg",
    caption: "Treasured memories",
  },
  {
    id: 10,
    url: "/assets/carousel/IMG_20260210_104859_1770703536051.jpg",
    caption: "Love in every frame",
  },
  {
    id: 11,
    url: "/assets/carousel/IMG_20260210_104951_1770703536052.jpg",
    caption: "Soulmates forever",
  },
  {
    id: 12,
    url: "/assets/carousel/IMG_20260210_105204_1770703536054.jpg",
    caption: "Always and forever",
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

  const blobPath = "M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z";

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
          <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] group">
            {/* Animated SVG Blob Background */}
            <svg 
              viewBox="0 0 200 200" 
              className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="blobClip">
                  <path d={blobPath} transform="translate(100 100)" />
                </clipPath>
              </defs>

              <AnimatePresence mode="wait">
                <motion.image
                  key={currentIndex}
                  href={photos[currentIndex].url}
                  width="200"
                  height="200"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#blobClip)"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </AnimatePresence>

              <path
                id="textPathCurve"
                d={blobPath}
                transform="translate(100 100)"
                fill="none"
              />

              <text className="text-[6px] font-bold tracking-widest uppercase fill-primary/40 group-hover:fill-primary transition-colors duration-500">
                <textPath href="#textPathCurve" startOffset="0%">
                  ❤ MADE WITH LOVE ❤ MADE WITH LOVE ❤ MADE WITH LOVE ❤ MADE WITH LOVE
                  <animate attributeName="startOffset" from="0%" to="100%" dur="15s" repeatCount="indefinite" />
                </textPath>
                <textPath href="#textPathCurve" startOffset="100%">
                  ❤ MADE WITH LOVE ❤ MADE WITH LOVE ❤ MADE WITH LOVE ❤ MADE WITH LOVE
                  <animate attributeName="startOffset" from="-100%" to="0%" dur="15s" repeatCount="indefinite" />
                </textPath>
              </text>
            </svg>
          </div>

          {/* Caption */}
          <div className="h-20 mt-12">
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
