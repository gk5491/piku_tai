import { motion } from "framer-motion";
import { useState } from "react";

const carouselPhotos = [
  "/assets/carousel/photo1.jpg",
  "/assets/carousel/photo2.jpg",
  "/assets/carousel/photo3.jpg",
  "/assets/carousel/photo4.jpg",
  "/assets/carousel/photo5.jpg",
  "/assets/carousel/photo6.jpg",
  "/assets/carousel/photo7.jpg",
  "/assets/carousel/photo8.jpg",
  "/assets/carousel/photo9.jpg",
  "/assets/carousel/photo10.jpg",
  "/assets/carousel/photo11.jpg",
  "/assets/carousel/photo12.jpg",
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
            translateZ(calc(-1 * (0.5 * var(--w) + 1.5em) / 0.267)); /* Adjusted for n=12: tan(15deg) approx 0.267 */
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 4px solid white;
          filter: sepia(0.2) contrast(1.1);
        }

        .card.highlighted {
          filter: sepia(0) contrast(1.2) brightness(1.1);
          border-color: #ff4d6d;
          transform: 
            rotateY(calc(var(--i) * var(--ba))) 
            translateZ(calc(-1 * (0.5 * var(--w) + 1.5em) / 0.267))
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
