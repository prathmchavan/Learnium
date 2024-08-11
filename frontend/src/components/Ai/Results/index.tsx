'use client';
import { useAptiContext } from '@/context/AptiContext';
import React, { useEffect, useState } from 'react';

const Results: React.FC = () => {
    const { resu } = useAptiContext();
    const [reportData, setReportData] = useState<any>(null);

    useEffect(() => {
        if (resu) {
            setReportData(resu);

        }
    }, [resu]); 
  

    if (!reportData) {
        return <div className="text-center">Loading results...</div>;
    }

    const { reportCard, answerSheet } = reportData;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  p-4">
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
                        {answerSheet.map((item : any) => (
                            <tr key={item.questionId}>
                                <td className="border border-gray-600 p-2">{item.questionId}</td>
                                <td className="border border-gray-600 p-2">{item.questionText}</td>
                                <td className="border border-gray-600 p-2">{item.userAnswer ?? 'No answer selected'}</td>
                                <td className="border border-gray-600 p-2">{item.correctAnswer}</td>
                                <td className={`border border-gray-600 p-2 ${item.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                                    {item.isCorrect ? 'Correct' : 'Incorrect'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Results;
