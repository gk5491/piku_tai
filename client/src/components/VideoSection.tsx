import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-white/30 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">A Special Message</h2>
          <div className="h-1 w-24 bg-accent/50 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white group"
        >
          {/* Decorative Corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary z-20 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Video Placeholder/Display */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-couple-in-love-walking-in-the-park-40011-large.mp4"
              type="video/mp4"
            />
          </video>

          {/* Overlay with Heart Icon */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-white/20 backdrop-blur-md p-6 rounded-full border border-white/30"
            >
              <Play className="w-12 h-12 text-white fill-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-muted-foreground font-display italic text-xl"
        >
          "In your eyes, I found my home."
        </motion.p>
      </div>
    </section>
  );
}
