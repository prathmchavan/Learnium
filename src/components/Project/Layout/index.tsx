"use client"
import { ProjectProvider } from "@/context/ProjectContext"
import { SnackbarProvider } from "notistack"
import { ReactNode } from "react"


export const ProjectLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SnackbarProvider>
            <ProjectProvider>
                {children}
            </ProjectProvider>
        </SnackbarProvider>
    )
}