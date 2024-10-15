"use client"
import { SparkelTitle } from "@/components/Global/SparkelTitle";
import { useProjectContext } from "@/context/ProjectContext";
import { IconBookmarkFilled, IconMessageCircleFilled, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import FilterSection from "../FilterSection";
import UploadCard from "../UploadProject/UploadCard";

const ProjectListComponent = () => {
    const { projects, fetchProject } = useProjectContext();
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [filters, setFilters] = useState<{ category: string[], technology: string[] }>({
        category: [],
        technology: []
    });
    useEffect(() => {
        fetchProject();
    }, []);
    useEffect(() => {
        applyFilters();
    }, [filters, projects]);
    const applyFilters = () => {
        let filtered = projects;
        if (filters.category.length > 0) {
            filtered = filtered.filter(project =>
                filters.category.includes(project.category)
            );
        }
        if (filters.technology.length > 0) {
            filtered = filtered.filter(project =>
                filters.technology.some(tech => project.technologyUsed.includes(tech))
            );
        }
        setFilteredProjects(filtered);
    };
    return (
        <div>
            <SparkelTitle />
            <div className="flex md:flex-row flex-col">
                <div className="md:flex md:w-56 md:mx-6 mx-auto">
                <FilterSection onFilterChange={setFilters} />
                </div>
                <div className="md:hidden flex flex-col">
                <UploadCard />
                </div>
                <div className="max-w-8xl mx-auto p-4">
                    {filteredProjects.map((project, index) => (
                        <Link href={`/projects/${project._id}`} key={project._id}>
                            <div className="flex items-center space-x-4 p-4 bg-gradient-to-l from-[#381d77b0] to-gray-900 rounded-lg mb-4">
                                <h1 className="text-2xl text-purple-600/90 font-bold">#{index + 1}</h1>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                                    <p className="text-gray-400">{project.description}</p>
                                    <div className="flex space-x-4 mt-2">
                                        <div className="flex gap-2 text-center">
                                            <IconMessageCircleFilled />
                                            <h1>{project.commentId ? project.commentId.length : 0}</h1>
                                        </div>
                                        <div className="flex gap-2 text-center">
                                            <IconBookmarkFilled />
                                            <h1>{project?.bookmarksCount?.length ? project.bookmarksCount.length : 0}</h1>
                                        </div>
                                    </div>
                                </div>
                                {/* Upvotes */}
                                <div className="flex flex-col items-center">
                                    <div className="flex-row gap-2 text-center">
                                        <IconStarFilled size={28} color="gold" />
                                        <h1>{project.upvotes.length ? project.upvotes.length : 0}</h1>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="md:block hidden">
                <UploadCard />
                </div>
            </div>
        </div>
    )
}

export default ProjectListComponent;