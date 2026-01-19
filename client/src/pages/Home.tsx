import { HeroSection } from "@/components/HeroSection";
import { PhotoGallery } from "@/components/PhotoGallery";
import { LoveLetter } from "@/components/LoveLetter";
import { WishesSection } from "@/components/WishesSection";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Music } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Using a ref to hold the audio object so it persists between renders
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio with a direct, stable URL
    const songUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 
    audioRef.current = new Audio(songUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    // Preload the audio
    audioRef.current.load();

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed (interaction required)", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-pink-200">
      <FloatingHearts />
      
      {/* Music Toggle - Fixed Bottom Right */}
      <button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 ${
          isPlaying 
            ? "bg-primary text-white shadow-primary/40 animate-spin-slow" 
            : "bg-white text-gray-400 shadow-gray-200"
        }`}
        title={isPlaying ? "Pause Music" : "Play Romantic Music"}
      >
        <Music className="w-6 h-6" />
      </button>

      <main className="relative">
        <HeroSection />
        
        <div className="relative z-10 bg-background">
          <LoveLetter />
          <PhotoGallery />
          <WishesSection />
          
          <footer className="py-12 text-center text-muted-foreground font-display">
            <p className="text-lg">Made with infinite love for you.</p>
            <p className="text-sm mt-2 opacity-60">Forever & Always • {new Date().getFullYear()}</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
