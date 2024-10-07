"use client"
import React from 'react';
import DifficultySelector from '../DifficultySelector';
import TestTimer from '../TestTimer';
import QuestionCard from '../QuestionCard';
import { useAptiContext } from '@/context/AptiContext';
import { Divider, Spinner } from '@nextui-org/react';
import RulesReguComp from './RulesRegu';


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
        <div className="flex flex-col  min-h-screen ">
            {loading && (
                <div className="text-center flex-col justify-center align-middle items-center flex"> <Spinner label="Working on it..." color="success" className='text-white' />Working on it...</div>
            )}

            {!testStarted && (
                <div className='flex justify-center mt-20'>
                    <DifficultySelector onSelect={handleDifficultySelect} />
                </div>
            )}
            {testStarted && !loading && (
                <div className='flex flex-row'>
                    <div className='flex md:flex-col items-center md:px-6 md:w-[700px]'>
                        <RulesReguComp/>
                    </div>
                    <Divider className='bg-white h-[900px]' orientation='vertical'/>
                    <div className='flex flex-col items-left  w-full'>
                        <div className='flex  justify-between items-center space-x-28 px-10 '>
                            <div className=' flex-col flex gap-y-5 items-left'>
                            <h1 className='text-3xl font-bold'>Aptitude Test </h1>
                            <h1 className='text-lg font-semibold'> Level : {difficulty}</h1>
                            </div>
                            <TestTimer duration={1200} />
                        </div>
                        <Divider className='bg-white' orientation='horizontal'/>
                        <div className="w-full max-w-lg mt-4 px-10">
                            {questions.map((question) => (
                                <QuestionCard
                                    key={question.id}
                                    question={question}
                                    onAnswerSelect={handleAnswerSelect}
                                />
                            ))}
                        </div>
                        <div className='item-left flex px-10'>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                            onClick={fetchResults}
                        >
                            Submit Test
                        </button>
                        </div>
                    </div>
                </div>
            )}
            {difficulty && !testStarted && (
                <div className='flex items-center  justify-center'>
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                        onClick={() => startTest(difficulty)}
                    >
                        Start Test
                    </button>
                </div>
            )}
        </div>
    );
};

export default Apti;
