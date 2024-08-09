import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { Cover } from "../ui/cover";
import { GlobeDemo } from "../Global/GlobeDemo";
import { TailwindcssButtons } from "../Global/TailwindcssButtons";
import { HeroHighlightDemo } from "../Global/HeroHighlight";

export const Hero = () => {
    return (
        
        <div className="relative flex items-center justify-between min-h-screen overflow-hidden">
            {/* <BackgroundBeams className="-z-50" /> */}

            {/* Text component of hero section */}
            <div className=" flex-col mx-5 flex-1 flex justify-start">
                <div>
                    <HeroHighlightDemo/>
                </div>
              
  
            </div>

            {/* GitHub globe component */}
            {/* <div className="flex-1 flex justify-end">
                <GlobeDemo />
            </div> */}
        </div>
    );
};
