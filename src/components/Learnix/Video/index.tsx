"use client";

import { Reel } from "@/context/learnix";
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

    useEffect(() => {
        if (parentRef.current) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setPlay(true);
                        setCurrent(() => reel);
                        videoRef.current?.play();
                    } else {
                        setPlay(false);
                        videoRef.current?.pause();
                    }
                });
            }, {
                root: parentRef.current,
                threshold: 0.6,
                rootMargin: "0px"
            });

            const reelInst = document.getElementById(`reel-${id}`);
            if (reelInst) {
                observer.observe(reelInst);
            }

            return () => {
                if (reelInst) {
                    observer.unobserve(reelInst);
                }
            };
        }
        return console.log("")
    }, [parentRef, id, reel, setCurrent]);

    return (
        <div
            className={`relative w-full h-full snap-start overflow-hidden object-cover`}
            id={`reel-${id}`}
        >
            <video
                ref={videoRef}
                src={reel.video}
                loop
                className="absolute inset-0 w-full h-[550px] md:h-[680px] object-cover z-10"
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
                current={current}
            />
            <Interaction
                reelId={reel._id}
                current={current}
                title={reel.caption}
                description={reel.description}
                video={reel.video}
            />
        </div>
    );
};
