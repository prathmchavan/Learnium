"use client"
import React, { useState } from "react";
import { TailwindcssButtons } from "../TailwindcssButtons";
import { ButtonsCard } from "../../ui/tailwindcss-buttons";
import { HoveredLink, Menu, MenuItem } from "../../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ButtonNav } from "../ButtonNav";
import Link from "next/link";



const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (

        
       
        <div className=" bg-white  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 ">
                <ul className=" flex flex-row justify-center align-middle gap-11 px-11 py-6 text-[#E5E6FF]">
                    <li>
                        <Link href={'/'}>Home</Link>    
                    </li>
                    <li>
                        
                        Arpit.ai
                    </li>
                    <li>
                        Events
                    </li>
                      <li>
                        Community
                    </li>
                    <li>
                    Projects
                    </li>
                    <li>
                    Courses
                    </li>
                  

                </ul>
            </div>



    )

}

export default Navbar;