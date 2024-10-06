"use client"
import { useCommunityContext } from "@/context/CommunityContext";
import { Chip } from "@nextui-org/react";
import { IconMessageCircle, IconThumbUp } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";
import { LeftSection } from "../LeftSection";
import { getUser } from "@/hooks/get-user";

const MyQuestionComp = () => {
    const { questions, fetchQuestions } = useCommunityContext();

    useEffect(() => {
        fetchQuestions();
    }, [])

    return (
        <div className='flex flex-col md:flex-row md:my-10 p-6'>
            <LeftSection />
            <div className=" md:space-y-4  md:w-full w-auto md:mx-10 my-5">
                {questions
                    .filter((question) => question.ownerId === getUser())
                    .map((question) => (
                        <Link href={`/community/${question._id}`} key={question._id}>
                            <div className="bg-gradient-to-l from-[#381d77b0] to-[#4c1d77b0] p-4 rounded-lg my-5">
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
                                        <h3 className="md:text-lg font-bold text-md">{question.title}</h3>
                                        <div className='flex my-2 gap-2'>
                                            {question.tags?.map((t, index) => (
                                                <Chip color="success" variant="dot" size='sm' key={index}>
                                                    <h1 className='text-white'>{t}</h1>
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 text-gray-400 flex space-x-4">
                                    <span className="flex items-center space-x-1">
                                        <IconThumbUp className="h-4 w-4" />
                                        <h1>{question.votes?.length || 0}</h1>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <IconMessageCircle className="h-4 w-4" />
                                        <h1>{question.answersId?.length || 0}</h1>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                }

            </div>
        </div>
    )
}

export default MyQuestionComp;