"use client"
import { ProjectProvider } from "@/context/ProjectContext"
import { ReactNode } from "react"


export const ProjectLayout =({children}:{children:ReactNode})=>{
    return(
        <ProjectProvider>
            {children}
        </ProjectProvider>
    )
}