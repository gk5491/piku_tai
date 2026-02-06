import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ValentineModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 100) - window.innerWidth / 2;
    const y = Math.random() * (window.innerHeight - 100) - window.innerHeight / 2;
    setNoButtonPos({ x, y });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
        >
          {/* Heart background elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500" />
          
          {!isAccepted ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block mb-6"
              >
                <Heart className="w-20 h-20 text-red-500 fill-red-500" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-display text-primary mb-6">
                Will you be my Valentine?
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  className="bg-red-500 hover:bg-red-600 text-white px-10 py-6 text-xl rounded-full shadow-lg hover-elevate transition-all"
                  onClick={() => setIsAccepted(true)}
                >
                  Yes! ❤
                </Button>
                
                <motion.div
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-10 py-6 text-xl rounded-full border-2 hover:bg-transparent"
                    onMouseEnter={moveNoButton}
                  >
                    No
                  </Button>
                </motion.div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-10"
            >
              <Heart className="w-24 h-24 text-red-500 fill-red-500 mx-auto mb-6 animate-bounce" />
              <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">
                Yay! I love you!
              </h2>
              <p className="text-xl text-gray-600 font-handwriting mb-8">
                You've made me the happiest person ever!
              </p>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8"
                onClick={() => setIsOpen(false)}
              >
                Enter our love nest
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
