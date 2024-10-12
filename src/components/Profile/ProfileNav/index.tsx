import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconUser,
    IconBook,
    IconSocial,
    IconBriefcase2,
    IconPhone,
    IconPresentation
} from "@tabler/icons-react";

export function ProfileNav() {
    const links = [
        {
            title: "About",
            icon: (
                <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/profile/about",
        },
        {
            title: "Education",
            icon: (
                <IconBook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/profile/education",
        },
        {
            title: "Experience",
            icon: (
                <IconBriefcase2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/profile/experience",
        },
        {
            title: "Social Links",
            icon: (
                <IconSocial className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/profile/social",
        },
        {
            title: "Contact",
            icon: (
                <IconPhone className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/profile/contact",
        },
        {
            title: "Test Record",
            icon: (
                <IconPresentation className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "/profile/testrec",
        }
    ];
    return (
        <div className="flex md:items-center md:justify-center md;h-[10rem] md:w-full md:my-10">
            <FloatingDock
                mobileClassName="my-5" 
                items={links}
            />
        </div>
    );
}
