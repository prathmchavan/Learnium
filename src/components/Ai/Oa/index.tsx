"use client"
import React from 'react';
import DifficultySelector from '../DifficultySelector';
import TestTimer from '../TestTimer';
import EditorComponent from '@/components/CodeEditor/EditorComponent';
import { useOaContext } from '@/context/OaContext';
import { Spinner } from '@nextui-org/react';

const Oa: React.FC = () => {
    const {
        difficulty,
        testStarted,
        handleDifficultySelect,
        startTest,
        submitTest,
        questions,
        loading
    } = useOaContext();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
             {loading && (
               <div className="text-center flex-col justify-center align-middle items-center flex"> <Spinner label="Working on it..." color="success" className='text-white'/>Working on it...</div>
            )}
            
            {!testStarted && (
                <>
                    <DifficultySelector onSelect={handleDifficultySelect} />
                </>
            ) } 
            {testStarted && !loading &&(
                <>
                    <TestTimer duration={1200} />
                    <div className="w-full max-w-lg text-white">
                        {questions ? (
                            <div className="mb-4 text-white">
                                <h3 className="text-lg font-semibold">
                                    Question {questions.id}
                                </h3>
                                <p className="text-base">
                                    {questions.text}
                                </p>
                            </div>
                        ) : (
                            <p className="text-white">Loading question...</p>
                        )}
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
                    onClick={()=>{startTest(difficulty)}}
                >
                    Start Test
                </button>
            )}
        </div>
    );
};

export default Oa;
