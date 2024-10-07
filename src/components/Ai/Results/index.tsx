"use client"
import { useAptiContext } from '@/context/AptiContext';
import { useOaContext } from '@/context/OaContext';
import { Spinner } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { div } from 'three/webgpu';

const Results: React.FC = () => {
    const { resu } = useAptiContext();
    const{result} = useOaContext();
    const [reportData, setReportData] = useState<any>(null);
    const path = usePathname();

    useEffect(() => {
        if (resu) {
            setReportData(resu);

        }
        if(result)
        {
            setReportData(result)
        }
    }, [resu , result]);


    if (!reportData) {
        return <div className="text-center flex-col justify-center align-middle items-center flex"> <Spinner label="Working on it..." color="success" className='text-white'/>Working on it...</div>;
    }

    const { reportCard, answerSheet } = reportData;

    const isAptiResult = path === '/ai/apti/result';
    const isOaResult = path === '/ai/oa/result';

    return (

        <div className="flex flex-col items-center justify-center min-h-screen  p-4 backdrop-blur-2xl">
            {isAptiResult && (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Test Results</h1>

                    {/* Display the Quiz Report Card */}
                    <div className="w-full max-w-lg bg-gray-700 shadow-md rounded p-4 mb-4">
                        <h2 className="text-xl font-semibold mb-2">Quiz Report Card</h2>
                        <p className="text-lg font-medium mb-2">Total number of questions: {reportCard.totalQuestions}</p>
                        <p className="text-lg font-medium mb-2">Number of correct answers: {reportCard.correctAnswers}</p>
                        <p className="text-lg font-medium mb-2">Number of incorrect answers: {reportCard.incorrectAnswers}</p>
                        <p className="text-lg font-medium mb-2">Score: {reportCard.score}%</p>
                        <p className="text-lg font-medium mb-2">Feedback: {reportCard.feedback}</p>
                    </div>

                    {/* Display the Answersheet */}
                    <div className="w-full max-w-lg bg-gray-700 shadow-md rounded p-4">
                        <h2 className="text-xl font-semibold mb-2">Answersheet</h2>
                        <table className="w-full table-auto border-collapse border border-gray-800">
                            <thead>
                                <tr>
                                    <th className="border border-gray-600 p-2">Question ID</th>
                                    <th className="border border-gray-600 p-2">Question Text</th>
                                    <th className="border border-gray-600 p-2">User Answer</th>
                                    <th className="border border-gray-600 p-2">Correct Answer</th>
                                    <th className="border border-gray-600 p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {answerSheet.map((item: any) => {
                                    const isCorrect = item.userAnswer === item.correctAnswer; // Check if the answer is correct
                                    return (
                                        <tr key={item.questionId}>
                                            <td className="border border-gray-600 p-2">{item.questionId}</td>
                                            <td className="border border-gray-600 p-2">{item.questionText}</td>
                                            <td className="border border-gray-600 p-2">{item.userAnswer ?? 'No answer selected'}</td>
                                            <td className="border border-gray-600 p-2">{item.correctAnswer}</td>
                                            <td className={`border border-gray-600 p-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                                {isCorrect ? 'Correct' : 'Incorrect'}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
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
                                    //     <td className="border border-gray-600 p-2">{item.question }</td>
                                    //     <td className="border border-gray-600 p-2">{item.userAnswer}</td>
                                    //     <td className="border border-gray-600 p-2">
                                    //         <pre>{item.correctAnswer}</pre>
                                    //     </td>
                                    // </tr>
                                    <div className=' text-white '>
                                        <h1>Question : <br/> {item.question}</h1>
                                        <br/>
                                        <p>Your Answer: <br/>{item.userAnswer}</p>
                                        <br/>
                                        <p>Correct Answer :<br/>{item.correctAnswer}</p>
                                    </div>
                                ))}
                           
                       
                    </div>
                </>
            )}
        </div>
    );
};

export default Results;
