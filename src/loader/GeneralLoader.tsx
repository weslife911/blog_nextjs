"use client";

import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./style.css"

// Define a type for the particle style object for clarity
type ParticleStyle = {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
};

const GeneralLoader = () => {
  // Initialize particle styles to an empty array for server-side rendering
  const [particleStyles, setParticleStyles] = useState<ParticleStyle[]>([]);

  // Generate and set the random styles only on the client side after mount
  useEffect(() => {
    const generateParticles = () => {
      const styles: ParticleStyle[] = [];
      const NUM_PARTICLES = 20;

      for (let i = 0; i < NUM_PARTICLES; i++) {
        styles.push({
          // Math.random() is now safely called inside useEffect
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        });
      }
      setParticleStyles(styles);
    };

    generateParticles();
  }, []); // Run once on client mount

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background with Moving Orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20"></div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Particle Effect Overlay (Now uses client-side generated styles) */}
        <div className="absolute inset-0 opacity-30">
          {particleStyles.map((style, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-ping"
              style={style} // Using the pre-calculated, stable style
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Multi-layered Spinning Rings */}
        <div className="relative w-32 h-32 mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-t-4 border-t-cyan-400 border-transparent rounded-full animate-spin"></div>

          {/* Middle Ring */}
          <div className="absolute inset-2 border-4 border-r-4 border-r-pink-400 border-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>

          {/* Inner Ring */}
          <div className="absolute inset-4 border-4 border-b-4 border-b-yellow-400 border-transparent rounded-full animate-spin" style={{ animationDuration: '0.8s' }}></div>

          {/* Pulsing Core with Logo */}
          <div className="absolute inset-8 flex items-center justify-center">
            <div className="relative w-16 h-16 overflow-hidden animate-pulse bg-gradient-to-br from-white/20 to-white/5 rounded-full backdrop-blur-sm border border-white/30">
              <div className="absolute inset-2 animate-spin" style={{ animationDuration: '3s' }}>
                <Image
                  src="/images/logo/logo.svg"
                  alt="Loading logo"
                  width={140}
                  height={80}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Text with Gradient and Animations */}
        <div className="text-center space-y-4">
          {/* Fix from previous turn: Changed <p> to <div> */}
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-bounce">
            <span className="flex items-center justify-center space-x-3">
              <LoaderCircle className="w-8 h-8 text-cyan-400 animate-spin" />
              <span className="animate-pulse">Loading</span>
              {/* Changed inner <div> to <span> for correct nesting */}
              <span className="flex space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute h-2 w-8 bg-white/60 rounded-full animate-shimmer"></div>
          </div>

          <p className="text-sm text-white/80 animate-pulse">Preparing something amazing...</p>
        </div>
      </div>
    </div>
  );
};

export default GeneralLoader;
