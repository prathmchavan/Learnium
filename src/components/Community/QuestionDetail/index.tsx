"use client";
import { IconMessageCircle, IconThumbUp, IconEye, IconStarFilled, IconStar, IconThumbUpFilled, IconArrowUpCircle, IconBallpen, IconArrowBack, IconArrowLeft } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quillstyles.css';
import { LeftSection } from '../LeftSection';
import { DropDownComp } from '../DropDown';
import { useRouter } from 'next/navigation';
import { useCommunityContext } from '@/context/CommunityContext';
import { Answer, Question } from '@/interface/communityTypes';
import { getUser } from '@/hooks/get-user';
import { enqueueSnackbar } from 'notistack';
import { axiosInst } from '@/utils/axios';

const QuestionDetail = ({ params }: { params: { id: string } }) => {
  const [newAnswer, setNewAnswer] = useState("");
  const [liked, setLiked] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>([]); // Initialize as an array
  const { getQuestion, writeAnswer, fetchAnswers } = useCommunityContext();
  const [questionOwner, setQuestionOwner] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      const fetchedQuestion = await getQuestion(params.id);
      if (fetchedQuestion !== undefined) {
        setQuestion(fetchedQuestion);
        if (fetchedQuestion.ownerId) {
          const owner = await fetchUserDetails(fetchedQuestion.ownerId);
          setQuestionOwner(owner);
        }

        const fetchedAnswers = await fetchAnswers();
        if (fetchedAnswers !== undefined) {
          // Fetch user details for each answer
          const answersWithUserDetails = await Promise.all(
            fetchedAnswers.map(async (answer: any) => {
              const user = await fetchUserDetails(answer.ownerId);
              return { ...answer, userName: user.about.name }; // Assuming `user.about.name` holds the name
            })
          );
          setAnswers(answersWithUserDetails);
        }
      }
    };

    fetchQuestionAndAnswers();
  }, [params.id, getQuestion, fetchAnswers]);


  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await axiosInst.get(`/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return { name: "Unknown User" };
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswer.trim()) {
      alert("Answer cannot be empty!");
      return;
    }
    try {
      const userId = getUser();
      // console.log("start")
      if (userId === undefined || !userId || userId === null) {
        enqueueSnackbar({ message: "Please login for submitting your answer", variant: "warning" });
      }
      if (userId && (typeof userId === 'string' || typeof userId === 'number')) {
        // console.log("progress")
        const answerData = {
          content: newAnswer,
          questionId: params.id,
          ownerId: userId,
        };
        const res = await writeAnswer(answerData);
        enqueueSnackbar({ message: "Answer submitted successfully ", variant: "success" });
        await updateQuestion(res);
        console.log("data", res)
        setNewAnswer("");
      }
      // console.log("end")
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("An error occurred while submitting your answer. Please try again.");
    }
  };

  const updateQuestion = async (answerId: string) => {
    try {
      if (!question) {
        console.error("Question data is undefined");
        return;
      }
      const updatedData = {
        title: question.title,
        content: question.content,
        tags: question.tags,
        votes: question.votes,
        views: question.views,
        ownerId: question.ownerId,
        answersId: [...(question.answersId || []), answerId],
      };
      const res = await axiosInst.patch(`question/${params.id}`, updatedData);
    } catch (error: any) {
      console.log("Error occurred during update:", error.message);
    }
  };

  const handleLike = async () => {
    const currentUser = getUser();
    if (!currentUser) {
      enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
      return;
    }
    const previousLikedState = liked;
    const updatedLiked = !liked;
    setLiked(updatedLiked);
    const updatedUpvotes = updatedLiked
      ? [...(Array.isArray(question?.votes) ? question.votes : []), currentUser]
      : (Array.isArray(question?.votes) ? question.votes.filter((id: string) => id !== currentUser) : []);
    try {
      await axiosInst.patch(`question/${params.id}`, {
        title: question?.title,
        content: question?.content,
        tags: question?.tags,
        votes: updatedUpvotes,
        views: question?.views,
        ownerId: question?.ownerId,
        answersId: question?.answersId
      });
      setQuestion(prev => {
        if (prev) {
          return { ...prev, votes: updatedUpvotes };
        }
        return prev;
      });
    } catch (error) {
      console.error("Error updating like status:", error);
      setLiked(previousLikedState);
    }
  };

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
              {question?.title}
            </h1>
            <div className="text-gray-400 flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
              <span className="text-sm">Posted By {questionOwner?.about?.name}</span>
              <div className="space-x-4 flex">
                <button onClick={handleLike} className="flex items-center space-x-2 py-2 rounded-lg text-white">
                  {liked ? <IconStarFilled size={20} color="gold" /> : <IconStar size={20} />}
                  <h1>{question?.votes?.length ? question?.votes.length : 0}</h1>
                </button>
                <span className="flex items-center space-x-1 text-white">
                  <IconMessageCircle color="white" className="h-5 w-5" />
                  <h1>{question?.answersId?.length ? question?.answersId.length : 0}</h1>
                </span>
                {/* <span className="flex items-center space-x-1 text-white">
                  <IconEye className="h-5 w-5" />
                  <h1>{question?.views?.length ? question?.views.length : 0}</h1>
                </span> */}
              </div>
            </div>
            <p className="text-gray-300 text-md mb-4">{question?.content}</p>
          </div>

          <div className="space-y-4">
            {answers
              .filter((answer) => answer.questionId === params.id)
              .map((answer) => (
                <div key={answer._id} className="bg-gray-700 p-4 rounded-lg">
                  {/* Render the content as HTML */}
                  <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                  <div className="text-sm text-gray-400">
                    {/* Display the userName instead of ownerId */}
                    Posted by {answer.userName || "Unknown User"}
                  </div>
                </div>
              ))}
          </div>


          {/* Answer Form */}
          <div className="border-2 border-[#432c83] p-4 md:p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Your Answer</h2>
            <form onSubmit={handleSubmit} >
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
      </div>
    </div>

  );
}

export default QuestionDetail;