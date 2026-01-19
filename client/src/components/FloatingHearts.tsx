import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Initial large batch for more coverage
    const initialHearts = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 25 + 15,
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 10,
    }));
    setHearts(initialHearts);

    // Keep adding hearts periodically to maintain density
    const interval = setInterval(() => {
      setHearts(current => {
        const newHeart = {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 25 + 15,
          delay: 0,
          duration: Math.random() * 15 + 10,
        };
        // Keep the heart count stable but dynamic
        return [...current.slice(-59), newHeart];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0 }}
            animate={{
              y: "-20vh",
              opacity: [0, 0.6, 0.6, 0],
              x: [`${heart.x}vw`, `${heart.x + (Math.random() * 20 - 10)}vw`],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute text-pink-400/40 drop-shadow-sm"
            style={{ 
              fontSize: heart.size,
              filter: "blur(0.5px)"
            }}
          >
            ♥
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
