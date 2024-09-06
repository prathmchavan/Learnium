"use client";

import { ExplorePageProvider } from "@/context/explore-page";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react"

export const ExplorePageLayout = ({children}: {children: ReactNode}) => {
    return (
        <SnackbarProvider>
        <ExplorePageProvider>
            {children}
        </ExplorePageProvider>
        </SnackbarProvider>
    )
}