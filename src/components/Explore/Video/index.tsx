"use client";

import { Reel } from "@/context/explore";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Description } from "../Description";
import { Interaction } from "../Interaction";

export const Video = ({
    parentRef,
    id,
    reel,
    setCurrent,
    current
}: {
    parentRef: MutableRefObject<HTMLDivElement | null>,
    id: number,
    reel: Reel,
    setCurrent: any,
    current: Reel
}) => {

    const [play, setPlay] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // useEffect(() => {
    //     if (parentRef.current) {
    //         const observer = new IntersectionObserver(entries => {
    //             entries.forEach(entry => {
    //                 if (entry.isIntersecting) {
    //                     setPlay(true);
    //                     setCurrent(() => reel);
    //                     videoRef.current?.play();
    //                 } else {
    //                     setPlay(false);
    //                     videoRef.current?.pause();
    //                 }
    //             });
    //         }, {
    //             root: parentRef.current,
    //             threshold: 0.6,
    //             rootMargin: "0px"
    //         });

    //         const reelInst = document.getElementById(`reel-${id}`);
    //         if (reelInst) {
    //             observer.observe(reelInst);
    //         }

    //         return () => {
    //             if (reelInst) {
    //                 observer.unobserve(reelInst);
    //             }
    //         };
    //     }
    // }, [parentRef, id, reel, setCurrent]);

    return (
        <div
            className={`relative w-full h-full scroll-snap-start overflow-hidden`}
            id={`reel-${id}`}
        >
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
                reelId={reel.id}
                id={reel.ownerId}
                name={reel.owner?.name ?? ""}
                avatar={reel.owner?.avatar ?? ""}
                caption={reel.caption}
                description={reel.description}
                current={current}
            />
            <Interaction
                reelId={reel.id}
                current={current}
                title={reel.caption}
                description={reel.description}
                video={reel.video}
            />
        </div>
    );
};
