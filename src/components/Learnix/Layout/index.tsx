"use client";
import { LearnixProvider } from "@/context/learnix";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

export const LearnixLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SnackbarProvider>
            <LearnixProvider>
            {children}
            </LearnixProvider>
        </SnackbarProvider>
    )
}