"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../../ui/hero-highlight";
import { TailwindcssButtons } from "../TailwindcssButtons";
import { GlobeDemo } from "../GlobeDemo";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        {/* Text and Highlight Section */}
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
            <Highlight className="text-black dark:text-white mx-2">
              All Learners
            </Highlight>
          </motion.h1>

          <h1 className="my-5 text-[#F6F6F6]">
            Learnium is revolutionizing education in Tier 2 and Tier 3 cities by providing smart, inclusive, and interactive learning experiences. Join us today and discover a world of knowledge!
          </h1>
        </div>

        {/* Globe Demo Section */}
        <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <GlobeDemo />
        </div>
      </div>
    </HeroHighlight>
  );
}
