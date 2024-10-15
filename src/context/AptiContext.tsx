"use client"
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ApiUrl_Gen, ApiUrl_Gendev } from '@/constant/secrets';
import { enqueueSnackbar } from 'notistack';
import { axiosInst } from '@/utils/axios';



interface Option {
    id: string;
    text: string;
}

interface Feedback {
    strengths: string;
    improvements: string;
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
    feedback: Feedback;
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
    loading: boolean;
    testStarted: boolean;
    handleDifficultySelect: (level: string) => void;
    startTest: (difficulty: string) => void;
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
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleDifficultySelect = async (level: string) => {
        setDifficulty(level);

    };

    const fetchQuestions = async (level: string) => {
        try {
            setLoading(true);
            // console.log(level,"this is difficulty")
            const response = await axios.post(`${ApiUrl_Gen}/ai/aptiquestion`, { level });
            // // Optional: Remove code block tags if present
            // response = response
            const fetchedQuestions: Question[] = response.data.map((item: any) => ({
                id: item.id,
                text: item.text,
                options: item.options,
                correctAnswer: item.correctAnswer,
            }));

            console.log(response)
            setQuestions(fetchedQuestions);
        } catch (error: any) {
            if (error.status === 500) {
                enqueueSnackbar({
                    message: "Ai is under maintainance, please try again later",
                    variant: "error"
                });
            }
            console.log("error at question generation", error)
            throw new Error(error)
        }
        finally {
            setLoading(false); // Set loading to false when fetching ends
        }
    };

    const startTest = async (difficulty: any) => {
        setTestStarted(true);
        await fetchQuestions(difficulty);
    };

    const handleAnswerSelect = (questionId: number, selectedOption: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };


    const fetchResults = async () => {
        try {
            setLoading(true);
            const data = JSON.stringify({ questions, answers });
            const res = await axios.post(`${ApiUrl_Gen}/ai/aptiresult`, { data });
            // const res = await  axios.post(`${ApiUrl_Gendev}/ai/result`, { data });
            // console.log("this is the data",res.data)
            saveResult(res.data);
            setResult(res.data);
            router.push(`/ai/apti/result`);
        } catch (error) {
            console.error("Error in fetching results:", error);
            enqueueSnackbar({message:'Cannot generate result at the moment you can close the window' ,variant:'error'})
        }
        finally {
            setLoading(false);
        }
    };

    const saveResult = async (data: any) => {
        try {
            const updatedData = {
                testDate: new Date().toISOString().split('T')[0],
                testType: 'Aptitude Test',
                difficulty: difficulty,
                totalQuestions: data.reportCard?.totalQuestions || 0,
                correctAnswers: data.reportCard?.correctAnswers || 0,
                incorrectAnswers: data.reportCard?.incorrectAnswers || 0,
                score: Math.round(data.reportCard?.score) || 0,
                feedBack: {
                    strengths: data.reportCard?.feedback?.strengths || "",
                    improvements: data.reportCard?.feedback?.improvements || ""
                },
                answerSheet: [...data.answerSheet]
            }
            // console.log("this is the data for saving",data)
            // console.log("this is updated data",updatedData)
            const res = await axiosInst.post(`ai/aptiresult`,updatedData)
            // console.log("data sent",res.data)
        } catch (error: any) {
            console.log(error.message)
        }
    }

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
                resu,
                loading,
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
