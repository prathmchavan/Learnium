"use client";

import { ExplorePageProvider } from "@/context/explore-page";
import { ReactNode } from "react"

export const ExplorePageLayout = ({children}: {children: ReactNode}) => {
    return (
        <ExplorePageProvider>
            {children}
        </ExplorePageProvider>
    )
}