import React, { useEffect, useState } from 'react';
import SlotColumn from './SlotColumn';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const GOOD_FORTUNES = [
  'You will find money in your pocket',
  'You will get a free coffee',
  'You will win a surprise prize',
  'You will run into an old friend',
  'You will get unexpected good news',
  'You will see a double rainbow',
  'You will hear your favorite song',
  'You will get upgraded unexpectedly',
  'You will find the perfect parking spot',
  'You will receive a heartfelt compliment',
  '',
  '',
  ''
];

const BAD_FORTUNES = [
  'You will spill your drink today',
  'You will lose something small but annoying',
  'You will get stuck in traffic',
  'You will miss an important message',
  'You will accidentally drop your phone',
  'You will forget an appointment',
  'You will get caught in a sudden rainstorm',
  'You will find a scratch on something new',
  'You will run out of your favorite snack',
  'You will misplace your keys',
  '',
  '',
  ''
];

interface SlotMachineProps {
  isSpinning: boolean;
  setIsSpinning: (value: boolean) => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ isSpinning, setIsSpinning }) => {
  const [results, setResults] = useState(['Monday', '', '']);

  useEffect(() => {
    if (isSpinning) {
      const spinDuration = 2000;
      const stopTime = Date.now() + spinDuration;

      const animate = () => {
        if (Date.now() < stopTime) {
          setResults([
            DAYS[Math.floor(Math.random() * DAYS.length)],
            GOOD_FORTUNES[Math.floor(Math.random() * GOOD_FORTUNES.length)],
            BAD_FORTUNES[Math.floor(Math.random() * BAD_FORTUNES.length)],
          ]);
          requestAnimationFrame(animate);
        } else {
          setResults([
            DAYS[Math.floor(Math.random() * DAYS.length)],
            GOOD_FORTUNES[Math.floor(Math.random() * GOOD_FORTUNES.length)],
            BAD_FORTUNES[Math.floor(Math.random() * BAD_FORTUNES.length)],
          ]);
          setIsSpinning(false);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isSpinning, setIsSpinning]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-purple-950/50 p-4 md:p-6 rounded-xl border-2 border-white/10 w-full max-w-6xl mx-auto">
      <SlotColumn label="Day" value={results[0]} spinning={isSpinning} />
      <SlotColumn label="Good Fortune" value={results[1]} spinning={isSpinning} type="good" />
      <SlotColumn label="Bad Fortune" value={results[2]} spinning={isSpinning} type="bad" />
    </div>
  );
};

export default SlotMachine;