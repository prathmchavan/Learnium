"use client";
import { IconMessageCircle, IconThumbUp, IconEye, IconStarFilled, IconStar, IconThumbUpFilled, IconArrowUpCircle, IconBallpen, IconArrowBack, IconArrowLeft } from '@tabler/icons-react';
import { useState } from 'react';
import { EditorState } from 'draft-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quillstyles.css';
import { LeftSection } from '../LeftSection';
import { RightSection } from '../RightSection';
import { DropDownComp } from '../DropDown';
import { useRouter } from 'next/navigation';

export default function QuestionDetail({ params }: { params: { id: string } }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [newAnswer, setNewAnswer] = useState("");
  const [liked, setLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]); // Initialize as an array
  const router = useRouter();
  const question = {
    id: 1,
    user: "Zubayer Bin Matin",
    title: "How to center a div?",
    tags: ["HTML", "CSS"],
    content: "I'm trying to center a div both vertically and horizontally. How can I do that with CSS?",
    votes: 2,
    answers: 2,
    views: 57,
  };

  const initialAnswers = [
    {
      id: 1,
      user: "John Doe",
      content: "You can use flexbox to center the div: `display: flex; justify-content: center; align-items: center;`.",
      votes: 5,
    },
    {
      id: 2,
      user: "Jane Smith",
      content: "Another method is using `margin: auto` if the width and height are fixed.",
      votes: 3,
    },
  ];

  const [answers, setAnswers] = useState(initialAnswers);

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnswerData = {
      id: answers.length + 1,
      user: "You", // Replace with logged-in user's name
      content: newAnswer,
      votes: 0,
    };
    setAnswers([...answers, newAnswerData]);
    setNewAnswer("");
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { color: 'white' }, { background: 'black' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
    'strike', 'blockquote', 'align', 'color', 'background', 'link', 'image'
  ];

  const itemsMenu = [
    { key: "questions", label: "My Questions", icon: <IconArrowUpCircle className="h-5 w-5" /> },
    { key: "answers", label: "My Answers", icon: <IconMessageCircle className="h-5 w-5" /> },
    { key: "post", label: "Post Question", icon: <IconBallpen className="h-5 w-5" /> }
  ];

  const goback = () => {
    router.back();
  }
  return (
    <div className="min-h-screen text-white flex flex-col md:flex-row justify-center p-4 md:p-8">
      <div className="md:flex w-full">
        {/* Left Section for larger screens */}
        <div className="hidden md:block">
          <LeftSection />
        </div>
        {/* Dropdown for mobile view */}
        <div className="md:hidden mb-4 justify-between flex align-middle items-center">
          <IconArrowLeft onClick={goback} />

          <DropDownComp
            title="Menu"
            buttonVariant="shadow"
            className="custom-dropdown"
            items={itemsMenu}
          />
        </div>
        {/* Question Details */}
        <div className="space-y-4 w-full mx-auto md:mx-10">
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <h1 className="text-xl md:text-3xl font-bold text-indigo-400 mb-4">
              {question.title}
            </h1>
            <div className="text-gray-400 flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
              <span className="text-sm">{question.user}</span>
              <div className="space-x-4 flex">
                <button className="flex items-center space-x-2 md:px-4 py-2 rounded-lg">
                  {liked ? <IconStarFilled size={20} color="gold" /> : <IconStar size={20} color="white" />}
                  <span className="text-white">{question.votes} </span>
                </button>
                <span className="flex items-center space-x-1 text-white">
                  <IconMessageCircle color="white" className="h-5 w-5" />
                  <span>{question.answers}</span>
                </span>
                <span className="flex items-center space-x-1 text-white">
                  <IconEye className="h-5 w-5" /> <span>{question.views} </span>
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-md mb-4">{question.content}</p>
          </div>

          {/* Answers Section */}
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Answers</h2>
            {answers.length > 0 ? (
              answers.map((answer) => (
                <div key={answer.id} className="mb-4 bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">{answer.user}</div>
                  <p className="text-gray-300 mt-2 text-md">{answer.content}</p>
                  <div className="flex space-x-2 text-gray-400 mt-2">
                    <span className="flex items-center space-x-1">
                      <IconThumbUp className="h-4 w-4" /> <span>{answer.votes}</span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No answers yet. Be the first to answer!</p>
            )}
          </div>

          {/* Answer Form */}
          <div className="border-2 border-[#432c83] p-4 md:p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Your Answer</h2>
            <form onSubmit={handleAnswerSubmit}>
              <ReactQuill
                theme="snow"
                value={newAnswer}
                onChange={setNewAnswer}
                modules={modules}
                formats={formats}
                className="mb-4 text-white rounded-lg quill-toolbar placeholder:text-white"
                placeholder="Write your answer here..."
              />
              <button
                type="submit"
                className="bg-indigo-600 px-4 py-2 rounded-lg text-white hover:bg-indigo-500"
              >
                Submit Answer
              </button>
            </form>
          </div>
        </div>

        {/* Right Section for larger screens */}
        <div className="hidden md:block">
          <RightSection />
        </div>
      </div>
    </div>

  );
}
