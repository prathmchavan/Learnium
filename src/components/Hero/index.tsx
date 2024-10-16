"use client"
import React from "react";
import { GlobeDemo } from "../Global/GlobeDemo";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

export const Hero = () => {
    return (
        <HeroHighlight className="md:m-0 md:p-0 my-10 ">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                <div className="lg:w-1/2 px-4">
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: [20, -5, 0],
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="text-2xl md:text-4xl lg:text-5xl font-bold text-white dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-left"
                    >
                        Transforming Education For
                        <Highlight className="text-black dark:text-white mx-8">
                            All Learners
                        </Highlight>
                    </motion.h1>
                    <h1 className="my-5 text-[#F6F6F6]">
                        Learnium is revolutionizing education in Tier 2 and Tier 3 cities by providing smart, inclusive, and interactive learning experiences. Join us today and discover a world of knowledge!
                    </h1>
                </div>
                <div className="lg:w-1/2 flex justify-center md:mt-10 lg:mt-0 md:block hidden">
                    <GlobeDemo />
                </div>
            </div>
        </HeroHighlight>
    );
};
