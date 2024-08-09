import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { Cover } from "../ui/cover";
import { GlobeDemo } from "../Global/GlobeDemo";

export const Hero = () => {
    return (
        
        <div className="relative flex items-center justify-between min-h-screen overflow-hidden">
            <BackgroundBeams className="-z-50" />

            {/* Text component of hero section */}
            <div className=" flex-col mx-5 flex-1 flex justify-start">
                <div>

                    <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-left mt-6 relative z-20 py-6 text-[#F6F6F6]">
                        Transforming Education  <br /> For <Cover >All Learners</Cover>
                    </h1>
                </div>
                <div>
                    <h5 className="text-[#F6F6F6]">
                        Learnium is revolutionizing education in Tier 2 and Tier 3 cities by providing smart, inclusive, and interactive learning experiences. Join us today and discover a world of knowledge!
                    </h5>
                </div>
  
            </div>

            {/* GitHub globe component */}
            <div className="flex-1 flex justify-end">
                <GlobeDemo />
            </div>
        </div>
    );
};
