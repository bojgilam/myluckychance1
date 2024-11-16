import React, { useState } from 'react';
import { GemIcon, Sparkles, Loader2 } from 'lucide-react';

const PREDICTIONS = [
  { text: "A journey will bring unexpected joy", theme: "adventure" },
  { text: "A mysterious stranger will change your path", theme: "relationships" },
  { text: "Hidden talents will soon emerge", theme: "personal" },
  { text: "Fortune favors your bold decisions", theme: "success" },
  { text: "Ancient wisdom guides your next step", theme: "wisdom" },
  { text: "A forgotten dream resurfaces", theme: "dreams" },
  { text: "Distant shores hold your destiny", theme: "travel" },
  { text: "The stars align for your success", theme: "destiny" },
  { text: "A lost treasure returns to you", theme: "fortune" },
  { text: "New doors open where you least expect", theme: "opportunity" },
  { text: "A creative spark ignites your path", theme: "creativity" },
  { text: "Sacred knowledge reveals itself", theme: "wisdom" },
  { text: "The mists of time part to show truth", theme: "revelation" },
  { text: "Ancient powers guide your choices", theme: "guidance" },
  { text: "A mystical encounter approaches", theme: "mystery" }
];

const CrystalBall: React.FC = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isGazing, setIsGazing] = useState(false);
  const [showMist, setShowMist] = useState(false);

  const gaze = () => {
    if (isGazing) return;
    
    setIsGazing(true);
    setPrediction(null);
    setShowMist(true);
    
    // Sequence of animations
    setTimeout(() => {
      setShowMist(false);
      const randomPrediction = PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)];
      setPrediction(randomPrediction.text);
      setIsGazing(false);
    }, 3000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 w-full max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <GemIcon className="text-purple-400" />
          Crystal Ball
        </h2>
        <p className="text-purple-200">Gaze into the mystical orb to reveal your destiny</p>
      </div>

      <div className="relative w-64 h-64 mx-auto mb-8">
        {/* Crystal Ball */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-300/30 to-transparent backdrop-blur-sm border border-white/30" />
        
        {/* Inner Glow */}
        <div className={`absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20
                      transition-opacity duration-1000 ${showMist ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 rounded-full animate-pulse">
            {/* Mist Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/5 to-transparent
                          animate-[spin_8s_linear_infinite]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500/10 to-transparent
                          animate-[spin_12s_linear_infinite]" />
          </div>
        </div>

        {/* Crystal Ball Content */}
        <div className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-sm
                      flex items-center justify-center">
          <div className={`text-center p-6 transition-opacity duration-500
                        ${prediction && !isGazing ? 'opacity-100' : 'opacity-0'}`}>
            {prediction && (
              <p className="text-white text-lg font-medium leading-relaxed">
                {prediction}
              </p>
            )}
          </div>

          {/* Loading State */}
          {isGazing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                 w-12 h-12 text-purple-400 animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* Reflections */}
        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 blur-sm" />
        <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-white/30" />
      </div>

      <div className="flex justify-center">
        <button
          onClick={gaze}
          disabled={isGazing}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-semibold
                   hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   flex items-center gap-2"
        >
          {isGazing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Gazing...
            </>
          ) : (
            <>
              <GemIcon className="w-5 h-5" />
              Gaze into Crystal
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CrystalBall;