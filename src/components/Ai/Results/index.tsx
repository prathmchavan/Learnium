"use client"
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { useAptiContext } from '@/context/AptiContext';
import { useOaContext } from '@/context/OaContext';
import { Spinner } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { div } from 'three/webgpu';

const Results: React.FC = () => {
    const { resu } = useAptiContext();
    const { result } = useOaContext();
    const [reporpata, setReporpata] = useState<any>(null);
    const path = usePathname();

    useEffect(() => {
        if (resu) {
            setReporpata(resu);

        }
        if (result) {
            setReporpata(result)
        }
    }, [resu, result]);


    if (!reporpata) {
        return <div className="text-center flex-col justify-center align-middle items-center flex"> <Spinner color="success" className='text-white' />Working on it...</div>;
    }

    const { reportCard, answerSheet } = reporpata;
    console.log(answerSheet)

    const isAptiResult = path === '/ai/apti/result';
    const isOaResult = path === '/ai/oa/result';

    return (

            <BackgroundBeamsWithCollision className='h-full'>
        <div className="flex flex-col items-center justify-center min-h-screen  p-4 backdrop-blur-2xl">
            {isAptiResult && (
                    
                <div className='flex flex-col  '>
                    <h1 className="text-3xl font-bold mb-4 text-center">Test Results</h1>
                    {/* Display the Quiz Report Card */}
                    <div className="w-full flex flex-col gap-10">
                        <div className='flex flex-row gap-5'>
                            <div className='rounded-xl bg-gray-950 border-2 border-[#6242b8] md:w-72 bg-[#FFFFFF1A]'>
                                <h1 className='text-center text-3xl font-bold py-3'>{reportCard.totalQuestions}</h1>
                                <p className="text-lg font-medium pt-2 capitalize text-center py-3">Total number of questions</p>
                            </div>
                            <div className='rounded-xl bg-gray-950 border-2 border-[#14AE5C] md:w-72 bg-[#FFFFFF1A]'>
                                <h1 className='text-center text-3xl font-bold py-3'>{reportCard.correctAnswers}</h1>
                                <p className="text-lg font-medium pt-2 capitalize text-center py-3">Number of correct answers</p>
                            </div>
                            <div className='rounded-xl bg-gray-950 border-2 border-[#EC221F] md:w-72 bg-[#FFFFFF1A]'>
                                <h1 className='text-center text-3xl font-bold py-3'>{reportCard.incorrectAnswers}</h1>
                                <p className="text-lg font-medium pt-2 capitalize text-center py-3">Number of incorrect answers</p>
                            </div>
                            <div className='rounded-xl bg-gray-950 border-2 border-[#b640ac] md:w-72 bg-[#FFFFFF1A]'>
                                <h1 className='text-center text-3xl font-bold py-3'>{reportCard.score}%</h1>
                                <p className="text-lg font-medium pt-2 capitalize text-center py-3">Score</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <h1 className="text-3xl font-bold mb-4 text-center">
                                Feedback
                            </h1>
                            <div className='flex flex-col text-center gap-5'>
                                <h2 className="text-xl font-bold text-center capitalize">
                                    Top Strength
                                </h2>
                                <p>
                                    {reportCard.feedback.strengths}
                                </p>
                            </div>
                            <div className='flex flex-col text-center gap-5'>
                                <h2 className="text-xl font-bold text-center capitalize">Areas for improvement</h2>
                                <p>
                                    {reportCard.feedback.improvements}
                                </p>
                            </div>
                            <p className="text-lg font-medium pt-2 capitalize text-center py-3"> </p>
                        </div>
                    </div>
                    {/* Display the Answersheet */}
                    <div className="w-full text-white my-5">
                        <h2 className="text-xl font-semibold text-center my-5">Answersheet</h2>
                        <div>
                            {answerSheet.map((item: any) => {
                                const isCorrect = item.userAnswer === item.correctAnswer; // Check if the answer is correct
                                return (
                                    <div key={item.questionId} className='flex flex-col gap-2'>
                                        <p className="">{item.questionId}) {item.question} </p>
                                        <p className="text-gray-400">Your Answer : {item.userAnswer ?? 'No answer selected'}</p>
                                        <p className="text-green-500">Correct Answer : {item.correctAnswer}</p>
                                        <p className={`${isCorrect ? 'text-green-500' : 'text-red-500'} mb-2`}>
                                            {isCorrect ? 'Correct' : 'Incorrect'}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
            {isOaResult && (
                <>
                    <h1 className="text-3xl font-bold mb-4">OA Test Results</h1>

                    {/* Display the Quiz Report Card */}
                    <div className="w-full max-w-lg bg-gray-700 shadow-md rounded p-4 mb-4">
                        <h2 className="text-xl font-semibold mb-2">Quiz Report Card</h2>
                        <p className="text-lg font-medium mb-2">Feedback: {reportCard.feedback}</p>
                    </div>

                    {/* Display the Answersheet */}
                    <div className="w-full max-w-lg bg-gray-700 shadow-md rounded p-4">
                        <h2 className="text-xl font-semibold mb-2">Answersheet</h2>

                        {reportCard.answerSheet.map((item: any, index: number) => (
                            // <tr key={index}>
                            //     <p className="border border-gray-600 p-2">{item.question }</p>
                            //     <p className="border border-gray-600 p-2">{item.userAnswer}</p>
                            //     <p className="border border-gray-600 p-2">
                            //         <pre>{item.correctAnswer}</pre>
                            //     </p>
                            // </tr>
                            <div className=' text-white '>
                                <h1>Question : <br /> {item.question}</h1>
                                <br />
                                <p>Your Answer: <br />{item.userAnswer}</p>
                                <br />
                                <p>Correct Answer :<br />{item.correctAnswer}</p>
                            </div>
                        ))}


                    </div>
                </>
            )}
        </div>
            </BackgroundBeamsWithCollision>
    );
};

export default Results;
