"use client";

import { createContext, ReactNode, useContext , useState} from "react";
import { axiosInst } from "@/utils/axios";
import { Project } from "@/interface/project";
import { ProjectForm } from "@/interface/projectForm";

interface ProjectContextTypes {
    projects: Project[]; 
    createProject: (data : any) => Promise<void>;
    fetchProject: () => Promise<void>;
    getProject: (id:string)=> Promise<Project | void>
    fetchProjectOwner: (id:string)=> Promise<Project | void>
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

 // Create a new project with the given project data
 const createProject = async (newProjectData: Partial<ProjectForm>) => {
    try {
        const res = await axiosInst.post("/projects", newProjectData);
        console.log("Project created:", res.data);
        // Optionally, update the projects state after creating a new project
        setProjects((prevProjects) => [...prevProjects, res.data]);
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

    const fetchProjectOwner = async (id: string) => {
        try {
            const res = await axiosInst.get(`user/${id}`);
            return res.data;
        } catch (error: any) {
            throw new Error(error);
        }
    };

    

    return (
        <ProjectContext.Provider value={{ createProject, fetchProject, getProject , projects, fetchProjectOwner}}>
            {children}
        </ProjectContext.Provider>
    );
};
