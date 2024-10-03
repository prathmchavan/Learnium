"use client"

import { ApiUrl_Gen } from "@/constant/secrets";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Question {
    id: number;
    text: string;
}

interface Runtime {
    language: string;
    version: string;
    aliases: string[];
}
interface Result {
    reportCard: {
        feedback: string;
        answerSheet: {
            question: {
                id: number;
                text: string;
            };
            userAnswer: string;
            correctAnswer: string;
        }[];
    };
}


interface OaContextTypes {
    questions: Question | null;
    testStarted: boolean;
    difficulty: string | null
    handleDifficultySelect: (level: string) => void;
    startTest: (difficulty:string) => void;
    submitTest: () => void;
    code: string;
    languages: Runtime[];
    selectedLanguage: string,
    selectedVersion: string,
    output: string
    runCode: () => void;
    handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setCode: (code: string) => void;
    result: Result | null;
    setResult: (result: Result) => void;
    loading: boolean; 
}

const OaContext = createContext<OaContextTypes | undefined>(undefined);

export const OaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const router = useRouter();

    const [questions, setQuestions] = useState<Question | null>( null);
    const [testStarted, setTestStarted] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    //code editor 
    const [code, setCode] = useState<string>('// Write your code here');
    const [languages, setLanguages] = useState<Runtime[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
    const [selectedVersion, setSelectedVersion] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [result, setResult] = useState<Result | null>(null);

    const handleDifficultySelect = (level: string) => {
        setDifficulty(level);

    }
    const fetchQuestions = async (level: string) => {
        try {
            setLoading(true);
            const response = await axios.post(`${ApiUrl_Gen}/ai/qoa`, { level });
            

            // Handle parsed response as either an array or a single object
            const fetchedQuestions: Question = response.data

            setQuestions(fetchedQuestions);
        } catch (error: any) {
            console.log("Error Fetching question:", error.message);
        } finally {
            setLoading(false); // Set loading to false when fetching ends
        }
    };


    const startTest = (difficulty: string) => {
        setTestStarted(true);
        fetchQuestions(difficulty);
    };

    const submitTest = async () => {
        try { 
            setLoading(true);
            const data = {
                questions: questions,
                answers: code,
                lag: selectedLanguage
            };

            

            const res = await  axios.post(`${ApiUrl_Gen}/ai/resultoa`, { data });
       
            setResult(res.data);
            router.push('/ai/oa/result')
        } catch (error: any) {
            console.log("Error in result flow:", error.message);
        } finally {
            setLoading(false); // Set loading to false when fetching ends
        }
    };

    //code editor context

    const runCode = async () => {
        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
                language: selectedLanguage,
                version: selectedVersion,
                files: [
                    {
                        name: `main.${selectedLanguage}`,
                        content: code,
                    },
                ],
            });
            setOutput(response.data.run.output);
        } catch (error) {
            setOutput('Error executing code');
        }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        setSelectedLanguage(lang);
        const version = languages.find((l) => l.language === lang)?.version || '';
        setSelectedVersion(version);
    };

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get('https://emkc.org/api/v2/piston/runtimes');
                setLanguages(response.data);
                setSelectedVersion(response.data.find((lang: Runtime) => lang.language === 'javascript')?.version || '');
            } catch (error) {
                console.error('Error fetching languages', error);
            }
        };
        fetchLanguages();
    }, []);

    return (
        <OaContext.Provider value={{
            questions,
            difficulty,
            testStarted,
            startTest,
            submitTest,
            handleDifficultySelect,
            code,
            languages,
            selectedLanguage,
            selectedVersion,
            output,
            handleLanguageChange,
            runCode,
            setCode,
            result,
            setResult,
            loading
        }}>
            {children}
        </OaContext.Provider>
    );
};

export const useOaContext = () => {
    const context = useContext(OaContext);
    if (!context) {
        throw new Error('useOaContext must be used within an OaProvider');
    }
    return context;
}