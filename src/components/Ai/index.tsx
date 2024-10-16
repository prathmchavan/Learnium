"use client";
import { Accordion, AccordionItem, Button, Divider, Link, useDisclosure } from "@nextui-org/react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/hooks/get-user";
import { enqueueSnackbar } from "notistack";
import PermissionModal from "./PermissionModal";

export default function Ai() {
    const router = useRouter()
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSelected, setIsSelected] = useState(false);
    const [selectedTest, setSelectedTest] = useState<string | null>(null);
    
    const paragraph = `Learni.ai is designed to evaluate your aptitude and subject-specific knowledge through adaptive Ai exams. Whether you're preparing for a new challenge or sharpening your skills, our exams will help you understand your strengths and areas for improvement.`

    const testSectionRef = useRef<HTMLDivElement>(null);
    const takeTest = () => {
        if (testSectionRef.current) {
            testSectionRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const isLoggedIn = () => {
        if (getUser()) {
            return true;
        } else {
            return false;
        }
    };

    const handleTestAccess = (testType: string) => {
        if (!isLoggedIn()) {
            enqueueSnackbar({
                message: "You're not logged in. Please log in to proceed.",
                variant: "warning",
            });
        } else {
            setSelectedTest(testType); 
            onOpen();
        }
    };

    const handleProceed = () => {
        if (isSelected && selectedTest) {
            router.push(`/ai/${selectedTest}`);
            onOpenChange();
        } else {
            enqueueSnackbar({
                message: "Please agree to the terms before proceeding.",
                variant: "error",
            });
        }
    };

    const itemClasses = {
        base: "",
        title: "font-normal text-sm md:text-medium text-white",
        trigger: "px-2 py-0 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2 py-5",
    };
    return (
        <div className="flex flex-col px-4 md:px-0">
            <div className="flex flex-col my-5">
                {/* Heading Section */}
                <div className="flex justify-center align-middle my-8">
                    <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-[#ECBFBF] to-[#5C24FF] bg-clip-text text-transparent font-semibold">
                        Learni.Ai
                    </h1>
                </div>
                <div className="flex justify-center align-middle text-center">
                    <h1 className="text-lg md:text-2xl">Take our Ai-powered exams to assess your skills and knowledge</h1>
                </div>
                {/* Paragraph and Button Section */}
                <div className="flex-col justify-center align-middle text-center mt-8">
                    <TextGenerateEffect words={paragraph} />
                    <button
                        onClick={takeTest}
                        className="my-5 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            Start Exam
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex justify-center align-middle">
                <Image src="/images/robot.png" width={600} height={500} alt="robot image" className="w-full h-auto md:w-[1000px]" />
            </div>
            <div ref={testSectionRef} className="flex flex-col items-center justify-center gap-16 md:gap-24 md:mb-8">
                <div className="flex flex-col md:flex-row justify-center items-center gap-16 w-full px-4 md:px-0">
                    <div className="flex flex-col items-center gap-y-5">
                        <h1 className="text-center text-3xl md:text-4xl font-semibold">Aptitude Test</h1>
                        <p className="text-center italic text-sm md:text-base">
                            The aptitude test is a timed assessment featuring multiple-choice questions that evaluate skills in
                            areas like logical reasoning, problem-solving and quantitative aptitude. The goal is to answer as many
                            questions as possible within the given time.
                        </p>
                        <button
                            onClick={() => handleTestAccess("apti")}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-6 hover:bg-indigo-500"
                        >
                            Take aptitude test
                        </button>
                    </div>
                    <Divider orientation="vertical" className="bg-purple-800 w-0.5 h-16 md:h-56 md:block hidden" />
                    <div className="flex flex-col items-center gap-y-5">
                        <h1 className="text-center text-3xl md:text-4xl font-semibold">OA Test</h1>
                        <p className="text-center italic text-sm md:text-base">
                            The OA Test (Online Assessment Test) is a coding challenge where you solve programming questions using
                            a specific coding language. It tests your ability to write correct and efficient code in a set time.
                        </p>
                        <button
                            onClick={() => handleTestAccess("oa")}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-6 hover:bg-indigo-500"
                        >
                            Take OA test
                        </button>
                    </div>
                </div>
            </div>
            <PermissionModal
                onOpenChange={onOpenChange}
                isOpen={isOpen}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                handleProceed={handleProceed} 
                selectedTest={selectedTest}
                
            />
            <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col justify-center items-center md:my-24 border-2 border-[#6439db] w-full md:w-[500px] rounded-2xl md:p-8">
                    <h1 className="text-center text-3xl md:text-4xl font-semibold my-5">How it Works...?</h1>
                    <Accordion variant="bordered" className="w-full" itemClasses={itemClasses} selectionMode="multiple">
                        <AccordionItem key="1" aria-label="Accordion 1" title="Step 1: Choose an exam">
                            Choose either the Aptitude or OA test.
                        </AccordionItem>
                        <AccordionItem key="2" aria-label="Accordion 2" title="Step 2: Select difficulty">
                            Select your preferred difficulty level (Basic, Medium, Hard).
                        </AccordionItem>
                        <AccordionItem key="3" aria-label="Accordion 3" title="Step 3: Complete the exam">
                            Complete the exam in the given time frame.
                        </AccordionItem>
                        <AccordionItem key="4" aria-label="Accordion 4" title="Step 4: Receive feedback">
                            Receive AI-generated feedback based on your performance.
                        </AccordionItem>
                        <AccordionItem key="5" aria-label="Accordion 5" title="Step 5: Get recommendations">
                            Get detailed results and recommendations for improvement.
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>

    );
}
