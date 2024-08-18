'use client'

import { callOaQuestionGenerationFlow, callOaResultFlow } from "@/app/genkit";
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
    questions: Question[];
    testStarted: boolean;
    difficulty: string | null
    handleDifficultySelect: (level: string) => void;
    startTest: () => void;
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

}

const OaContext = createContext<OaContextTypes | undefined>(undefined);

export const OaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [testStarted, setTestStarted] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<string | null>(null);

    //code editor 
    const [code, setCode] = useState<string>('// Write your code here');
    const [languages, setLanguages] = useState<Runtime[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
    const [selectedVersion, setSelectedVersion] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [result, setResult] = useState<Result | null>(null);

    const handleDifficultySelect = (level: string) => {
        setDifficulty(level);
        fetchQuestions(level);
    }
    const fetchQuestions = async (level: string) => {
        try {
            let res = await callOaQuestionGenerationFlow(level);
            res = res
                .replace(/^\s*```json\s*/i, '')  // Remove leading ```json, case-insensitive
                .replace(/\s*```$/i, '')         // Remove trailing ```, case-insensitive
                .trim();                        // Trim any extra whitespace


            // Remove any remaining backticks or special characters
            res = res.replace(/`+/g, '').trim(); // Remove any backticks and extra whitespace

            // Ensure that any extra whitespace or formatting issues are removed
            res = res.replace(/[\r\n]+/g, ''); // Remove newline characters

            // Parse the cleaned response as JSON
            const parsedRes = JSON.parse(res);

            // Handle parsed response as either an array or a single object
            const fetchedQuestions: Question[] = Array.isArray(parsedRes)
                ? parsedRes.map((item: any) => ({
                    id: item.id,
                    text: item.text
                }))
                : [{
                    id: parsedRes.id,
                    text: parsedRes.text
                }];

            setQuestions(fetchedQuestions);
        } catch (error: any) {
            console.log("Error Fetching question:", error.message);
        }
    };


    const startTest = () => {
        setTestStarted(true);
    };

    const submitTest = async () => {
        try {
            const data = {
                questions: questions,
                answers: code,
                lag: selectedLanguage
            };

            const dataString = JSON.stringify(data);

            let res = await callOaResultFlow(dataString);
            res = res.trim().replace(/^```json|```$/g, '');
            const parsedRes = JSON.parse(res);
            setResult(parsedRes);
            router.push('/ai/oa/result')
        } catch (error: any) {
            console.log("Error in result flow:", error.message);
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
            setResult
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