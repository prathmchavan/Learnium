'use client';
import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { callMenuSuggestionFlow , callResultFlow} from '@/app/genkit';

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
    submitTest: () => void;
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

    const handleDifficultySelect = (level: string) => {
        setDifficulty(level);
        fetchQuestions(level);
    };

    const fetchQuestions = async (level: string) => {
        try {
            // Assuming 'getAIQuestions' is a function that calls the AI and returns the response
            let response = await callMenuSuggestionFlow(level);

            // Ensure the response is valid JSON by removing any extra characters
            response = response.trim(); // Remove leading/trailing whitespace
            response = response.replace(/^```json|```$/g, ''); // Remove markdown code block tags if present

            const parsedResponse = JSON.parse(response); // Parse the cleaned JSON string

            const fetchedQuestions: Question[] = parsedResponse.map((item: any) => ({
                id: item.id,
                text: item.text,
                options: item.options,
                correctAnswer: item.correctAnswer,
            }));
            setQuestions(fetchedQuestions);

        } catch (error) {
            console.error("Error fetching questions:", error);
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

    const submitTest = () => {
        // const correctAnswers = questions.reduce<{ [key: number]: string }>(
        //     (acc, question) => {
        //         acc[question.id] = question.correctAnswer;
        //         return acc;
        //     },
        //     {}
        // );
        result();

        // router.push(`/ai/result`)
    };

    const result = async () => {
        try {
            // Structure the data as an object
            const data = {
                questions: questions,
                answers: answers
            };
    
            // Convert the structured object to a JSON string
            const dataString = JSON.stringify(data);
    
            // Call the result flow with the stringified object
            let res = await callResultFlow(dataString);
            res = res.trim(); // Remove leading/trailing whitespace
            res = res.replace(/^```json|```$/g, ''); // Remove markdown code block tags if present
            // Parse the response as JSON
            const parsedRes = JSON.parse(res);
    
            setResult(parsedRes); // Set the result with the new structure
            // console.log(parsedRes);
            router.push(`/ai/result`);

        } catch (error) {
            console.error("Error in result flow:", error);
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
                submitTest,
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
};
