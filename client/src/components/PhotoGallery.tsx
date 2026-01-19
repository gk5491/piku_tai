import { motion } from "framer-motion";

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=800", // Couple holding hands
    caption: "Every touch is magic",
    size: "col-span-1 row-span-1",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800", // Romantic dinner
    caption: "Moments just for us",
    size: "col-span-1 row-span-2",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=800", // Walking together
    caption: "Walking through life with you",
    size: "col-span-1 row-span-1",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800", // Wedding or formal
    caption: "My forever date",
    size: "col-span-2 row-span-1",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?auto=format&fit=crop&q=80&w=800", // Laughing couple
    caption: "Your smile lights up my world",
    size: "col-span-1 row-span-1",
  },
];

export function PhotoGallery() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-white/50 backdrop-blur-sm rounded-3xl my-12 shadow-sm border border-pink-100">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">Our Beautiful Memories</h2>
        <div className="h-1 w-24 bg-accent/50 mx-auto rounded-full" />
        <p className="mt-4 text-muted-foreground font-light text-lg">Capturing the love we share, one moment at a time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${photo.size}`}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white font-medium font-display text-xl">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
