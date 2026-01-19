import { motion } from "framer-motion";

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
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1517867008703-b31172fbd531?auto=format&fit=crop&q=80&w=800",
    caption: "Happy days",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    caption: "Wedding bliss",
  }
];

export function PhotoGallery() {
  return (
    <section className="py-24 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto mb-16 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">Our Beautiful Memories</h2>
        <div className="h-1 w-24 bg-accent/50 mx-auto rounded-full" />
        <p className="mt-4 text-muted-foreground font-light text-lg">Capturing the love we share, one moment at a time.</p>
      </div>

      <div className="flex space-x-8 animate-scroll whitespace-nowrap">
        {[...photos, ...photos].map((photo, index) => (
          <motion.div
            key={`${photo.id}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block w-80 h-96 relative group rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white font-display text-xl">{photo.caption}</p>
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
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
