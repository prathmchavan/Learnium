"use client"
import { Slider } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

interface Props {
  onSelect: (level: string) => void;
}

const DifficultySelector: React.FC<Props> = ({ onSelect }) => {
  const [difficulty, setDifficulty] = useState('easy');

  const handleChange = (value: number) => {
    let selectedDifficulty = 'easy';
    if (value === 2) {
      selectedDifficulty = 'moderate';
    } else if (value === 3) {
      selectedDifficulty = 'hard';
    }
    setDifficulty(selectedDifficulty);
    onSelect(selectedDifficulty);
  };

  // Set default difficulty when the component loads
  useEffect(() => {
    onSelect(difficulty);
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Select Difficulty Level</h1>
      <Slider 
        size="sm"
        label={null}  // This removes the numbers above the slider
        defaultValue={1}
        step={1}
        maxValue={3}
        minValue={1}
        onChange={(value) => handleChange(Array.isArray(value) ? value[0] : value)}
        classNames={{
          base: "max-w-md gap-3",
          track: "border-s-secondary-100",
          filler: "bg-gradient-to-r from-secondary-100 to-secondary-500"
        }}
        renderThumb={(props) => (
          <div
            {...props}
            className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
          >
            <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
          </div>
        )}
      />
      <div className="flex justify-between w-full mt-4 text-sm text-white">
        <span>Easy</span>
        <span>Moderate</span>
        <span>Hard</span>
      </div>
   
    </div>
  );
};

export default DifficultySelector;
