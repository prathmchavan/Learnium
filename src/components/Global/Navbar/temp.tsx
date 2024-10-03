"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, User, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAuthContext } from "@/context/AuthContext";
import { TailwindcssButtons } from "../TailwindcssButtons";
import Image from "next/image";
Image

export default function NavbarComp() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { userToken, logout, user } = useAuthContext();
    const menuItems = [
        {
            name: "Learni.Ai",
            linkname: '/ai'
        } ,
       {
            name: "Community",
            linkname: '/community'
        } ,
        {
            name: "Projects",
            linkname: '/projects'
        } ,
        {
            name: "Events",
            linkname: '/events'
        },
        {
            name: "LearniX",
            linkname: '/learnix'
        }

    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-black" >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    {/* <AcmeLogo /> */}
                    <Link href={"/"}>
                        <Image src={'/logo/log.svg'} width={150} height={150} alt="logo" />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link href="/ai" className="text-[#cfbdff]">
                        Learni.Ai
                    </Link>
                </NavbarItem>
                <NavbarItem >
                    <Link href="/community" className="text-[#cfbdff]">
                        Community
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/projects" className="text-[#cfbdff]">
                        Projects
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/events" className="text-[#cfbdff]">
                        Events
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/learnix" className="text-[#cfbdff]">
                        LearniX
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {!userToken && (
                    <div className="flex justify-end items-center">
                        <TailwindcssButtons name="Login / Signup" link="login" />
                    </div>
                )}
                {userToken && (
                    <div className="flex justify-end items-center ">
                        <Dropdown placement="bottom-start" className="bg-gray-900">
                            <DropdownTrigger>
                                <User
                                    as="button"
                                    avatarProps={{
                                        size: 'sm',
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
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full text-[#432c83]"
                            href={`${item.linkname}`}
                            size="lg"
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
