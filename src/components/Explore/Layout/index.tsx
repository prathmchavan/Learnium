"use client";

import { ExploreProvider } from "@/context/explore"
import { ReactNode } from "react"

export const ExploreLayout = ({children}: {children: ReactNode}) => {
    return (
        <ExploreProvider>
            {children}
        </ExploreProvider>
    )
}