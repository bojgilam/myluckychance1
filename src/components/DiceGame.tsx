import React, { useState } from 'react';
import { Dices, Loader2, Sparkles, Skull } from 'lucide-react';

const GOOD_FORTUNES = {
  1: "Love and joy will surround you",
  2: "An unexpected gift will arrive",
  3: "A friend will bring great news",
  4: "Success will follow your efforts",
  5: "Adventure awaits around the corner",
  6: "Fortune smiles upon your endeavors"
};

const BAD_FORTUNES = {
  1: "Minor setbacks may test your patience",
  2: "A small mishap will cause brief frustration",
  3: "An awkward moment approaches",
  4: "A temporary obstacle will appear",
  5: "A plan might need adjustment",
  6: "A brief delay may occur"
};

const DiceGame: React.FC = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [goodRoll, setGoodRoll] = useState<number | null>(null);
  const [badRoll, setBadRoll] = useState<number | null>(null);

  const rollDice = () => {
    setIsRolling(true);
    
    // Animate dice rolls
    const animationDuration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      if (Date.now() - startTime < animationDuration) {
        setGoodRoll(Math.floor(Math.random() * 6) + 1);
        setBadRoll(Math.floor(Math.random() * 6) + 1);
        requestAnimationFrame(animate);
      } else {
        // Final results
        setGoodRoll(Math.floor(Math.random() * 6) + 1);
        setBadRoll(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const generateStory = () => {
    if (goodRoll === null || badRoll === null) return null;
    
    return `Today, ${GOOD_FORTUNES[goodRoll as keyof typeof GOOD_FORTUNES].toLowerCase()}. 
    However, ${BAD_FORTUNES[badRoll as keyof typeof BAD_FORTUNES].toLowerCase()}. 
    Navigate wisely!`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 w-full max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Dices className="text-yellow-400" />
          Fortune Dice
        </h2>
        <p className="text-purple-200">Roll the dice to reveal your combined fortune!</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">Good Fortune Dice</span>
          </div>
          <div className={`w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl
                        flex items-center justify-center text-4xl font-bold text-white
                        border-2 border-white/20 shadow-lg
                        ${isRolling ? 'animate-bounce' : 'transform transition-all duration-500'}`}>
            {goodRoll || '?'}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Bad Fortune Dice</span>
          </div>
          <div className={`w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl
                        flex items-center justify-center text-4xl font-bold text-white
                        border-2 border-white/20 shadow-lg
                        ${isRolling ? 'animate-bounce' : 'transform transition-all duration-500'}`}>
            {badRoll || '?'}
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-semibold
                   hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   flex items-center gap-2"
        >
          {isRolling ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Rolling...
            </>
          ) : (
            <>
              <Dices className="w-5 h-5" />
              Roll Dice
            </>
          )}
        </button>
      </div>

      {goodRoll && badRoll && !isRolling && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="grid grid-cols-1 gap-4 text-center">
            <div>
              <p className="text-green-400 mb-2">{GOOD_FORTUNES[goodRoll]}</p>
              <p className="text-red-400 mb-4">{BAD_FORTUNES[badRoll]}</p>
              <p className="text-purple-200 text-sm italic">{generateStory()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceGame;