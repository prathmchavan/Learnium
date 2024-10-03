"use client"
import React from 'react';
import DifficultySelector from '../DifficultySelector';
import TestTimer from '../TestTimer';
import QuestionCard from '../QuestionCard';
import { useAptiContext } from '@/context/AptiContext';
import { Spinner } from '@nextui-org/react';


const Apti: React.FC = () => {
    const {
        difficulty,
        questions,
        testStarted,
        handleDifficultySelect,
        startTest,
        handleAnswerSelect,
        fetchResults,
        loading
    } = useAptiContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            {loading && (
               <div className="text-center flex-col justify-center align-middle items-center flex"> <Spinner label="Working on it..." color="success" className='text-white'/>Working on it...</div>
            )}

            {!testStarted && (
                <DifficultySelector onSelect={handleDifficultySelect} />
            )}

            {testStarted && !loading && (
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
                        onClick={fetchResults}
                    >
                        Submit Test
                    </button>
                </>
            )}
            {difficulty && !testStarted && (
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                    onClick={() => startTest(difficulty)}
                >
                    Start Test
                </button>
            )}
        </div>
    );
};

export default Apti;
