"use client"
import { Chip } from '@nextui-org/react';
import {  IconChevronDown, IconMessageCircle, IconThumbUp, IconEye} from '@tabler/icons-react';
import Link from 'next/link';
import { LeftSection } from '../LeftSection';
import { RightSection } from '../RightSection';

export default function QuestionsPage() {
  const questions = [
    {
      id: 1,
      user: "Zubayer Bin Matin",
      title: "How to center a div?",
      tags: ["HTML", "CSS"],
      votes: 2,
      answers: 2,
      views: 57,
    },
    // Add more questions as needed
  ];
  const topContributors = [
    { name: "Jasjeet Kumar", title: "Building Aumya | Frontend Dev |", answers: 10 },
    { name: "Vansh Chopra", title: "RCB Developer | Ex-FC | Former TA", answers: 8 },
    // Add more contributors as needed
  ];

  return (
    <div className="min-h-screen  text-white flex">
      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="flex items-center justify-center align-middle gap-10">
          <input
            type="text"
            placeholder="Search Here"
            className="w-96 p-2 border-[#432c83] border-2 bg-black rounded-2xl text-white"
          />
          <button className="border-[#432c83] border-2 p-2 rounded-xl flex items-center">
            Sort By
            <IconChevronDown className="ml-2" />
          </button>
        </div>
        <div className='flex flex-row my-10'>
          <LeftSection/>
          {/* Questions List */}
          <div className=" space-y-4 w-full mx-10">
            {questions.map((question) => (
              <Link href={`/community/${question.id}`} key={question.id}>
                <div key={question.id} className="bg-gradient-to-l from-[#381d77b0] to-[#4c1d77b0] p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold">{question.title}</h3>
                      <div className='flex my-2 gap-2'>
                        {question.tags.map((t, index) => (
                          <Chip color="success" variant="dot">
                            <h1 className='text-white'>{t}</h1>
                          </Chip>
                        ))}
                      </div>

                    </div>
                  </div>
                  <div className="mt-2 text-gray-400 flex space-x-4">
                    <span className="flex items-center space-x-1">
                      <IconThumbUp className="h-4 w-4" /> <span>{question.votes} Votes</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <IconMessageCircle className="h-4 w-4" /> <span>{question.answers} Answers</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <IconEye className="h-4 w-4" /> <span>{question.views} Views</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        <RightSection/>
        </div>
      </main>
    </div>
  );
}
