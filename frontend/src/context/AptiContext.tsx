'use client';
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Option {
    id: string;
    text: string;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
    correctAnswer: string;
}

interface AptiContextType {
    difficulty: string | null;
    questions: Question[];
    answers: { [key: number]: string };
    testStarted: boolean;
    handleDifficultySelect: (level: string) => void;
    startTest: () => void;
    handleAnswerSelect: (questionId: number, selectedOption: string) => void;
    submitTest: () => void;
}

const AptiContext = createContext<AptiContextType | undefined>(undefined);

export const AptiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [testStarted, setTestStarted] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const router = useRouter();

    const handleDifficultySelect = (level: string) => {
        setDifficulty(level);
        fetchQuestions(level);
    };

    const fetchQuestions = (level: string) => {
        const fetchedQuestions: Question[] = [
            {
                id: 1,
                text: 'What is the capital of France?',
                options: [
                    { id: 'a', text: 'Berlin' },
                    { id: 'b', text: 'Madrid' },
                    { id: 'c', text: 'Paris' },
                    { id: 'd', text: 'Rome' },
                ],
                correctAnswer: 'c',
            },
            {
                id: 2,
                text: 'Which of the following is a prime number?',
                options: [
                    { id: 'a', text: '4' },
                    { id: 'b', text: '6' },
                    { id: 'c', text: '9' },
                    { id: 'd', text: '7' },
                ],
                correctAnswer: 'd',
            },
            // Add more questions here...
        ];
        setQuestions(fetchedQuestions);
    };

    const startTest = () => {
        setTestStarted(true);
    };

    const handleAnswerSelect = (questionId: number, selectedOption: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    const submitTest = () => {
        const correctAnswers = questions.reduce<{ [key: number]: string }>(
            (acc, question) => {
                acc[question.id] = question.correctAnswer;
                return acc;
            },
            {}
        );

        router.push(`/ai/result?answers=${encodeURIComponent(JSON.stringify(answers))}&correctAnswers=${encodeURIComponent(JSON.stringify(correctAnswers))}`);
    };

    return (
        <AptiContext.Provider
            value={{
                difficulty,
                questions,
                answers,
                testStarted,
                handleDifficultySelect,
                startTest,
                handleAnswerSelect,
                submitTest,
            }}
        >
            {children}
        </AptiContext.Provider>
    );
};

export const useAptiContext = () => {
    const context = useContext(AptiContext);
    if (!context) {
        throw new Error('useAptiContext must be used within an AptiProvider');
    }
    return context;
};
