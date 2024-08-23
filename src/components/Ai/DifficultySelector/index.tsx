// components/DifficultySelector.tsx
import React from 'react';

interface Props {
  onSelect: (level: string) => void;
}

const DifficultySelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="flex justify-around w-full max-w-md">
      <button
        onClick={() => onSelect('easy')}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Easy
      </button>
      <button
        onClick={() => onSelect('moderate')}
        className="bg-yellow-500 text-white py-2 px-4 rounded"
      >
        Moderate
      </button>
      <button
        onClick={() => onSelect('hard')}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Hard
      </button>
    </div>
  );
};

export default DifficultySelector;
