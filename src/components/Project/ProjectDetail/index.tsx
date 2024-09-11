"use client";
import { Divider } from "@nextui-org/divider";
import { useProjectContext } from "@/context/ProjectContext";
import { Project } from "@/interface/project";
import { IconArrowBigRightFilled, IconBookmark, IconBookmarkFilled, IconBrandGithub, IconShare, IconStar, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { getUser } from "@/hooks/get-user";
import { Avatar, Chip } from "@nextui-org/react";


const ProjectDetailComponent = ({ params }: { params: { id: string } }) => {
    const [project, setProject] = useState<Project | void>(undefined);
    const [liked, setLiked] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const { getProject } = useProjectContext();
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const fetchedProject = await getProject(params.id);
                setProject(fetchedProject);
            } catch (error: any) {
                throw new Error("Error fetching project:", error);
            }
        };
        fetchProject();
    }, [params.id, getProject]);
    if (!project) {
        return <div>Loading...</div>;
    }
    const handleLike = async () => {
        const like = liked;
        if (!getUser()) {
            enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
            return;
        }
        try {
            setLiked(() => !like);
            // const res = await axiosInstGen.put(`/reel/like/${reelId}`, {}, {
            //     headers: {
            //         Authorization: "Bearer " + getUser(),
            //     },
            // });
        } catch (error) {
            setLiked(like);
        }
    };
    const handleSave = async () => {
        const save = saved;
        if (!getUser()) {
            enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
            return;
        }
        try {
            setSaved(() => !save);
            // const res = await axiosInst.put(`/reel/add-to-collection/${reelId}`, {}, {
            //     headers: {
            //         Authorization: "Bearer " + getUser(),
            //     },
            // });
        } catch (error) {
            setSaved(save);
        }
    };
    const shareTreat = async () => {
        try {
            const shareData = {
                title: project.title ?? "Something mouth watering!",
                url: `https://onlymess.in/Learnix/${project._id}`,
            };
            if (navigator.share) {
                await navigator.share(shareData);
                enqueueSnackbar({ message: "Shared!", variant: "success" });
            } else {
                console.log("Web Share API is not supported.");
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ message: "Please try sharing once more!", variant: "warning" });
        }
    };
    return (
        <div className="bg-gradient-to-l from-[#23124b] to-gray-900 text-white min-h-screen p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">{project.title}</h1>
                    <button className="flex items-center space-x-2 bg-purple-600 px-4 py-2 rounded-lg" onClick={handleLike}>
                        {liked ? (
                            <IconStarFilled size={20} color="gold" />
                        ) : (
                            <IconStar size={20} />
                        )}
                        <span>Give Learni Star</span>
                    </button>
                </div>
                <Divider className="bg-white w-full my-10" orientation="horizontal" />
                {/* Image Slider Placeholder */}
                    <Image
                        alt="test"
                        src="/images/any.jpg"
                        width={500}
                        height={200}
                        className="w-full rounded-lg"
                    />
                {/* share */}
                <div className="flex justify-between items-center mt-8">
                    <div className="flex space-x-4">
                        <button onClick={handleSave}>
                            {saved ? (
                                <IconBookmarkFilled size={20} color="green" />
                            ) : (
                                <IconBookmark size={20} />
                            )}
                        </button>
                        <button onClick={shareTreat}>
                            <IconShare size={20} />
                        </button>
                    </div>
                    <div>
                        <button className="bg-purple-600 px-4 py-2 rounded-lg flex gap-2 items-center">
                            <IconBrandGithub size={20} />
                            View on Github
                        </button>
                    </div>
                </div>

                {/* Project Info Section */}
                <div className="flex justify-between items-center mt-8">
                    <Chip
                        variant="shadow"
                        color="secondary"
                        size="lg"
                        avatar={
                            <Avatar
                                name="JW"
                                src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                            />
                        }
                    >
                        Avatar
                    </Chip>

                </div>
                {/* Description */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Project Description :</h2>
                    <p className="mt-2 text-gray-400">
                        {project.description}
                    </p>
                </div>
                {/* Tech Stack Section */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Tech Stack Used :</h2>
                    <ul className="mt-2 text-gray-400 gap-2 flex">
                        <Chip color="secondary" variant="dot" className="text-white">Dot</Chip>
                        {project.technologyUsed.map((tech) => (
                            <Chip color="secondary" variant="dot" className="text-white">{tech}</Chip>
                        ))}
                    </ul>
                </div>
                <Divider className="bg-white w-full my-10" orientation="horizontal" />
                {/* Comments Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Comments</h2>
                    <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                        <textarea
                            className="w-full p-3 bg-gray-900 rounded-lg text-gray-400"
                            placeholder="Write comment here..."
                            rows={3}
                        />
                    </div>
                    <button className="bg-purple-600 px-4 py-2 my-4 rounded-lg float-right">Submit</button>
                    {/* Example Comment */}
                    <div className="my-6">
                        <div className="flex items-center space-x-4 py-6">
                            <Image src="/user-avatar.png" alt="User" width={40} height={40} className="rounded-full" />
                            <div>
                                <h3 className="text-lg font-semibold">Priya Gupta</h3>
                                <p className="text-gray-400">This is a fantastic concept...</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Image src="/user-avatar.png" alt="User" width={40} height={40} className="rounded-full" />
                            <div>
                                <h3 className="text-lg font-semibold">Priya Gupta</h3>
                                <p className="text-gray-400">This is a fantastic concept...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailComponent;
