"use client"
import React, { useState } from 'react';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface Props {
  question: Question;
  onAnswerSelect: (questionId: number, selectedOption: string) => void;
}

const QuestionCard: React.FC<Props> = ({ question, onAnswerSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    onAnswerSelect(question.id, optionId);
  };

  return (
    <div className=" shadow-md rounded p-4 mb-4 w-full">
      <p className="text-lg mb-4"> {question.id}) {question.text}</p>
      {question.options.map((option) => (
        <div key={option.id} className="mb-2">
          <input
            type="radio"
            id={`${question.id}-${option.id}`}
            name={`question-${question.id}`}
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => handleOptionSelect(option.id)}
          />
          <label htmlFor={`${question.id}-${option.id}`} className="ml-2">
            {option.text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
