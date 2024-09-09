"use client";
import { useContext, useRef } from "react";
import { Video } from "..";
import { LearnixContext, Reel } from "@/context/learnix";
import { LearnixHeader } from "../Header";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export const LearnixPage = () => {
    const { reels, setCurrent, current } = useContext(LearnixContext);
    const parentRef = useRef<HTMLDivElement | null>(null);
  return (
        <div className=" flex justify-center my-2">
            <BackgroundGradient className="max-w-md w-[600px] h-[670px] flex justify-center items-center" containerClassName="w-auto">
                <div className="w-full h-[670px] bg-black rounded-3xl overflow-hidden">
                    <div
                        className="w-full h-full flex flex-col overflow-hidden"
                        ref={parentRef}
                    >
                        <LearnixHeader />
                        {/* Reels Container */}
                        <div
                            className="w-full h-full overflow-y-scroll no-scrollbar snap-y snap-mandatory overflow-x-hidden relative"
                            ref={parentRef}
                        >
                            {reels?.map((r, idx) => (
                                <Video
                                    key={idx}
                                    id={idx}
                                    parentRef={parentRef}
                                    reel={r}
                                    setCurrent={setCurrent}
                                    current={current as Reel}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </BackgroundGradient>
        </div>
    );
};
