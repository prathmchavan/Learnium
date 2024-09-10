"use client";

import { useProjectContext } from "@/context/ProjectContext";
import { Project } from "@/interface/project";
import { useEffect, useState } from "react";

const ProjectDetailComponent = ({ params }: { params: { id: string } }) => {
    const [project, setProject] = useState<Project | void>(undefined);
    const { getProject } = useProjectContext();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const fetchedProject = await getProject(params.id);
                setProject(fetchedProject);
            } catch (error : any) {
                throw new Error("Error fetching project:", error);
            }
        };

        fetchProject();
    }, [params.id, getProject]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            
        </div>
    );
};

export default ProjectDetailComponent;
