import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import SlotMachine from './components/SlotMachine';
import LotteryPicker from './components/LotteryPicker';
import DiceGame from './components/DiceGame';
import WheelOfFate from './components/WheelOfFate';
import Magic8Ball from './components/Magic8Ball';
import Horoscope from './components/Horoscope';
import FortuneCookie from './components/FortuneCookie';
import ChineseZodiac from './components/ChineseZodiac';
import ShareButtons from './components/ShareButtons';

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center p-4 md:p-8 gap-4 md:gap-8">
      <div className="text-center mb-2 md:mb-4 w-full">
        <h1 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-2 md:mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-yellow-400" />
          Fortune Spinner
          <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-yellow-400" />
        </h1>
        <p className="text-base md:text-xl text-purple-200">Discover Your Destiny</p>
      </div>

      <div className="w-full max-w-2xl mx-auto space-y-6">
        <SlotMachine isSpinning={isSpinning} setIsSpinning={setIsSpinning} />
        
        <div className="flex justify-center">
          <button
            onClick={() => setIsSpinning(true)}
            disabled={isSpinning}
            className="px-6 md:px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold
                     hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200
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
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                Spin Fortune
              </>
            )}
          </button>
        </div>

        <Magic8Ball />
        <FortuneCookie />
        <DiceGame />
        <WheelOfFate />
        <Horoscope />
        <ChineseZodiac />
        <LotteryPicker />

        <footer className="text-center text-xs md:text-sm text-purple-200/80 p-4 md:p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-500/20">
          <h3 className="font-semibold mb-2">Disclaimer:</h3>
          <p className="mb-4">
            The tools and games on this website, including the fortune-telling games and lottery number generator, 
            are intended for entertainment purposes only. The outcomes provided by these features are random and 
            should not be taken as predictions, guarantees, or advice. They are purely for fun and do not have 
            any factual or predictive accuracy.
          </p>
          <p className="mb-4">
            The lottery number generator does not increase or guarantee your chances of winning any lottery. 
            Always follow the official rules and guidelines of your local lottery organization. This site is 
            not affiliated with any official lottery or gambling institution.
          </p>
          <h4 className="font-semibold mb-2">Important Note:</h4>
          <p className="mb-4">
            The use of these tools is entirely at your own risk. For the lottery number generator, always 
            cross-check your numbers with the official lottery provider. For the fortune-telling games, 
            remember that they are meant for lighthearted enjoyment, not life-altering decisions.
          </p>
          <h4 className="font-semibold mb-2">Responsible Use Statement:</h4>
          <p>
            Play responsibly. If you or someone you know has a gambling problem, seek help through a trusted 
            support organization.
          </p>
        </footer>

        <ShareButtons 
          title="Fortune Spinner" 
          description="Discover your destiny with fortune telling, horoscopes, and more!"
        />
      </div>
    </div>
  );
};

export default App;