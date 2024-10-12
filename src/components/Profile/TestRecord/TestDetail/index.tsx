"use client";
import { useEffect } from "react";
import BarChart from "../ChartsComps/BarChart";
import LineChart from "../ChartsComps/LineChart";
import PieChart from "../ChartsComps/PieChart";
import { useTestContext } from "@/context/TestContext";

const TestDetail = ({ params }: { params: { id: string } }) => {
    const { OatestData, AptitestData } = useTestContext();
    return (
        <div className="flex flex-col items-center space-y-8">
            <div className="flex gap-32 ">
                <div className="border-2 border-[#7d5dd4] bg-[#FFFFFF1A] p-5 flex justify-center items-center flex-col gap-5 rounded-xl">
                    <h2 className="text-xl font-bold">Section-wise Performance</h2>
                    <div className="w-[500px] h-96 flex justify-center">
                        <BarChart />
                    </div>
                </div>
                <div className="border-2 border-[#7d5dd4] bg-[#FFFFFF1A] p-5 flex justify-center items-center flex-col gap-5 rounded-xl">
                    <h2 className="text-xl font-bold">Time Analysis</h2>
                    <div className="w-[500px] h-96 flex justify-center">
                        <LineChart />
                    </div>
                </div>
            </div>
            <div className="border-2 border-[#7d5dd4] bg-[#FFFFFF1A] p-5 flex justify-center items-center flex-col gap-5 rounded-xl">
                <h2 className="text-xl font-bold">Answer Distribution</h2>
                <div className="w-[500px] h-96 flex justify-center ">
                    <PieChart />
                </div>
            </div>

            <div className="flex flex-col  ">
                <h1 className="text-3xl font-bold mb-4 text-center">Test Results</h1>
                {AptitestData && (
                    <>
                        <div className="w-full flex flex-col gap-10">
                            <div className="flex flex-row gap-5">
                                <div className="rounded-xl bg-gray-950 border-2 border-[#6242b8] md:w-72 bg-[#FFFFFF1A]">
                                    <h1 className="text-center text-3xl font-bold py-3">
                                        {AptitestData?.totalQuestions}
                                    </h1>
                                    <p className="text-lg font-medium pt-2 capitalize text-center py-3">
                                        Total number of questions
                                    </p>
                                </div>
                                <div className="rounded-xl bg-gray-950 border-2 border-[#14AE5C] md:w-72 bg-[#FFFFFF1A]">
                                    <h1 className="text-center text-3xl font-bold py-3">
                                        {AptitestData.correctAnswers}
                                    </h1>
                                    <p className="text-lg font-medium pt-2 capitalize text-center py-3">
                                        Number of correct answers
                                    </p>
                                </div>
                                <div className="rounded-xl bg-gray-950 border-2 border-[#EC221F] md:w-72 bg-[#FFFFFF1A]">
                                    <h1 className="text-center text-3xl font-bold py-3">
                                        {AptitestData.incorrectAnswers}
                                    </h1>
                                    <p className="text-lg font-medium pt-2 capitalize text-center py-3">
                                        Number of incorrect answers
                                    </p>
                                </div>
                                <div className="rounded-xl bg-gray-950 border-2 border-[#b640ac] md:w-72 bg-[#FFFFFF1A]">
                                    <h1 className="text-center text-3xl font-bold py-3">
                                        {AptitestData.score}%
                                    </h1>
                                    <p className="text-lg font-medium pt-2 capitalize text-center py-3">
                                        Score
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-10">
                                <h1 className="text-3xl font-bold mb-4 text-center">
                                    Feedback
                                </h1>
                                <div className="flex flex-col text-center gap-5">
                                    <h2 className="text-xl font-bold text-center capitalize">
                                        Top Strength
                                    </h2>
                                    <p>{AptitestData?.feeBack?.strengths}</p>
                                </div>
                                <div className="flex flex-col text-center gap-5">
                                    <h2 className="text-xl font-bold text-center capitalize">
                                        Areas for improvement
                                    </h2>
                                    <p>{AptitestData?.feeBack?.improvements}</p>
                                </div>
                                <p className="text-lg font-medium pt-2 capitalize text-center py-3">
                                    {" "}
                                </p>
                            </div>
                        </div>
                        <div className="w-full text-white my-5">
                            <h2 className="text-xl font-semibold text-center my-5">
                                Answersheet
                            </h2>
                            <div>
                                {AptitestData.answerSheet?.map((item: any, index) => {
                                    const isCorrect = item.userAnswer === item.correctAnswer;
                                    return (
                                        <div key={item.questionId} className="flex flex-col gap-2">
                                            <p className="">
                                                {index + 1}) {item.question}{" "}
                                            </p>
                                            <p className="text-gray-400">
                                                Your Answer : {item.userAnswer ?? "No answer selected"}
                                            </p>
                                            <p className="text-green-500">
                                                Correct Answer : {item.correctAnswer}
                                            </p>
                                            <p
                                                className={`${isCorrect ? "text-green-500" : "text-red-500"
                                                    } mb-2`}
                                            >
                                                {isCorrect ? "Correct" : "Incorrect"}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TestDetail;
