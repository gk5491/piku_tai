import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-pink-50/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-display text-primary mb-12">A Letter For You</h2>

        <div className="relative h-[500px] flex items-center justify-center">
          <AnimatePresence>
            {!isOpen ? (
              <motion.div
                key="envelope"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0, rotate: -5 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer bg-white w-full max-w-md aspect-[4/3] shadow-2xl rounded-lg flex flex-col items-center justify-center border-2 border-primary/10 relative overflow-hidden group"
              >
                {/* Envelope Flap Look */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-pink-100 origin-top transform group-hover:scale-y-90 transition-transform duration-300 z-10 clip-path-triangle" />
                
                <div className="z-20 flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Heart className="w-10 h-10 text-primary fill-primary/20 animate-pulse" />
                  </div>
                  <p className="text-2xl font-handwriting text-primary/80">Tap to open my heart</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                className="bg-[#fff9f0] p-8 md:p-12 shadow-2xl max-w-2xl w-full rounded-sm relative"
                style={{
                  backgroundImage: "radial-gradient(#dbcabb 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              >
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  ✕
                </button>
                
                <div className="font-handwriting text-3xl md:text-4xl text-primary mb-6 text-left">My Dearest Love,</div>
                
                <div className="font-display text-lg md:text-xl leading-relaxed text-gray-700 text-left space-y-4">
                  <p>
                    As I sit here thinking about us, I realize how incredibly lucky I am to share my life with you. 
                    You are my rock, my safe place, and my greatest joy.
                  </p>
                  <p>
                    Every day with you is a gift I never want to take for granted. Thank you for your patience, 
                    your kindness, and for loving me exactly as I am.
                  </p>
                  <p>
                    Happy Valentine's Day to the man who holds my heart forever.
                  </p>
                </div>

                <div className="font-handwriting text-3xl md:text-4xl text-primary mt-8 text-right">
                  Forever Yours,<br />
                  <span className="text-2xl">Wifey</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
