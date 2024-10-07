"use client"
import React from 'react';
import DifficultySelector from '../DifficultySelector';
import TestTimer from '../TestTimer';
import EditorComponent from '@/components/CodeEditor/EditorComponent';
import { useOaContext } from '@/context/OaContext';
import { Divider, Spinner } from '@nextui-org/react';

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
                <div className="text-center flex-col justify-center align-middle items-center flex"> <Spinner label="Working on it..." color="success" className='text-white' />Working on it...</div>
            )}

            {!testStarted && (
                <>
                    <DifficultySelector onSelect={handleDifficultySelect} />
                </>
            )}
            {testStarted && !loading && (
                <div className='flex flex-col w-full my-5'>
                    <div className='flex  justify-between items-center space-x-28 px-10 '>
                        <div className=' flex-col flex gap-y-5 items-left'>
                            <h1 className='text-3xl font-bold'>OA Coding Test </h1>
                            <h1 className='text-lg font-semibold'> Level : {difficulty}</h1>
                        </div>
                        <TestTimer duration={1200} />
                    </div>
                    <Divider className='bg-white' orientation='horizontal' />
                    <div className="w-full my-5 text-white items-center flex justify-center align-middle  text-center">
                        {questions ? (
                            <div className="mb-4 text-white">
                                <h3 className="text-3xl font-bold">
                                    Question {questions.id}
                                </h3>
                                <p className="text-lg my-2 font-semibold ">
                                    {questions.text}
                                </p>
                            </div>
                        ) : (
                            <p className="text-white">Loading question...</p>
                        )}
                    </div>
                    <div className="w-full  mt-4 flex justify-center align-middle">
                        <EditorComponent />
                    </div>
                    <div className='mx-10'>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                            onClick={submitTest}
                        >
                            Submit Test
                        </button>
                    </div>
                </div>
            )}
            {difficulty && !testStarted && (
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                    onClick={() => { startTest(difficulty) }}
                >
                    Start Test
                </button>
            )}
        </div>
    );
};

export default Oa;
