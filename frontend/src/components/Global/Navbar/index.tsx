"use client";
import React from "react";
import { TailwindcssButtons } from "../TailwindcssButtons";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 flex px-11 py-3">
            {/* Centered navigation items */}
            <ul className="flex flex-row justify-center items-center  gap-11 flex-grow text-[#E5E6FF]">
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/ai'}>Arpit.ai</Link>
                </li>
                <li>
                    <Link href={'/'}>Community</Link>
                </li>
                <li>
                    <Link href={'/'}>Projects</Link>
                </li>
                <li>
                    <Link href={'/'}>Events</Link>
                </li>
                <li>
                    <Link href={'/'}>Courses</Link>
                </li>
            </ul>

            {/* Button at the end */}
            <div className="flex justify-end  items-center">
                <TailwindcssButtons name="Login / Signup" link="login"/>
            </div>
        </div>
    );
};

export default Navbar;
