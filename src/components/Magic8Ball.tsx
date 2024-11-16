import React, { useState } from 'react';
import { HelpCircle, Loader2 } from 'lucide-react';

const ANSWERS = [
  { text: "It is certain", type: "positive" },
  { text: "Without a doubt", type: "positive" },
  { text: "You may rely on it", type: "positive" },
  { text: "Yes definitely", type: "positive" },
  { text: "It is decidedly so", type: "positive" },
  { text: "As I see it, yes", type: "positive" },
  { text: "Most likely", type: "positive" },
  { text: "Yes", type: "positive" },
  { text: "Outlook good", type: "positive" },
  { text: "Signs point to yes", type: "positive" },
  { text: "Reply hazy try again", type: "neutral" },
  { text: "Better not tell you now", type: "neutral" },
  { text: "Ask again later", type: "neutral" },
  { text: "Cannot predict now", type: "neutral" },
  { text: "Concentrate and ask again", type: "neutral" },
  { text: "Don't count on it", type: "negative" },
  { text: "Outlook not so good", type: "negative" },
  { text: "My sources say no", type: "negative" },
  { text: "Very doubtful", type: "negative" },
  { text: "My reply is no", type: "negative" }
];

const Magic8Ball: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<typeof ANSWERS[0] | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const shakeBall = () => {
    if (!question.trim() || isShaking) return;

    setIsShaking(true);
    setAnswer(null);

    setTimeout(() => {
      const randomAnswer = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
      setAnswer(randomAnswer);
      setIsShaking(false);
    }, 1500);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 w-full max-w-2xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <HelpCircle className="text-blue-400" />
          Magic 8-Ball
        </h2>
        <p className="text-purple-200">Ask a yes/no question and shake the magic 8-ball</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-purple-300
                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          onKeyDown={(e) => e.key === 'Enter' && shakeBall()}
        />
      </div>

      <div className="relative w-64 h-64 mx-auto mb-8">
        {/* 8-Ball Container with 3D effect */}
        <div className={`w-full h-full rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                      shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden transform-gpu
                      ${isShaking ? 'animate-[shake_0.5s_ease-in-out_infinite]' : 'hover:scale-105 transition-transform duration-300'}
                      before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br 
                      before:from-gray-700/50 before:to-transparent before:rotate-45`}>
          
          {/* Glossy Highlight */}
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-sm"></div>
          
          {/* Number 8 */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl font-bold text-blue-400/30">8</div>

          {/* Answer Window */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-28 h-28 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full
                        flex items-center justify-center p-1 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center p-2
                          shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]">
              {isShaking ? (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              ) : (
                answer && (
                  <p className={`text-white text-sm font-medium text-center p-2
                              animate-[fadeIn_0.5s_ease-out]
                              ${answer.type === 'positive' ? 'text-green-200' : ''}
                              ${answer.type === 'negative' ? 'text-red-200' : ''}`}>
                    {answer.text}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Bottom Reflection */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-1/4 
                        bg-gradient-to-t from-blue-400/10 to-transparent rounded-full blur-sm"></div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={shakeBall}
          disabled={!question.trim() || isShaking}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold
                   hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   flex items-center gap-2 shadow-lg"
        >
          {isShaking ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Shaking...
            </>
          ) : (
            <>
              <HelpCircle className="w-5 h-5" />
              Shake Ball
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Magic8Ball;