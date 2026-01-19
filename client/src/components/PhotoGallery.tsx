import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=800",
    caption: "Every touch is magic",
    rotate: -2,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
    caption: "Moments just for us",
    rotate: 3,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=800",
    caption: "Walking through life with you",
    rotate: -4,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
    caption: "My forever date",
    rotate: 2,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?auto=format&fit=crop&q=80&w=800",
    caption: "Your smile lights up my world",
    rotate: -3,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?auto=format&fit=crop&q=80&w=800",
    caption: "Forever in love",
    rotate: 4,
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1517867008703-b31172fbd531?auto=format&fit=crop&q=80&w=800",
    caption: "Happy days",
    rotate: -2,
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    caption: "Wedding bliss",
    rotate: 3,
  }
];

export function PhotoGallery() {
  return (
    <section className="py-24 px-4 overflow-hidden relative bg-gradient-to-b from-white to-pink-50/50">
      <div className="max-w-7xl mx-auto mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-4"
        >
          <Heart className="text-primary w-12 h-12 animate-pulse" fill="currentColor" />
        </motion.div>
        <h2 className="text-5xl md:text-6xl font-display text-primary mb-4 drop-shadow-sm">Our Love Story</h2>
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto rounded-full" />
        <p className="mt-6 text-muted-foreground font-light text-xl italic font-serif">"Every picture tells a story of our beautiful journey together."</p>
      </div>

      <div className="flex space-x-12 animate-scroll whitespace-nowrap py-10 px-4">
        {[...photos, ...photos].map((photo, index) => (
          <motion.div
            key={`${photo.id}-${index}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: (index % photos.length) * 0.1 }}
            style={{ rotate: `${photo.rotate}deg` }}
            className="inline-block w-80 h-[450px] relative group bg-white p-4 pb-16 shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 hover:-translate-y-4 border-8 border-white"
          >
            <div className="w-full h-full overflow-hidden rounded-sm mb-4">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <div className="absolute bottom-6 left-0 right-0 px-6 text-center">
              <p className="text-gray-800 font-handwriting text-2xl truncate">{photo.caption}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Heart className="w-6 h-6 text-primary fill-primary" />
            </div>
          </motion.div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: fit-content;
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
