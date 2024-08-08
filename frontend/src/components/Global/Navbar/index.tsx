"use client"
import React, { useState } from "react";
import { TailwindcssButtons } from "../TailwindcssButtons";
import { ButtonsCard } from "../../ui/tailwindcss-buttons";
import { HoveredLink, Menu, MenuItem } from "../../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ButtonNav } from "../ButtonNav";



const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                    <li className="relative group">
                        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]">
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                More
                            </span>
                        </button>
                        <ul
                            className="absolute mt-5 px-5 py-2 bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-5 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 ">
                            <li className="my-2">
                                <ButtonNav name="Project" />
                            </li>
                            <li className="my-2">
                                <ButtonNav name="Courses" />
                            </li>
                            <li>
                                <ButtonNav name="Events" />
                            </li>

                        </ul>
                    </li>

                </ul>
            </div>


        </div>
    )

}

export default Navbar;