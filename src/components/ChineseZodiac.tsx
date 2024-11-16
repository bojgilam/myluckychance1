import React, { useState } from 'react';
import { Rabbit, Loader2, Sparkles } from 'lucide-react';

const ZODIAC_SIGNS = [
  { name: 'Rat', dates: 'Mar 21 - Apr 19', element: 'Fire' },
  { name: 'Taurus', dates: 'Apr 20 - May 20', element: 'Earth' },
  { name: 'Gemini', dates: 'May 21 - Jun 20', element: 'Air' },
  { name: 'Cancer', dates: 'Jun 21 - Jul 22', element: 'Water' },
  { name: 'Leo', dates: 'Jul 23 - Aug 22', element: 'Fire' },
  { name: 'Virgo', dates: 'Aug 23 - Sep 22', element: 'Earth' },
  { name: 'Libra', dates: 'Sep 23 - Oct 22', element: 'Air' },
  { name: 'Scorpio', dates: 'Oct 23 - Nov 21', element: 'Water' },
  { name: 'Sagittarius', dates: 'Nov 22 - Dec 21', element: 'Fire' },
  { name: 'Capricorn', dates: 'Dec 22 - Jan 19', element: 'Earth' },
  { name: 'Aquarius', dates: 'Jan 20 - Feb 18', element: 'Air' },
  { name: 'Pisces', dates: 'Feb 19 - Mar 20', element: 'Water' }
];

const HOROSCOPES = [
  "A surprising opportunity will present itself today. Stay alert and ready to act.",
  "Your creative energy is at its peak. Use this time to start new projects.",
  "Focus on personal relationships today. Someone close needs your attention.",
  "Financial prospects are looking bright. Consider making that investment you've been pondering.",
  "Your intuition is particularly strong today. Trust your inner voice.",
  "A long-awaited message will arrive. The news will be better than expected.",
  "Travel plans may arise unexpectedly. Be prepared for an adventure.",
  "Your hard work is about to pay off. Keep pushing forward.",
  "A friend will offer valuable advice. Listen carefully.",
  "Your charm is magnetic today. Use it wisely in social situations.",
  "An old hobby will bring new joy. Revisit past interests.",
  "Your leadership qualities will shine today. Take charge when needed."
];

const ChineseZodiac: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<typeof ZODIAC_SIGNS[0] | null>(null);
  const [horoscope, setHoroscope] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateHoroscope = (sign: typeof ZODIAC_SIGNS[0]) => {
    setIsLoading(true);
    setSelectedSign(sign);
    
    setTimeout(() => {
      const randomHoroscope = HOROSCOPES[Math.floor(Math.random() * HOROSCOPES.length)];
      setHoroscope(randomHoroscope);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 w-full max-w-2xl mx-auto">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Rabbit className="text-red-400 w-6 h-6 sm:w-8 sm:h-8" />
          Chinese Zodiac
        </h2>
        <p className="text-purple-200 text-sm sm:text-base">Select your zodiac sign to reveal today's horoscope</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mb-6">
        {ZODIAC_SIGNS.map((sign) => (
          <button
            key={sign.name}
            onClick={() => generateHoroscope(sign)}
            className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200
              ${selectedSign?.name === sign.name 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/5 text-purple-200 hover:bg-white/10'}`}
          >
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <span>{sign.name}</span>
              <span className="text-[10px] sm:text-xs opacity-75">{sign.dates}</span>
            </div>
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-4 sm:py-6">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin mx-auto text-purple-400" />
          <p className="text-purple-200 mt-2 text-sm sm:text-base">Reading the stars...</p>
        </div>
      )}

      {selectedSign && horoscope && !isLoading && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              You are a {selectedSign.name}!
            </h3>
            <div className="flex items-center justify-center gap-2 text-purple-300 text-sm sm:text-base">
              <Sparkles className="w-4 h-4" />
              <span>Element: {selectedSign.element}</span>
            </div>
          </div>
          
          <div className="grid gap-4 sm:gap-6">
            <div>
              <h4 className="text-purple-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Personality Traits:</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedSign.traits?.map((trait, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs sm:text-sm text-purple-200
                             hover:bg-white/10 transition-colors"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-purple-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Description:</h4>
              <p className="text-purple-200 leading-relaxed text-sm sm:text-base">{selectedSign.description}</p>
            </div>

            <div>
              <h4 className="text-purple-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Best Compatibility:</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedSign.compatibility?.map((sign, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full 
                             text-xs sm:text-sm text-purple-200 border border-purple-500/20
                             hover:from-purple-500/30 hover:to-pink-500/30 transition-colors"
                  >
                    {sign}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-purple-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Recent/Upcoming Years:</h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedSign.years?.slice(-4).map((year, index) => (
                  <span
                    key={index}
                    className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs sm:text-sm text-purple-200"
                  >
                    {year}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChineseZodiac;