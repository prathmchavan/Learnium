import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconTerminal2,
    IconUser,
    IconBook,
    IconSocial,
    IconBriefcase2,
    IconPhone
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
        }
    ];
    return (
        <div className="flex items-center justify-center h-[10rem] w-full my-10">
            <FloatingDock
                mobileClassName="translate-y-20" // only for demo, remove for production
                items={links}
            />
        </div>
    );
}
