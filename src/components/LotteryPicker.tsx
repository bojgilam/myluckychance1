import React, { useState } from 'react';
import { Ticket, Loader2, Dices } from 'lucide-react';

interface LotteryGame {
  name: string;
  description: string;
  mainNumbers: { count: number; max: number };
  specialNumbers?: { count: number; max: number; name: string };
}

const LOTTERY_GAMES: Record<string, LotteryGame> = {
  powerball: {
    name: 'Powerball',
    description: '5 numbers (1-69) + 1 Powerball (1-26)',
    mainNumbers: { count: 5, max: 69 },
    specialNumbers: { count: 1, max: 26, name: 'Powerball' }
  },
  megaMillions: {
    name: 'Mega Millions',
    description: '5 numbers (1-70) + 1 Mega Ball (1-25)',
    mainNumbers: { count: 5, max: 70 },
    specialNumbers: { count: 1, max: 25, name: 'Mega Ball' }
  },
  luckyForLife: {
    name: 'Lucky for Life',
    description: '5 numbers (1-48) + 1 Lucky Ball (1-18)',
    mainNumbers: { count: 5, max: 48 },
    specialNumbers: { count: 1, max: 18, name: 'Lucky Ball' }
  },
  lottoAmerica: {
    name: 'Lotto America',
    description: '5 numbers (1-52) + 1 Star Ball (1-10)',
    mainNumbers: { count: 5, max: 52 },
    specialNumbers: { count: 1, max: 10, name: 'Star Ball' }
  },
  twoByTwo: {
    name: '2by2',
    description: '2 red numbers (1-26) + 2 white numbers (1-26)',
    mainNumbers: { count: 2, max: 26 },
    specialNumbers: { count: 2, max: 26, name: 'White Numbers' }
  },
  superLotto: {
    name: 'SuperLotto Plus',
    description: '5 numbers (1-47) + 1 Mega (1-27)',
    mainNumbers: { count: 5, max: 47 },
    specialNumbers: { count: 1, max: 27, name: 'Mega' }
  },
  floridaLotto: {
    name: 'Florida Lotto',
    description: '6 numbers (1-53)',
    mainNumbers: { count: 6, max: 53 }
  },
  nyLotto: {
    name: 'New York Lotto',
    description: '6 numbers (1-59)',
    mainNumbers: { count: 6, max: 59 }
  },
  texasLotto: {
    name: 'Lotto Texas',
    description: '6 numbers (1-54)',
    mainNumbers: { count: 6, max: 54 }
  },
  triStateMegabucks: {
    name: 'Tri-State Megabucks Plus',
    description: '6 numbers (1-41)',
    mainNumbers: { count: 6, max: 41 }
  },
  hoosierLotto: {
    name: 'Hoosier Lotto',
    description: '6 numbers (1-46)',
    mainNumbers: { count: 6, max: 46 }
  },
  cash4Life: {
    name: 'Cash4Life',
    description: '5 numbers (1-60) + 1 Cash Ball (1-4)',
    mainNumbers: { count: 5, max: 60 },
    specialNumbers: { count: 1, max: 4, name: 'Cash Ball' }
  },
  keno: {
    name: 'Keno',
    description: '20 numbers (1-80)',
    mainNumbers: { count: 20, max: 80 }
  },
  pick3: {
    name: 'Pick 3',
    description: '3 numbers (0-9)',
    mainNumbers: { count: 3, max: 9 }
  },
  pick4: {
    name: 'Pick 4',
    description: '4 numbers (0-9)',
    mainNumbers: { count: 4, max: 9 }
  },
  pick5: {
    name: 'Pick 5',
    description: '5 numbers (0-9)',
    mainNumbers: { count: 5, max: 9 }
  },
  fantasy5: {
    name: 'Fantasy 5',
    description: '5 numbers (1-39)',
    mainNumbers: { count: 5, max: 39 }
  }
};

const generateNumbers = (count: number, max: number, exclude: number[] = []): number[] => {
  const numbers: number[] = [];
  while (numbers.length < count) {
    const num = Math.floor(Math.random() * max) + 1;
    if (!numbers.includes(num) && !exclude.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers.sort((a, b) => a - b);
};

const LotteryPicker: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string>('powerball');
  const [numbers, setNumbers] = useState<{ main: number[]; special?: number[] } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQuickPick = () => {
    setIsGenerating(true);
    const game = LOTTERY_GAMES[selectedGame];
    
    setTimeout(() => {
      const mainNumbers = generateNumbers(game.mainNumbers.count, game.mainNumbers.max);
      const specialNumbers = game.specialNumbers 
        ? generateNumbers(game.specialNumbers.count, game.specialNumbers.max)
        : undefined;
      
      setNumbers({ main: mainNumbers, special: specialNumbers });
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900/50 to-teal-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-emerald-500/20 w-full max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Ticket className="text-emerald-400" />
          Lucky Numbers Generator
        </h2>
        <p className="text-emerald-200">Generate quick pick numbers for popular lottery games</p>
      </div>

      <div className="flex flex-wrap gap-1 mb-6">
        {Object.entries(LOTTERY_GAMES).map(([key, game]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedGame(key);
              setNumbers(null);
            }}
            className={`p-2 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedGame === key 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                : 'bg-white/5 text-emerald-200 hover:bg-white/10'}`}
          >
            {game.name}
          </button>
        ))}
      </div>

      <div className="text-emerald-200 text-sm mb-4 text-center">
        {LOTTERY_GAMES[selectedGame].description}
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={generateQuickPick}
          disabled={isGenerating}
          className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white font-semibold
                   hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   flex items-center gap-2 shadow-lg"
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Dices className="w-5 h-5" />
          )}
          Generate Numbers
        </button>
      </div>

      {numbers && (
        <div className="bg-white/5 border border-emerald-500/20 rounded-lg p-6 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {numbers.main.map((num, idx) => (
              <div
                key={`main-${idx}`}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600
                         flex items-center justify-center text-white font-bold text-lg
                         border-2 border-white/20 shadow-lg"
              >
                {num.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
          
          {numbers.special && (
            <div className="flex justify-center gap-2">
              {numbers.special.map((num, idx) => (
                <div
                  key={`special-${idx}`}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600
                           flex items-center justify-center text-white font-bold text-lg
                           border-2 border-white/20 shadow-lg"
                >
                  {num.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 text-sm text-emerald-200">
            {numbers.special ? (
              <>
                White Balls: {numbers.main.join(', ')}
                <br />
                {LOTTERY_GAMES[selectedGame].specialNumbers?.name}: {numbers.special.join(', ')}
              </>
            ) : (
              <>Numbers: {numbers.main.join(', ')}</>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LotteryPicker;