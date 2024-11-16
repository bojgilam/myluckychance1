import React, { useState } from 'react';
import { Star, Calendar, Sparkles, Loader2 } from 'lucide-react';

const ZODIAC_SIGNS = [
  { name: 'Aries', dates: 'Mar 21 - Apr 19', element: 'Fire' },
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

const Horoscope: React.FC = () => {
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
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 w-full max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Star className="text-yellow-400" />
          Daily Horoscope
        </h2>
        <p className="text-purple-200">Select your zodiac sign to reveal today's horoscope</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
        {ZODIAC_SIGNS.map((sign) => (
          <button
            key={sign.name}
            onClick={() => generateHoroscope(sign)}
            className={`p-3 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedSign?.name === sign.name 
                ? 'bg-purple-500 text-white' 
                : 'bg-white/5 text-purple-200 hover:bg-white/10'}`}
          >
            <div className="flex flex-col items-center gap-1">
              <span>{sign.name}</span>
              <span className="text-xs opacity-75">{sign.dates}</span>
            </div>
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-400" />
          <p className="text-purple-200 mt-2">Reading the stars...</p>
        </div>
      )}

      {selectedSign && horoscope && !isLoading && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">
              {selectedSign.name}'s Horoscope
            </h3>
          </div>
          <p className="text-purple-200 text-center leading-relaxed">
            {horoscope}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-purple-300">
            <Sparkles className="w-4 h-4" />
            <span>Element: {selectedSign.element}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Horoscope;