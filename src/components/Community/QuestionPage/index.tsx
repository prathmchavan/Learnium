"use client"
import { Chip } from '@nextui-org/react';
import { IconChevronDown, IconMessageCircle, IconThumbUp, IconEye, IconArrowUpCircle, IconBallpen } from '@tabler/icons-react';
import Link from 'next/link';
import { LeftSection } from '../LeftSection';
import { RightSection } from '../RightSection';
import { DropDownComp } from '../DropDown';


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

  const itemsMenu = [
    { key: "questions", label: "My Questions", icon: <IconArrowUpCircle className="h-5 w-5" /> },
    { key: "answers", label: "My Answers", icon: <IconMessageCircle className="h-5 w-5" /> },
    { key: "post", label: "Post Question", icon: <IconBallpen className="h-5 w-5" /> }
  ];

  const itemsSort = [
    { key: "questions", label: "My Questions", icon: <IconArrowUpCircle className="h-5 w-5" /> },
    { key: "answers", label: "My Answers", icon: <IconMessageCircle className="h-5 w-5" /> },
    { key: "post", label: "Post Question", icon: <IconBallpen className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen  text-white flex overflow-x-hidden">
      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-10 gap-5">
          <input
            type="text"
            placeholder="Search Here"
            className="md:w-96 w-full p-2 border-[#432c83] border-2 bg-black rounded-2xl text-white"
          />
          <div className='flex flex-row gap-5'>

            <DropDownComp 
            title='Sort By' 
            buttonVariant="shadow"
            className="custom-dropdown"
            items={itemsSort}/>

            {/* Dropdown for mobile screens */}
            <DropDownComp
              title="Menu"
              buttonVariant="shadow"
              className="custom-dropdown"
              items={itemsMenu}
            />
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:my-10'>
          <LeftSection />
          {/* Questions List */}
          <div className=" md:space-y-4 md:w-full w-auto md:mx-10 my-5">
            {questions.map((question) => (
              <Link href={`/community/${question.id}`} key={question.id}>
                <div key={question.id} className="bg-gradient-to-l from-[#381d77b0] to-[#4c1d77b0] p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <h3 className="md:text-lg font-bold text-md">{question.title}</h3>
                      <div className='flex my-2 gap-2'>
                        {question.tags.map((t, index) => (
                          <Chip color="success" variant="dot" size='sm'>
                            <h1 className='text-white'>{t}</h1>
                          </Chip>
                        ))}
                      </div>

                    </div>
                  </div>
                  <div className="mt-2 text-gray-400 flex space-x-4">
                    <span className="flex items-center space-x-1">
                      <IconThumbUp className="h-4 w-4" /> <span>{question.votes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <IconMessageCircle className="h-4 w-4" /> <span>{question.answers} </span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <IconEye className="h-4 w-4" /> <span>{question.views}</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <RightSection />
        </div>
      </main>
    </div>
  );
}
