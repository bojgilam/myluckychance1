import React, { useState } from 'react';
import { Search, Globe2, Loader2 } from 'lucide-react';

// Enhanced mock database with more names and meanings
const NAME_MEANINGS: Record<string, Array<{ country: string; meaning: string }>> = {
  'john': [
    { country: 'Hebrew', meaning: 'God is gracious' },
    { country: 'English', meaning: 'God\'s grace' },
    { country: 'Greek', meaning: 'Gift of God' },
    { country: 'Irish', meaning: 'God is merciful' },
  ],
  'mary': [
    { country: 'Hebrew', meaning: 'Bitter, beloved' },
    { country: 'Egyptian', meaning: 'Beloved' },
    { country: 'French', meaning: 'Star of the sea' },
    { country: 'Latin', meaning: 'Of the sea' },
  ],
  'david': [
    { country: 'Hebrew', meaning: 'Beloved' },
    { country: 'Scottish', meaning: 'Beloved one' },
    { country: 'Welsh', meaning: 'Beloved friend' },
    { country: 'Irish', meaning: 'Beloved of God' },
  ],
  'sarah': [
    { country: 'Hebrew', meaning: 'Princess' },
    { country: 'Arabic', meaning: 'Joy, delight' },
    { country: 'Persian', meaning: 'Pure one' },
    { country: 'Latin', meaning: 'Lady of high rank' },
  ],
  'michael': [
    { country: 'Hebrew', meaning: 'Who is like God?' },
    { country: 'German', meaning: 'God-like' },
    { country: 'English', meaning: 'Gift from God' },
    { country: 'Irish', meaning: 'One who is like God' },
  ],
  'emma': [
    { country: 'German', meaning: 'Universal' },
    { country: 'English', meaning: 'Whole, universal' },
    { country: 'French', meaning: 'Industrious' },
    { country: 'Latin', meaning: 'Complete' },
  ],
  'william': [
    { country: 'German', meaning: 'Resolute protector' },
    { country: 'English', meaning: 'Strong-willed warrior' },
    { country: 'French', meaning: 'Determined protector' },
    { country: 'Dutch', meaning: 'Willing to protect' },
  ],
  'sophia': [
    { country: 'Greek', meaning: 'Wisdom' },
    { country: 'Arabic', meaning: 'Pure, wise' },
    { country: 'Italian', meaning: 'Knowledge' },
    { country: 'Russian', meaning: 'Divine wisdom' },
  ],
  'james': [
    { country: 'Hebrew', meaning: 'Supplanter' },
    { country: 'English', meaning: 'One who follows' },
    { country: 'Scottish', meaning: 'One who replaces' },
    { country: 'Irish', meaning: 'One who succeeds' },
  ],
  'olivia': [
    { country: 'Latin', meaning: 'Olive tree' },
    { country: 'Greek', meaning: 'Peace' },
    { country: 'English', meaning: 'Olive branch' },
    { country: 'Italian', meaning: 'Symbol of peace' },
  ],
};

const NameMeaning: React.FC = () => {
  const [name, setName] = useState('');
  const [meanings, setMeanings] = useState<Array<{ country: string; meaning: string }> | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!name.trim()) return;
    
    setIsSearching(true);
    setError('');
    setMeanings(null);

    // Simulate API call with normalized search
    setTimeout(() => {
      const searchName = name.toLowerCase().trim();
      const results = NAME_MEANINGS[searchName];
      
      if (results) {
        setMeanings(results);
      } else {
        const suggestions = Object.keys(NAME_MEANINGS)
          .filter(n => n.startsWith(searchName.substring(0, 3)))
          .slice(0, 3);
        
        const suggestionText = suggestions.length > 0
          ? ` Try: ${suggestions.join(', ')}`
          : ' Try: John, Mary, David, Sarah, Michael, Emma, William, Sophia, James, or Olivia';
        
        setError('No meanings found for this name.' + suggestionText);
      }
      
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 w-full max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Globe2 className="text-blue-400" />
          Name Origin Explorer
        </h2>
        <p className="text-purple-200">Discover the meaning of your name across different cultures</p>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!name.trim() || isSearching}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold
                   hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   flex items-center gap-2"
        >
          {isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          Search
        </button>
      </div>

      {isSearching && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-400" />
          <p className="text-purple-200 mt-2">Searching across cultures...</p>
        </div>
      )}

      {error && !isSearching && (
        <div className="text-center py-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {meanings && !isSearching && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meanings.map((origin, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm
                       hover:bg-white/10 transition-all duration-200 group"
            >
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                {origin.country}
              </h3>
              <p className="text-purple-200 text-sm">{origin.meaning}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NameMeaning;