import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(false);
    }, 5000); // Show for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-black/40 z-10" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="/assets/carousel/VID_20251203_000515_156_1770707269178.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="relative z-20 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h2 className="text-xl md:text-2xl font-light text-white/90 tracking-[0.2em] mb-4 uppercase">
                To My Dearest Husband
              </h2>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display text-white mb-6 drop-shadow-lg leading-tight"
            >
              Happy
              <span className="block text-pink-200 font-handwriting mt-2 md:mt-8 text-5xl sm:text-7xl md:text-9xl">
                Valentine's Day
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-white/80 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto italic px-4"
            >
              "You are my today and all of my tomorrows."
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/70"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
