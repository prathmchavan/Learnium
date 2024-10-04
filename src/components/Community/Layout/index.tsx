"use client"
import { CommunityProvider } from "@/context/CommunityContext"
import { SnackbarProvider } from "notistack"
import { ReactNode } from "react"

export const CommunityLayout =({children}:{children: ReactNode})=>{
    return(
        <SnackbarProvider>
            <CommunityProvider>
            {children}
            </CommunityProvider>
        </SnackbarProvider>
    )
} 

