"use client"
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { callQuestionGenerationFlow, callResultFlow } from '@/app/genkit';
import { enqueueSnackbar } from 'notistack';
import { callQuestionGenerationFlow, callResultFlow } from '@/ai/genkit';

interface Option {
    id: string;
    text: string;
}

export interface Question {
    id: number;
    text: string;
    options: Option[];
    correctAnswer: string;
}

interface ReportCard {
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    score: number;
    feedback: string;
}

interface AnswerSheetItem {
    questionId: number;
    questionText: string;
    userAnswer: string | null;
    correctAnswer: string;
    isCorrect: boolean;
}

interface AptiContextType {
    difficulty: string | null;
    questions: Question[];
    answers: { [key: number]: string };
    testStarted: boolean;
    handleDifficultySelect: (level: string) => void;
    startTest: () => void;
    handleAnswerSelect: (questionId: number, selectedOption: string) => void;
    // submitTest: () => void;
    fetchResults: () => void;
    resu: {
        reportCard: ReportCard;
        answerSheet: AnswerSheetItem[];
    } | null;
}

const AptiContext = createContext<AptiContextType | undefined>(undefined);

export const AptiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [testStarted, setTestStarted] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [resu, setResult] = useState<{
        reportCard: ReportCard;
        answerSheet: AnswerSheetItem[];
    } | null>(null);

    const router = useRouter();

    const handleDifficultySelect = async(level: string) => {
        setDifficulty(level);
        await fetchQuestions(level);
    };

    const fetchQuestions = async (level: string) => {
        try {
            
            let response = await callQuestionGenerationFlow(level)
            // Optional: Remove code block tags if present
            response = response
                .replace(/^```json|```$/g, '')
                .trim();
            const fetchedQuestions: Question[] = JSON.parse(response).map((item: any) => ({
                id: item.id,
                text: item.text,
                options: item.options,
                correctAnswer: item.correctAnswer,
            }));
            
            console.log(response)
            setQuestions(fetchedQuestions);
        } catch (error:any) {
            console.log("error at question generation",error )
            // enqueueSnackbar({
            //     message: error?.response?.data?.message || "Some error occurred, please try again",
            //     variant: "error"
            //   });
            throw new Error(error)
            }
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


    const fetchResults = async () => {
        try {
            const data = JSON.stringify({ questions, answers });

            let res = await callResultFlow(data);
            res = res
                .replace(/^```json|```$/g, '')
                .trim();

            const parsedRes = JSON.parse(res);

            setResult(parsedRes);
            router.push(`/ai/apti/result`);

        } catch (error) {
            console.error("Error in fetching results:", error);
        }
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
                fetchResults,
                resu
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
}
