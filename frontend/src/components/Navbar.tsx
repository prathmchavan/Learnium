import React from "react";
import { TailwindcssButtons } from "./buttons";
import { ButtonsCard } from "./ui/tailwindcss-buttons";



const Navbar = () => {

    return (
        <div className="flex justify-center align-middle my-5 ">
            <div className=" justify-center align-middle flex ">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[5px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />



                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
            <div className=" bg-white rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 ">
                <ul className=" flex flex-row gap-11 px-11 py-4">
                    <li>
                        <TailwindcssButtons name="Home" />
                    </li>
                    <li>
                        <TailwindcssButtons name="Play with Ai" />
                    </li>
                    <li>
                        <TailwindcssButtons name="Community" />
                    </li>
                    <li>
                        <TailwindcssButtons name="Project" />
                    </li>
                    <li>
                        <TailwindcssButtons name="Course" />
                    </li>
                    <li>
                        <TailwindcssButtons name="Event" />
                    </li>
                </ul>
            </div>


        </div>
    )

}

export default Navbar;