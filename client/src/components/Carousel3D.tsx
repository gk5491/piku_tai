import { motion } from "framer-motion";

const carouselPhotos = [
  "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?auto=format&fit=crop&q=80&w=800",
];

export function Carousel3D() {
  const n = carouselPhotos.length;

  return (
    <section className="py-24 bg-pink-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">Our Gallery in 3D</h2>
        <p className="text-gray-600 font-handwriting text-2xl">A carousel of our favorite moments</p>
      </div>

      <div className="scene h-[500px] flex items-center justify-center">
        <div className="a3d w-[17.5em]" style={{ '--n': n } as any}>
          {carouselPhotos.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Carousel ${i}`}
              className="card"
              style={{ '--i': i } as any}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scene {
          overflow: hidden;
          perspective: 60em;
          mask: linear-gradient(90deg, #0000, red 20% 80%, #0000);
          -webkit-mask: linear-gradient(90deg, #0000, red 20% 80%, #0000);
        }

        .a3d {
          display: grid;
          transform-style: preserve-3d;
          animation: ry 32s linear infinite;
        }

        @keyframes ry { 
          to { transform: rotateY(1turn); } 
        }

        .card {
          --w: 17.5em;
          --ba: calc(1turn / var(--n));
          grid-area: 1/1;
          width: var(--w);
          aspect-ratio: 7/10;
          object-fit: cover;
          border-radius: 1.5em;
          backface-visibility: hidden;
          transform: 
            rotateY(calc(var(--i) * var(--ba))) 
            translateZ(calc(-1 * (0.5 * var(--w) + 2em) / 0.325)); /* Approximate tan(0.5*ba) for n=6 */
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 4px solid white;
        }
      `}} />
    </section>
  );
}
