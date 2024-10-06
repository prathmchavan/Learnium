"use client"

import { useCommunityContext } from "@/context/CommunityContext";
import { useEffect, useState } from "react";
import { LeftSection } from "../LeftSection";
import { getUser } from "@/hooks/get-user";
import { Answer } from "@/interface/communityTypes";
import { axiosInst } from "@/utils/axios";
import Image from "next/image";

const MyAnswersComp = () => {
    const { fetchAnswers } = useCommunityContext();
    const [answers, setAnswers] = useState<Answer[]>([]); // Initialize as an array

    useEffect(() => {
        const myfunc = async () => {
            const fetchedAnswers = await fetchAnswers();
            if (fetchedAnswers !== undefined) {
                // Fetch user details for each answer
                const answersWithUserDetails = await Promise.all(
                    fetchedAnswers.map(async (answer: any) => {
                        const user = await fetchUserDetails(answer.ownerId);
                        return { ...answer, userName: user.about.name};
                    })
                );
                setAnswers(answersWithUserDetails);
            }
        }
        myfunc()
    }, [])

    const fetchUserDetails = async (userId: string) => {
        try {
            const response = await axiosInst.get(`/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user details:", error);
            return { name: "Unknown User" };
        }
    };

    return (
        <div className='flex flex-col md:flex-row md:my-10 p-6'>
            <LeftSection />
            <div className=" md:space-y-4  md:w-full w-auto md:mx-10 my-5">
                {answers
                    .filter((answer) => answer.ownerId === getUser())
                    .map((answer) => (
                        <div key={answer._id} className="bg-gray-700 p-4 rounded-lg">
                           
                            <div dangerouslySetInnerHTML={{ __html: answer.content }} className=" text-xl" />
                            <div className="text-sm text-gray-400">
                              
                                Posted by {answer.userName || "Unknown User"}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyAnswersComp;