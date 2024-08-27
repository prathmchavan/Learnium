"use client";
import React, { useEffect, useState } from "react";
import { TailwindcssButtons } from "../TailwindcssButtons";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";


const Navbar = () => {
    const { userToken, logout ,user } = useAuthContext();

 

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

            {!userToken && (
                <div className="flex justify-end items-center">
                    <TailwindcssButtons name="Login / Signup" link="login" />
                </div>
            )}

            {userToken && (
                <div className="flex justify-end items-center">

                    <Dropdown placement="bottom-start" className="bg-gray-900">
                        <DropdownTrigger>
                            <User
                                as="button"
                                avatarProps={{
                                    isBordered: true,
                                    src: user?.about.profilePicture ? user.about.profilePicture : 'https://ui-avatars.com/api/?name=' + `${user?.about.name}`,

                                }}
                                className="transition-transform"
                                name={`${user?.about.name}`}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User Actions" variant="shadow" color="success">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-bold">Signed in as</p>
                                <p className="font-bold">{user?.contact.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings" className="hover:text-white" href="/profile/about">
                                My Profile
                            </DropdownItem>
                            <DropdownItem key="help_and_feedback">
                                Help & Feedback
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={logout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            )}
        </div>
    );
};

export default Navbar;
