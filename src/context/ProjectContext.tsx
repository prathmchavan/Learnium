"use client";

import { createContext, ReactNode, useContext , useState} from "react";
import { axiosInst } from "@/utils/axios";
import { Project } from "@/interface/project";

interface ProjectContextTypes {
    projects: Project[]; 
    createProject: () => Promise<void>;
    fetchProject: () => Promise<void>;
    getProject: (id:string)=> Promise<Project | void>
}



const ProjectContext = createContext<ProjectContextTypes | undefined>(undefined);

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error("useProjectContext must be used within a ProjectProvider");
    }
    return context;
};

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    const createProject = async () => {
        try {
            // Replace this with actual project creation logic
            console.log("Creating project...");
            // const res = await axiosInst.post('/projects', newProjectData);
            // console.log(res);
        } catch (error: any) {
            console.error("Error creating project:", error);
            throw new Error(error);
        }
    };

    const fetchProject = async () => {
        try {
            const res = await axiosInst.get(`projects?limit=10&offset=0`);
            // console.log(res.data.data);
            setProjects(res.data.data)
        } catch (error: any) {
            console.error("Error fetching projects:", error);
            throw new Error(error);
        }
    };

    const getProject = async (id: string) => {
        try {
            const res = await axiosInst.get(`projects/${id}`)
            // console.log("i am fetching single project", res.data)
            return res.data
        } catch (error: any) {
            throw new Error(error )
        }
    }
    return (
        <ProjectContext.Provider value={{ createProject, fetchProject, getProject , projects}}>
            {children}
        </ProjectContext.Provider>
    );
};
