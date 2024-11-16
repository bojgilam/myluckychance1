import React, { useState, useRef, useEffect } from 'react';
import { Compass, Loader2, Sparkles } from 'lucide-react';

interface Fortune {
  text: string;
  type: 'good' | 'bad' | 'neutral';
  action: string;
  color: string;
}

const FORTUNES: Fortune[] = [
  { text: "Great success awaits", type: "good", action: "Give three compliments today", color: "from-green-500 to-emerald-600" },
  { text: "Minor setback ahead", type: "bad", action: "Avoid walking under ladders today", color: "from-red-500 to-rose-600" },
  { text: "Adventure calls", type: "neutral", action: "Try something new at lunch", color: "from-blue-500 to-indigo-600" },
  { text: "Lucky encounter", type: "good", action: "Wear your favorite color", color: "from-green-500 to-emerald-600" },
  { text: "Temporary challenge", type: "bad", action: "Be extra careful with hot drinks", color: "from-red-500 to-rose-600" },
  { text: "Mysterious opportunity", type: "neutral", action: "Start a conversation with someone new", color: "from-blue-500 to-indigo-600" },
  { text: "Unexpected gift", type: "good", action: "Share something you enjoy with others", color: "from-green-500 to-emerald-600" },
  { text: "Minor confusion", type: "bad", action: "Double-check all your messages", color: "from-red-500 to-rose-600" },
  { text: "Peaceful moment", type: "neutral", action: "Take a 5-minute meditation break", color: "from-blue-500 to-indigo-600" },
  { text: "Joyful surprise", type: "good", action: "Dance to your favorite song", color: "from-green-500 to-emerald-600" },
  { text: "Brief delay", type: "bad", action: "Leave 10 minutes earlier than planned", color: "from-red-500 to-rose-600" },
  { text: "Curious discovery", type: "neutral", action: "Learn one new fact today", color: "from-blue-500 to-indigo-600" },
];

const WheelOfFate: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedFortune, setSelectedFortune] = useState<Fortune | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedFortune(null);

    // Calculate random rotation (5-10 full spins plus random segment)
    const spinCount = 5 + Math.random() * 5;
    const baseRotation = spinCount * 360;
    const extraRotation = Math.random() * 360;
    const totalRotation = baseRotation + extraRotation;
    
    // Calculate which fortune will be selected
    const fortuneIndex = Math.floor(((360 - (extraRotation % 360)) / (360 / FORTUNES.length)));
    
    setRotation(prev => prev + totalRotation);

    // Wait for animation to finish
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedFortune(FORTUNES[fortuneIndex]);
    }, 5000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-8 shadow-2xl border border-white/20">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Compass className="text-yellow-400 w-6 h-6 md:w-8 md:h-8" />
          Wheel of Fate
        </h2>
        <p className="text-sm md:text-base text-purple-200">Spin the wheel to reveal your destiny and daily challenge!</p>
      </div>

      <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 md:mb-8">
        {/* Pointer */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] md:border-l-[12px] border-l-transparent border-r-[8px] md:border-r-[12px] border-r-transparent border-t-[16px] md:border-t-[24px] border-yellow-400 z-10" />
        
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full border-4 border-white/20 relative overflow-hidden transform transition-transform duration-5000 ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
          }}
        >
          {FORTUNES.map((fortune, index) => {
            const rotation = (index * (360 / FORTUNES.length));
            return (
              <div
                key={index}
                className={`absolute w-1/2 h-1/2 origin-bottom-right bg-gradient-to-br ${fortune.color}
                         -translate-y-1/2`}
                style={{
                  transform: `rotate(${rotation}deg) skewY(-60deg)`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mb-4 md:mb-6">
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white font-semibold
                   hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   flex items-center gap-2 shadow-lg text-sm md:text-base"
        >
          {isSpinning ? (
            <>
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              Spinning...
            </>
          ) : (
            <>
              <Compass className="w-4 h-4 md:w-5 md:h-5" />
              Spin Wheel
            </>
          )}
        </button>
      </div>

      {selectedFortune && !isSpinning && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
          <div className="grid grid-cols-1 gap-3 md:gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                <Sparkles className={`w-4 h-4 md:w-5 md:h-5 
                  ${selectedFortune.type === 'good' ? 'text-green-400' : ''}
                  ${selectedFortune.type === 'bad' ? 'text-red-400' : ''}
                  ${selectedFortune.type === 'neutral' ? 'text-blue-400' : ''}`} 
                />
                <h3 className={`text-lg md:text-xl font-semibold
                  ${selectedFortune.type === 'good' ? 'text-green-400' : ''}
                  ${selectedFortune.type === 'bad' ? 'text-red-400' : ''}
                  ${selectedFortune.type === 'neutral' ? 'text-blue-400' : ''}`}>
                  {selectedFortune.text}
                </h3>
              </div>
              <p className="text-purple-200 text-sm md:text-base">Your Challenge:</p>
              <p className="text-white font-medium mt-1 text-sm md:text-base">{selectedFortune.action}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WheelOfFate;