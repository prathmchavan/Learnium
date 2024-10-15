"use client";
import Image from "next/image";
import { Tabs } from "../ui/tabs";
import { BentoGridDemo } from "../Global/BentoGrid";
import { LampContainer } from "../ui/lamp";

export function Info() {
    const tabs = [
        {
            title: "Smart",
            value: "smart",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 md:p-10 text-sm md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-center"> Personalized learning paths powered by AI and adaptive content.</p>
                    <DummyContent src="/images/smart.jpg" />
                </div>
            ),
        },
        {
            title: "Inclusivity",
            value: "inclusivity",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 md:p-10 text-sm md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-center">Access quality education regardless of
                        your lacation or background.</p>
                    <DummyContent src="/images/inclusivity.jpg" />
                </div>
            ),
        },
        {
            title: "Interactivity",
            value: "interactivity",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 md:p-10 text-sm md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-center">Engage with interactive learning
                        materials and collaborate with fellow
                        students.</p>
                    <DummyContent src="/images/interactivity.jpg" />
                </div>
            ),
        },
        {
            title: "Inclusive",
            value: "inclusive",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-5 md:p-10 text-sm md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p className="text-center">Resources and courses designed for diverse learners.</p>
                    <DummyContent src="/images/inclusive.jpg" />
                </div>
            ),
        },
    ];
    return (
        <div className="md:mt-20 px-4 md:px-0">
            {/* Text Section */}
            <div className="text-center md:pt-16">
                <h1 className="text-[#F6F6F6] text-2xl md:text-4xl font-bold">
                    Transforming Education Through Smart Systems, Quality <br className="hidden md:block" /> Content, and Community Engagement
                </h1>
                <h6 className="text-[#F6F6F6] text-sm md:text-base py-6 md:py-10">
                    Learnium offers a modern and inclusive educational platform that enhances learning through personalized paths, <br className="hidden md:block" />
                    diverse resources, and collaborative engagement. Explore our features today!
                </h6>
            </div>
            {/* Tabs Section */}
            <div className="h-[20rem] md:h-[36rem] [perspective:1000px] relative flex flex-col max-w-full md:max-w-5xl mx-auto w-full items-start justify-start my-20 md:my-20">
                <Tabs tabs={tabs} />
            </div>
            {/* Lamp Container Section */}
            <LampContainer className=" md:pt-60 pt-32 mt-32">
                <div className="my-32">
                    <h1 className="text-2xl md:text-4xl text-center text-[#F6F6F6] font-bold pt-40">
                        Discover, Engage, and Grow with Learnium
                    </h1>
                </div>
                <BentoGridDemo />
            </LampContainer>
        </div>
    );
}

const DummyContent = ({ src }: { src: string }) => {
    return (
        <Image
            src={src}
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[60%]  md:h-[90%] absolute inset-x-0 w-[90%] rounded-xl mx-auto"
        />
    );
};
