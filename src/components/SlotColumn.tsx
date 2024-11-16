import React from 'react';
import { Clover, Skull } from 'lucide-react';

interface SlotColumnProps {
  label: string;
  value: string;
  spinning: boolean;
  type?: 'good' | 'bad';
}

const SlotColumn: React.FC<SlotColumnProps> = ({ label, value, spinning, type }) => {
  const getIcon = () => {
    if (!value) return null;
    if (type === 'good') return <Clover className="w-5 h-5 text-green-400" />;
    if (type === 'bad') return <Skull className="w-5 h-5 text-red-400" />;
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-purple-200 text-sm mb-2">{label}</div>
      <div
        className={`
          w-full h-24 bg-white/5 rounded-lg flex items-center justify-center p-4
          border border-white/10 backdrop-blur-sm
          ${spinning ? 'animate-pulse' : 'transform transition-all duration-500'}
        `}
      >
        <div className="text-center">
          {getIcon()}
          <div className={`
            text-white font-medium mt-1 text-sm
            ${spinning ? 'blur-sm' : ''}
            ${type === 'good' ? 'text-green-400' : ''}
            ${type === 'bad' ? 'text-red-400' : ''}
          `}>
            {value || '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotColumn;