'use client';
import React from 'react';
import DifficultySelector from '../DifficultySelector';
import TestTimer from '../TestTimer';
import QuestionCard from '../QuestionCard';
import { useAptiContext } from '@/context/AptiContext';


const Apti: React.FC = () => {
    const {
        difficulty,
        questions,
        testStarted,
        handleDifficultySelect,
        startTest,
        handleAnswerSelect,
        submitTest,
    } = useAptiContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Select Difficulty Level</h1>
            {!testStarted ? (
                <DifficultySelector onSelect={handleDifficultySelect} />
            ) : (
                <>
                    <TestTimer duration={1200} />
                    <div className="w-full max-w-lg">
                        {questions.map((question) => (
                            <QuestionCard
                                key={question.id}
                                question={question}
                                onAnswerSelect={handleAnswerSelect}
                            />
                        ))}
                    </div>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                        onClick={submitTest}
                    >
                        Submit Test
                    </button>
                </>
            )}
            {difficulty && !testStarted && (
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                    onClick={startTest}
                >
                    Start Test
                </button>
            )}
        </div>
    );
};

export default Apti;
