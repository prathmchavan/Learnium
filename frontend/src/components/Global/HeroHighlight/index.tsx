"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../../ui/hero-highlight";
import { TailwindcssButtons } from "../TailwindcssButtons";

export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
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
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-left mx-auto "
      >
        Transforming Education For
        <Highlight className="text-black dark:text-white mx-2">
          All Learner
        </Highlight>
      </motion.h1>
      <h1 className="my-5 px-4 text-[#F6F6F6]">Learnium is revolutionizing education in Tier 2 and Tier 3 cities by providing smart, inclusive, and interactive learning experiences. Join us today and discover a world of knowledge!
      </h1>
      {/* <div className=" my-10">
        <TailwindcssButtons name="Join Now" link="login" />
      </div> */}
    </HeroHighlight>
  );
}
