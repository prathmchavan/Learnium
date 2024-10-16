"use client";

import { Description } from "@/components/Learnix/Description";
import { LearnixHeader } from "@/components/Learnix/Header";
import { Interaction } from "@/components/Learnix/Interaction";
import { LearnixPageContext } from "@/context/learnix-page";
import { useContext, useRef } from "react";

export const LearnixPagePage = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { reel } = useContext(LearnixPageContext);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black relative">
            <LearnixHeader />
            <div className="w-full md:w-[400px] h-full md:h-[700px] bg-gray-300 rounded-lg shadow-lg flex flex-row overflow-hidden">
                <div className="flex-1 h-full relative">
                    {reel ? (
                        <>
                            <video
                                ref={videoRef}
                                src={reel.video}
                                loop
                                className="absolute inset-0 w-full h-full object-cover z-10"
                                onClick={() => {
                                    if (videoRef.current) {
                                        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                                    }
                                }}
                            />
                            <Description
                                reelId={reel._id}
                                id={reel.ownerId}
                                name={reel.owner?.name ?? ""}
                                avatar={reel.owner?.avatar ?? ""}
                                caption={reel.caption}
                                description={reel.description}
                                current={reel}
                            />
                            <Interaction
                                reelId={reel._id}
                                current={reel}
                                title={reel.caption}
                                description={reel.description}
                                video={reel.video}
                            />
                        </>
                    ) : (
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
