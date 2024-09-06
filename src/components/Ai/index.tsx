"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";


export default function Ai() {
    const words = [
        {
            text: "Test",
        },
        {
            text: "Your",
        },
        {
            text: "Skills",
        },
        {
            text: "With",
        },
        {
            text: "Learny.ai",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center h-[40rem] z-20">
            <p className="text-white dark:text-neutral-200 text-xs sm:text-base  ">
                The road to achieve big starts from here
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                <Link href={'/ai/apti'}>
                    <button className="w-40 h-10 rounded-xl bg-black border border-white border-transparent text-white text-sm">
                        Aptitude Test
                    </button>
                </Link>
                <Link href={'/ai/oa'}>
                <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
                    OA Test
                </button>
                </Link>
            </div>
        </div>
    );
}
