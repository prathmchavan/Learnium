"use client"
import { Chip, Divider } from '@nextui-org/react';
import { IconSearch, IconChevronDown, IconMessageCircle, IconThumbUp, IconEye, IconArrowUpCircle } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

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
      {/* Sidebar */}
      <div className="w-64 h-36 p-4">

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between border-[#432c83] border-2 p-2 rounded">
            My Questions
            <IconArrowUpCircle className="h-5 w-5" />
          </button>
          <button className="w-full flex items-center justify-between border-[#432c83] border-2 p-2 rounded">
            My Answers
            <IconMessageCircle className="h-5 w-5" />
          </button>
        </div>
        {/* <Divider orientation='horizontal' className=' bg-white my-10'/>
        <div>
        <h2 className="text-lg font-bold">Top Questions</h2>
        <ul className="mt-4 space-y-2">
          <li className="text-sm text-gray-400 cursor-pointer">How to center a div?</li>
          <li className="text-sm text-gray-400 cursor-pointer">NextJS - Typescript build failed</li>
          <li className="text-sm text-gray-400 cursor-pointer">How to open a link in a new Tab?</li>
        </ul>
        </div> */}
      </div>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search Here"
            className="w-2/3 p-2 border-[#432c83] border-2 bg-black rounded text-white"
          />
          <button className="border-[#432c83] border-2 p-2 rounded flex items-center">
            Sort By
            <IconChevronDown className="ml-2" />
          </button>
        </div>

        {/* Questions List */}
        <div className="mt-8 space-y-4">
          {questions.map((question) => (
            <Link href={`/community/${question.id}`} key={question.id}>
            <div key={question.id} className="bg-gradient-to-l from-[#381d77b0] to-[#4c1d77b0] p-4 rounded-lg">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">{question.title}</h3>
                  <div className='flex my-2 gap-2'>
                 {question.tags.map((t,index)=>(
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
      </main>

      {/* Right Sidebar */}
      <div className="w-72 border-[#7437FF] border-2 mx-4 h-96 rounded-xl p-4">
        <h2 className="text-lg font-bold">Top Questions</h2>
        <ul className="mt-4 space-y-5">
          <li className="text-sm text-gray-400 cursor-pointer">How to center a div?</li>
          <li className="text-sm text-gray-400 cursor-pointer">NextJS - Typescript build failed</li>
          <li className="text-sm text-gray-400 cursor-pointer">How to open a link in a new Tab?</li>
        </ul>

      </div>
    </div>
  );
}
