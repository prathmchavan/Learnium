"use client";
import React, { useEffect, useState } from "react";
import { TailwindcssButtons } from "../TailwindcssButtons";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
    const { user ,logout } = useAuthContext();


    return (
        <div className="bg-white bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-5 flex px-11 py-3">
            <div className="flex justify-start items-center">
                <Image src={'/logo/log.svg'} width={150} height={150} alt="logo" />
            </div>
            {/* Centered navigation items */}
            <ul className="flex flex-row justify-center items-center gap-11 flex-grow text-[#E5E6FF]">
                <li>
                    <Link href={'/'}>Home</Link>
                </li>
                <li>
                    <Link href={'/ai'}>Arpit.ai</Link>
                </li>
                <li>
                    <Link href={'/community'}>Community</Link>
                </li>
                <li>
                    <Link href={'/projects'}>Projects</Link>
                </li>
                <li>
                    <Link href={'/events'}>Events</Link>
                </li>
                <li>
                    <Link href={'/techsnippets'}>TechSnippets</Link>
                </li>
            </ul>

            {!user && (
                <div className="flex justify-end items-center">
                    <TailwindcssButtons name="Login / Signup" link="login" />
                </div>
            )}

            {user && (
                <div className="flex justify-end items-center">
                    <TailwindcssButtons name="Logout" onClick={logout} />
                </div>
            )}
        </div>
    );
};

export default Navbar;
