"use client";

import Image from "next/image";
import { Tabs } from "../ui/tabs";
import { BentoGridDemo } from "../Global/BentoGrid";
import { LampContainer } from "../ui/lamp";
import { motion } from "framer-motion";

export function Info() {
    const tabs = [
        {
            title: "Smart",
            value: "smart",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-center"> Personalized learning paths powered by AI and adaptive content.</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Inclusivity",
            value: "inclusivity",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-center">Access quality education regardless of
                        your lacation or background.</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Interactivity",
            value: "interactivity",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-center">Engage with interactive learning
                        materials and collaborate with fellow
                        students.</p>
                    <DummyContent />
                </div>
            ),
        },
        {
            title: "Inclusive",
            value: "inclusive",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-center">Resources and courses designed for diverse learners.</p>
                    <DummyContent />
                </div>
            ),
        },

    ];

    return (
        <div className="mt-32 bg-gradient-to-r from-[#5513ee5c] via-[#000000] to-[#5513ee5c]">
            <div className="text-center pt-16">
                <h1 className="text-[#F6F6F6] text-4xl font-bold">Transforming Education Through Smart Systems, Quality <br /> Content, and Community Engagement</h1>
                <h6 className="text-[#F6F6F6] py-10">Learnium offers a modern and inclusive educational platform that enhances learning through personalized paths,<br /> diverse resources, and collaborative engagement. Explore our features today!</h6>
            </div>
            <div className=" h-[20rem] md:h-[36rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-20 ">
                <Tabs tabs={tabs} />
            </div>

            <LampContainer className="pt-60  ">
          
                <div className="mt-80">
                    <h1 className="text-4xl text-center text-[#F6F6F6] font-bold">Discover, Engage, and Grow with Learnium</h1>
                </div>
                <BentoGridDemo />
           
            </LampContainer>
                {/* <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    Build lamps <br /> the right way
                </motion.h1> */}
        </div>
    );
}

const DummyContent = () => {
    return (
        <Image
            src="/linear.webp"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        />
    );
};
