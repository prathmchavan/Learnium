"use client";
import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { toast, Toaster } from "sonner";
import { ButtonsCard } from "../../ui/tailwindcss-buttons";
import Link from "next/link";

interface TailwindcssButtonsProps {
  name: string;
  link?:string;
  onClick?: () => void;
}

export function TailwindcssButtons({ name , link ,  onClick}: TailwindcssButtonsProps) {
  return (
      <>
        <ButtonsCard className="bg-transparent w-full border-none h-auto" onClick={onClick}>
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              {link ? (
                <Link href={`/${link}`}>{name}</Link>
              ) : (
                <span>{name}</span>
              )}
            </span>
          </button>
        </ButtonsCard>
      </>
   
 
  );
}
