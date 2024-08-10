'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Feedback {
  questionId: number;
  question: string;
  correctAnswer: string;
  userAnswer: string | undefined;
}

const Results: React.FC = () => {
  const router = useRouter();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const answers = searchParams.get('answers');
    const correctAnswers = searchParams.get('correctAnswers');
    
    if (answers && correctAnswers) {
      const parsedAnswers = JSON.parse(decodeURIComponent(answers));
      const parsedCorrectAnswers = JSON.parse(decodeURIComponent(correctAnswers));
      
      const feedbackData: Feedback[] = Object.keys(parsedCorrectAnswers).map((id) => {
        const questionId = parseInt(id, 10);
        return {
          questionId,
          question: `Question ${questionId}`, // Replace with actual question text if needed
          correctAnswer: parsedCorrectAnswers[questionId],
          userAnswer: parsedAnswers[questionId],
        };
      });
      
      setFeedback(feedbackData);
    }
  }, []);

  const searchParams = new URLSearchParams(window.location.search);
  const answers = searchParams.get('answers');
  const correctAnswers = searchParams.get('correctAnswers');

  useEffect(() => {
    if (answers && correctAnswers) {
      const parsedAnswers = JSON.parse(decodeURIComponent(answers));
      const parsedCorrectAnswers = JSON.parse(decodeURIComponent(correctAnswers));
      
      const feedbackData: Feedback[] = Object.keys(parsedCorrectAnswers).map((id) => {
        const questionId = parseInt(id, 10);
        return {
          questionId,
          question: `Question ${questionId}`, // Replace with actual question text if needed
          correctAnswer: parsedCorrectAnswers[questionId],
          userAnswer: parsedAnswers[questionId],
        };
      });
      
      setFeedback(feedbackData);
    }
  }, [answers, correctAnswers]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold mb-4">Test Results</h1>
      <div className="w-full max-w-lg bg-gray-700 shadow-md rounded p-4">
        {feedback.map((item, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg">{item.question}</p>
            <p className="text-sm text-green-500">
              Correct Answer: {item.correctAnswer}
            </p>
            <p
              className={`text-sm ${
                item.userAnswer === item.correctAnswer ? 'text-green-500' : 'text-red-500'
              }`}
            >
              Your Answer: {item.userAnswer || 'No answer selected'}
            </p>
            {item.userAnswer !== item.correctAnswer && (
              <p className="text-sm text-yellow-500">
                Feedback: Review this concept.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
