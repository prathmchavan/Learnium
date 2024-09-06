"use client";

import { useContext, useRef } from "react";
import { Video } from "..";
import { ExploreContext, Reel } from "@/context/explore";
import { ExploreHeader } from "../Header";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export const ExplorePage = () => {
    const { reels, setCurrent, current } = useContext(ExploreContext);
    const parentRef = useRef<HTMLDivElement | null>(null);



    return (
        <div className=" flex justify-center ">
            <BackgroundGradient className="max-w-md w-[600px] h-[600px] flex justify-center items-center" containerClassName="w-auto">


                <div className="w-full h-[600px] bg-black rounded-3xl overflow-hidden">
                    <div
                        className="w-full h-full flex flex-col overflow-hidden"
                        ref={parentRef}
                    >

                        <ExploreHeader />
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
                {/* </div> */}
            </BackgroundGradient>
        </div>
    );
};
