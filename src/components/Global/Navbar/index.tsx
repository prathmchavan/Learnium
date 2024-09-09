"use client";
import React, { useEffect, useState } from "react";
import { TailwindcssButtons } from "../TailwindcssButtons";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { usePathname } from "next/navigation";


const Navbar = () => {
    const { userToken, logout, user } = useAuthContext();
    const path = usePathname();

    if (path === '/learnix') {
        return null;
    }

    return (
        <div className={`py-5 ${path === '/' ? '' : 'bg-gradient-to-r from-[#5513ee5c] via-[#000000] to-[#5513ee5c]'}`}>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg  border-opacity-20  shadow-lg flex px-11 py-3 rounded-2xl top-5 mx-5">
                <div className="flex justify-start items-center">
                    <Link href={"/"}>
                        <Image src={'/logo/log.svg'} width={150} height={150} alt="logo" />
                    </Link>
                </div>
                <ul className="flex flex-row justify-center items-center gap-11 flex-grow text-[#E5E6FF]">
                    <li>
                        <Link href={'/ai'}>Learni.AI</Link>
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
                        <Link href={'/learnix'}>LearniX</Link>
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
        </div>
    );
};

export default Navbar;
