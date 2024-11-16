import React, { useState } from 'react';
import { Cookie, Sparkles, Loader2, RefreshCw } from 'lucide-react';

const FORTUNES = [
  "Success is just around the corner. Stay focused!",
  "Your dreams are within reach—keep pushing forward.",
  "Great things take time. Be patient.",
  "A kind word can change someone's day. Use it wisely.",
  "Happiness is a journey, not a destination.",
  "The path to success is always under construction.",
  "Your hard work will soon pay off in ways you cannot yet imagine.",
  "The future is bright. Keep your eyes on the prize.",
  "Be kind to yourself. You're doing better than you think.",
  "What you seek is already within you. Trust your instincts.",
  "Your courage will carry you to new heights.",
  "A new adventure awaits. Embrace the unknown.",
  "Don't fear failure. Fear not trying at all.",
  "Be grateful for what you have, and the universe will give you more.",
  "Life is 10% what happens to you and 90% how you respond."
];

const COOKIE_SHAPES = [
  {
    outer: "M10,50 Q50,0 90,50 Q50,100 10,50",
    inner: "M20,50 Q50,15 80,50 Q50,85 20,50",
    crumb: "M45,45 L55,48 L52,52 L48,50 Z"
  },
  {
    outer: "M10,50 Q30,10 50,50 Q70,90 90,50 Q70,10 50,50 Q30,90 10,50",
    inner: "M25,50 Q40,20 50,50 Q60,80 75,50 Q60,20 50,50 Q40,80 25,50",
    crumb: "M48,45 L53,47 L51,52 L46,50 Z"
  },
  {
    outer: "M10,50 Q50,20 90,50 Q50,80 10,50",
    inner: "M20,50 Q50,30 80,50 Q50,70 20,50",
    crumb: "M47,48 L52,46 L54,51 L49,53 Z"
  }
];

const FortuneCookie: React.FC = () => {
  const [showCookie, setShowCookie] = useState(true);
  const [fortune, setFortune] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cookieShape, setCookieShape] = useState(COOKIE_SHAPES[0]);

  const getNewCookie = () => {
    setShowCookie(true);
    setFortune(null);
    setCookieShape(COOKIE_SHAPES[Math.floor(Math.random() * COOKIE_SHAPES.length)]);
  };

  const crackCookie = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    setTimeout(() => {
      setShowCookie(false);
      const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setFortune(randomFortune);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 w-full max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Cookie className="text-yellow-400" />
          Fortune Cookie
        </h2>
        <p className="text-purple-200">Crack open your fortune cookie to reveal your destiny</p>
      </div>

      <div className="relative w-64 h-64 mx-auto mb-8">
        {showCookie ? (
          <div className={`w-full h-full flex items-center justify-center
                        ${isAnimating ? 'animate-[shake_0.5s_ease-in-out_infinite]' : ''}`}>
            {/* Enhanced Cookie SVG */}
            <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-2xl">
              {/* Cookie Glow Effect */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                <linearGradient id="cookieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e3b081" />
                  <stop offset="50%" stopColor="#d4a373" />
                  <stop offset="100%" stopColor="#b08968" />
                </linearGradient>
                
                <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cb997e" />
                  <stop offset="100%" stopColor="#a07855" />
                </linearGradient>
              </defs>

              {/* Main Cookie Shape */}
              <path
                d={cookieShape.outer}
                fill="url(#cookieGradient)"
                stroke="#8b5e34"
                strokeWidth="1"
                filter="url(#glow)"
                className={`transform-gpu transition-transform duration-300 ${isAnimating ? 'scale-95' : 'hover:scale-105'}`}
              />

              {/* Inner Pattern */}
              <path
                d={cookieShape.inner}
                fill="none"
                stroke="url(#innerGradient)"
                strokeWidth="0.5"
                opacity="0.7"
              />

              {/* Cookie Texture Details */}
              <g className="cookie-details">
                {[...Array(6)].map((_, i) => (
                  <circle
                    key={i}
                    cx={30 + Math.random() * 40}
                    cy={30 + Math.random() * 40}
                    r={0.8}
                    fill="#8b5e34"
                    opacity="0.6"
                  />
                ))}
                <path
                  d={cookieShape.crumb}
                  fill="#8b5e34"
                  opacity="0.6"
                />
              </g>

              {/* Highlight */}
              <path
                d="M30,40 Q50,20 70,40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </svg>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg p-6 backdrop-blur-md
                          animate-[fadeIn_0.5s_ease-out] shadow-xl">
              <div className="relative">
                <Sparkles className="w-6 h-6 text-yellow-400 mx-auto mb-3 animate-pulse" />
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-75"></div>
              </div>
              <p className="text-white text-center font-medium relative z-10">
                {fortune}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={getNewCookie}
          disabled={isAnimating}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg text-white font-semibold
                   hover:from-amber-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   flex items-center gap-2 shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Get Another Cookie
        </button>

        <button
          onClick={crackCookie}
          disabled={!showCookie || isAnimating}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white font-semibold
                   hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   flex items-center gap-2 shadow-lg"
        >
          {isAnimating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Cracking...
            </>
          ) : (
            <>
              <Cookie className="w-5 h-5" />
              Crack Cookie
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FortuneCookie;