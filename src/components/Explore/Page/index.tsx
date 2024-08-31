"use client";

import { useContext, useRef } from "react";
import { Video } from "..";
import { ExploreContext, Reel } from "@/context/explore";
import { ExploreHeader } from "../Header";

export const ExplorePage = () => {

    const { reels, setCurrent, current } = useContext(ExploreContext);
    const parentRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
            <ExploreHeader />
            <div
                className="w-full md:w-400 h-full md:h-700 rounded-none md:rounded-20 overflow-y-scroll overflow-x-hidden snap-y snap-mandatory relative"
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
    );
}
