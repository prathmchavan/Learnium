"use client"
import { Answer, CommunityContextTypes, Question } from "@/interface/communityTypes";
import { axiosInst } from "@/utils/axios";
import { enqueueSnackbar } from "notistack";
import { createContext, ReactNode, useContext, useState } from "react"

const CommunityContext = createContext<CommunityContextTypes | undefined>(undefined);

export const useCommunityContext = () => {
    const context = useContext(CommunityContext);
    if (!context) {
        enqueueSnackbar("useCommunityContext must be used within a CommunityProvider", { variant: "error" });
        throw new Error("useCommunityContext must be used within a CommunityProvider");
    }
    return context;
}

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
    const [questions, setQuestions] = useState<Question[]>([])

    const createQuestion = async (questionData: Question) => {
        try {
            const res = await axiosInst.post(`question`, questionData);
            console.log(res.data);
            setQuestions((prevQuestions) => [...prevQuestions, res.data]);
            return res.data;
        } catch (error: any) {
            enqueueSnackbar({ message: "Error creating question , Try again in sometimes", variant: "error" })
            console.log("Error Occurred", error.message)
        }
    }

    const fetchQuestions = async () => {
        try {
            const res = await axiosInst.get(`question?limit=10&offset=0`);
            // console.log(res.data.data);
            setQuestions(res.data.data)
        } catch (error: any) {
            enqueueSnackbar({ message: "Error creatin question , Try again in sometimes", variant: "error" })
            console.log("Error Occurred", error.message)
        }
    }

    const getQuestion = async (id: string) => {
        try {
            const res = await axiosInst.get(`question/${id}`)
            // console.log(res.data)
            return res.data;
        } catch (error: any) {
            enqueueSnackbar({ message: "Error creatin question , Try again in sometimes", variant: "error" })
            console.log("Error Occurred", error.message)
        }
    }

    const writeAnswer = async (answerData: Answer) => {
        try {
            const res = await axiosInst.post(`answers`, answerData);
            // console.log("answer submitted",res.data)
            return res.data.id
        } catch (error: any) {
            console.log("Error Occurred ", error.message)
        }
    }

    const fetchAnswers = async () => {
        try {
            const res = await axiosInst.get(`answers?limit=10&offset=0`);
            console.log("this is all answer from server", res.data.data)
            return res.data.data
        } catch (error: any) {
            console.log("Error Occurred", error.message)
        }
    }

    return (
        <CommunityContext.Provider value={{
            questions,
            fetchQuestions,
            createQuestion,
            getQuestion,
            fetchAnswers,
            writeAnswer
        }}>
            {children}
        </CommunityContext.Provider>
    )
}


