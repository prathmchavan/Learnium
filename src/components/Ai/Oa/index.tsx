'use client';
import React from 'react';
import DifficultySelector from '../DifficultySelector';
import TestTimer from '../TestTimer';
import EditorComponent from '@/components/CodeEditor/EditorComponent';
import { useOaContext } from '@/context/OaContext';

const Oa: React.FC = () => {
    const {
        difficulty,
        testStarted,
        handleDifficultySelect,
        startTest,
        submitTest,
        questions
    } = useOaContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {!testStarted ? (
                <>
                <h1 className="text-3xl font-bold mb-4">Select Difficulty Level</h1>
                <DifficultySelector onSelect={handleDifficultySelect} />
                </>
            ) : (
                <>
                    <TestTimer duration={1200} />
                    <div className="w-full max-w-lg text-white">
                        {questions.map((question) => (
                            <div key={question.id} className="mb-4 text-white">
                                <h3 className="text-lg font-semibold">
                                    Question {question.id}
                                </h3>
                                <p className="text-base">
                                    {question.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full max-w-lg mt-4">
                        <EditorComponent />
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

export default Oa;
