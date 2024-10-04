"use client"
import { IconArrowUpCircle, IconBallpen, IconMessageCircle } from "@tabler/icons-react";
import { PostQuestionModal } from "../PostQuestionModal";

export const LeftSection = () => {
    return (
        <div>
            {/* Div section for larger screens (laptops and monitors) */}
            <div className="hidden md:flex space-y-4 md:w-72 md:h-56 px-10 py-5 rounded-xl md:flex-col border-2 border-[#432c83]">
                <button className="w-full flex items-center justify-between border-[#432c83] border-2 p-2 rounded-xl">
                    My Questions
                    <IconArrowUpCircle className="h-5 w-5" />
                </button>
                <button className="w-full flex items-center justify-between border-[#432c83] border-2 p-2 rounded-xl">
                    My Answers
                    <IconMessageCircle className="h-5 w-5" />
                </button>
                <PostQuestionModal/>
            </div>

         
        </div>
    );
};
