"use client"

import { IconMessageCircle, IconThumbUp, IconEye } from '@tabler/icons-react';
import { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

export default function QuestionDetail({params} :{params:{id: string}}) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());


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
  const [newAnswer, setNewAnswer] = useState("");

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnswerData = {
      id: answers.length + 1,
      user: "You", // This should be replaced with the logged-in user's data
      content: newAnswer,
      votes: 0,
    };
    setAnswers([...answers, newAnswerData]);
    setNewAnswer("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center py-10">
      <div className="w-full max-w-3xl">
        {/* Question Details */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
          <div className="text-gray-400 mb-4">
            <span>{question.user}</span> • 
            <span> {question.views} views •</span>
            <span> {question.votes} votes</span>
          </div>
          <p className="text-gray-300 mb-4">{question.content}</p>
          <div className="flex space-x-4 text-gray-400">
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

        {/* Answers Section */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Answers</h2>
          {answers.length > 0 ? (
            answers.map((answer) => (
              <div key={answer.id} className="mb-4 bg-gray-700 p-4 rounded-lg">
                <div className="text-sm text-gray-400">{answer.user}</div>
                <p className="text-gray-300">{answer.content}</p>
                <div className="flex space-x-2 text-gray-400 mt-2">
                  <span className="flex items-center space-x-1">
                    <IconThumbUp className="h-4 w-4" /> <span>{answer.votes} Votes</span>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No answers yet. Be the first to answer!</p>
          )}
        </div>

        {/* Answer Form */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Your Answer</h2>
          <form onSubmit={handleAnswerSubmit}>
            <textarea
              className="w-full p-2 bg-gray-700 text-white rounded-lg mb-4"
              rows={4}
              placeholder="Write your answer here..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 px-4 py-2 rounded-lg text-white hover:bg-indigo-500"
            >
              Submit Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
