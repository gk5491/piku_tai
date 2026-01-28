import { motion } from "framer-motion";
import { useState } from "react";

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
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-pink-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">Our Gallery in 3D</h2>
        <p className="text-gray-600 font-handwriting text-2xl">Click to highlight our favorite moments</p>
      </div>

      <div className="scene h-[500px] flex items-center justify-center">
        <div className={`a3d w-[17.5em] ${highlightedIndex !== null ? 'pause-animation' : ''}`} style={{ '--n': n } as any}>
          {carouselPhotos.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Carousel ${i}`}
              onClick={() => setHighlightedIndex(highlightedIndex === i ? null : i)}
              className={`card cursor-pointer transition-all duration-500 ${
                highlightedIndex === i ? 'highlighted' : highlightedIndex !== null ? 'dimmed' : ''
              }`}
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

        .pause-animation {
          animation-play-state: paused;
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
            translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / 0.577)); /* Reduced gap: tan(30deg) approx 0.577 for n=6 */
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 4px solid white;
          filter: sepia(0.2) contrast(1.1);
        }

        .card.highlighted {
          filter: sepia(0) contrast(1.2) brightness(1.1);
          border-color: #ff4d6d;
          transform: 
            rotateY(calc(var(--i) * var(--ba))) 
            translateZ(calc(-1 * (0.5 * var(--w) + 0.5em) / 0.577))
            scale(1.15);
          z-index: 50;
        }

        .card.dimmed {
          filter: grayscale(0.8) blur(2px);
          opacity: 0.5;
        }
      `}} />
    </section>
  );
}
