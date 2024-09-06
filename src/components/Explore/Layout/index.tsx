"use client";

import { ExploreProvider } from "@/context/explore"
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react"

export const ExploreLayout = ({children}: {children: ReactNode}) => {
    return (
        <SnackbarProvider>

        <ExploreProvider>
            {children}
        </ExploreProvider>
        </SnackbarProvider>
    )
}