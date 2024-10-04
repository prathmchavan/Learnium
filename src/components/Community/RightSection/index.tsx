"use client"
import { Question } from "@/interface/communityTypes";
import { IconArrowRight } from "@tabler/icons-react";

export const RightSection = ({questions}:{questions:Question[]}) => {
  return (
      <div className="hidden md:block md:w-96 border-[#7437FF] border-2 mx-4 md:h-96 rounded-xl p-4">
          <h2 className="text-lg font-bold">Top Questions</h2>
          <ul className="mt-4 space-y-5">
            {questions.map((question,index)=>(
                <div className="flex justify-between">
                <li className="text-sm text-gray-400 cursor-pointer">{index+1}) {question.title}</li> <IconArrowRight color="gray"/>
                </div>
            ))}
          </ul>
      </div>
  );
};
