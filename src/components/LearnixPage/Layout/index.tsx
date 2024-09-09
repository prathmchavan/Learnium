"use client";

import { LearnixPageProvider } from "@/context/learnix-page";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react"

export const LearnixPageLayout = ({children}: {children: ReactNode}) => {
    return (
        <SnackbarProvider>
        <LearnixPageProvider>
            {children}
        </LearnixPageProvider>
        </SnackbarProvider>
    )
}