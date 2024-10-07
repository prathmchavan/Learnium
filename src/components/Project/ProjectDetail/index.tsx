"use client";
import { Divider } from "@nextui-org/divider";
import { useProjectContext } from "@/context/ProjectContext";
import { Project } from "@/interface/project";
import {
    IconBookmark,
    IconBookmarkFilled,
    IconBrandGithub,
    IconShare,
    IconStar,
    IconStarFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { getUser } from "@/hooks/get-user";
import { Avatar, Chip } from "@nextui-org/react";
import { axiosInst } from "@/utils/axios";
import Link from "next/link";

const ProjectDetailComponent = ({ params }: { params: { id: string } }) => {
    const [project, setProject] = useState<Project | void>(undefined);
    const [liked, setLiked] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [comments, setComments] = useState<any[]>([]); // Initialize as an array
    const [comment, setComment] = useState<string>();
    const { getProject } = useProjectContext();

    useEffect(() => {
        let isMounted = true;
        const fetchProject = async () => {
            try {
                const fetchedProject = await getProject(params.id);
                if (isMounted) {
                    setProject(fetchedProject);
                    const currentUser = getUser();
                    if (fetchedProject && currentUser && Array.isArray(fetchedProject.upvotes) && fetchedProject.upvotes.includes(currentUser) && Array.isArray(fetchedProject.bookmarksCount) && fetchedProject.bookmarksCount.includes(currentUser)) {
                        setLiked(true);
                        setSaved(true);
                    }
                }
            } catch (error: any) {
                console.error("Error fetching project:", error);
            }
        };
        const fetchComment = async () => {
            try {
                const res = await axiosInst.get(`comment?limit=100&offset=0`);
                const commentsData = res.data.data;
                // Fetch user for each comment
                const updatedComments = await Promise.all(
                    commentsData.map(async (comment: any) => {
                        const user = await fetchUser(comment.userId); // Fetch user details
                        return { ...comment, user }; // Add user data to the comment
                    })
                );
                if (isMounted) {
                    setComments(updatedComments);
                }
            } catch (error: any) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchProject();
        fetchComment();
        return () => {
            isMounted = false; // Cleanup
        };
    }, [params.id, getProject]);

    const fetchUser = async (userId: string) => {
        try {
            const res = await axiosInst.get(`user/${userId}`);
            return res.data; // Assume the API returns user data
        } catch (error: any) {
            console.error("Error fetching user:", error);
        }
    };
    if (!project) {
        return <div>Loading...</div>;
    }

    const handleLike = async () => {
        const currentUser = getUser();
        if (!currentUser) {
            enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
            return;
        }
        // Optimistically toggle liked state
        const previousLikedState = liked;
        const updatedLiked = !liked;
        setLiked(updatedLiked);
        // Prepare the updated upvotes array based on the current like status
        const updatedUpvotes = updatedLiked
            ? [...(Array.isArray(project?.upvotes) ? project.upvotes : []), currentUser] // Add user ID if liked
            : (Array.isArray(project?.upvotes) ? project.upvotes.filter((id: string) => id !== currentUser) : []); // Remove user ID if unliked
        try {
            // Send the updated upvotes array to the server
            await axiosInst.patch(`projects/${project?._id}`, {
                title: project.title,
                description: project.description,
                technologyUsed: project.technologyUsed,
                category: project.category,
                bookmarksCount: project.bookmarksCount,
                upvotes: updatedUpvotes,
                thumbnailUrl: project.thumbnailUrl,
                thumbnailName: project.thumbnailName,
                userId: project.userId,
                commentId: project.commentId,
                gitLink: project.gitLink,
            });
            // Update the project state with the new upvotes
            setProject(prev => {
                if (prev) {
                    return { ...prev, upvotes: updatedUpvotes };
                }
                return prev;
            });
        } catch (error) {
            console.error("Error updating like status:", error);
            // Revert UI state in case of an error
            setLiked(previousLikedState);
        }
    };
    const handleSave = async () => {
        const currentUser = getUser();
        if (!currentUser) {
            enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
            return;
        }
        // Optimistically toggle liked state
        const previousSavedState = saved;
        const updatedSaved = !saved;
        setSaved(updatedSaved);
        // Prepare the updated upvotes array based on the current like status
        const updatedUpvotes = updatedSaved
            ? [...(Array.isArray(project?.bookmarksCount) ? project.bookmarksCount : []), currentUser] // Add user ID if liked
            : (Array.isArray(project?.bookmarksCount) ? project.bookmarksCount.filter((id: string) => id !== currentUser) : []); // Remove user ID if unliked
        try {
            // Send the updated upvotes array to the server
            await axiosInst.patch(`projects/${project?._id}`, {
                title: project.title,
                description: project.description,
                technologyUsed: project.technologyUsed,
                category: project.category,
                bookmarksCount: updatedUpvotes,
                upvotes: project.upvotes,
                thumbnailUrl: project.thumbnailUrl,
                thumbnailName: project.thumbnailName,
                userId: project.userId,
                commentId: project.commentId,
                gitLink: project.gitLink,
            });
            // Update the project state with the new upvotes
            setProject(prev => {
                if (prev) {
                    return { ...prev, bookmarksCount: updatedUpvotes };
                }
                return prev;
            });
        } catch (error) {
            console.error("Error updating like status:", error);
            setSaved(previousSavedState);
        }
    };
    const shareProject = async () => {
        try {
            const shareData = {
                title: project.title ?? "Something mouth watering!",
                url: `https://learnium.coolify.top/projects/${project._id}`,
            };
            if (navigator.share) {
                await navigator.share(shareData);
                enqueueSnackbar({ message: "Shared!", variant: "success" });
            } else {
                console.log("Web Share API is not supported.");
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar({
                message: "Please try sharing once more!",
                variant: "warning",
            });
        }
    };
    const createComment = async () => {
        if (!comment || !comment.trim()) return; // prevent adding empty comments
        try {
            const res = await axiosInst.post(`comment`, {
                comment: comment,
                userId: getUser(),
                projectId: params.id,
            });
            const newComment = res.data; // Get the new comment from response
            const user = await fetchUser(newComment.userId); // Fetch user for the new comment
            setComments((prevComments: any[]) => [...prevComments, { ...newComment, user }]);
            setComment("");
            await updateProjectCommentId(newComment.id);
        } catch (error: any) {
            console.error("Error adding comment:", error);
        }
    };
    const updateProjectCommentId = async (id: string) => {
        try {
            const updatedCommentIds = project.commentId
                ? [...project.commentId, id]
                : [id];
            const res = await axiosInst.patch(`projects/${project._id}`, {
                title: project.title,
                description: project.description,
                technologyUsed: project.technologyUsed,
                category: project.category,
                bookmarksCount: project.bookmarksCount,
                upvotes: project.upvotes,
                thumbnailUrl: project.thumbnailUrl,
                thumbnailName: project.thumbnailName,
                userId: project.userId,
                commentId: updatedCommentIds,
                gitLink: project.gitLink,
            });
            console.log("Updated project with new comment:", res.data);
        } catch (error: any) {
            console.error("Error updating project commentId:", error);
        }
    };
    return (
        <div className=" text-white min-h-screen p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">{project.title}</h1>
                    <button
                        className="flex items-center space-x-2 bg-purple-600 px-4 py-2 rounded-lg"
                        onClick={handleLike}
                    >
                        {liked ? <IconStarFilled size={20} color="gold" /> : <IconStar size={20} />}
                        <span>Give Learni Star</span>
                    </button>
                </div>
                <div className="my-10">
                    <Chip
                        variant="shadow"
                        color="secondary"
                        avatar={
                            <Avatar
                                name="JW"
                                src=""
                            />
                        }
                        className=""
                    >
                        {/* {project.owner?.about.name} */} Owner
                    </Chip>
                </div>
                <Divider className="bg-white w-full my-10" orientation="horizontal" />
                {/* <Image alt="test" src="/images/any.jpg" width={500} height={200} className="w-full rounded-lg" /> */}
                <div className="flex justify-between items-center mt-8">
                    <div className="flex space-x-4">
                        <button onClick={handleSave}>
                            {saved ? <IconBookmarkFilled size={20} color="green" /> : <IconBookmark size={20} />}
                        </button>
                        <button onClick={shareProject}>
                            <IconShare size={20} />
                        </button>
                    </div>
                    <div>
                        <Link
                            className="bg-purple-600 px-4 py-2 rounded-lg flex gap-2 items-center"
                            href={project.gitLink || "/"}
                        >
                            <IconBrandGithub size={20} />
                            View on Github
                        </Link>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Project Description :</h2>
                    <p className="mt-2 text-gray-400">{project.description}</p>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Tech Stack Used :</h2>
                    <ul className="mt-2 text-gray-400 gap-2 flex">
                        {project.technologyUsed.map((tech) => (
                            <Chip key={tech} color="secondary" variant="dot" className="text-white">
                                {tech}
                            </Chip>
                        ))}
                    </ul>
                </div>
                <Divider className="bg-white w-full my-10" orientation="horizontal" />
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold">Comments</h2>
                    <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                        <textarea
                            className="w-full p-3 bg-gray-900 rounded-lg text-gray-400"
                            placeholder="Write comment here..."
                            rows={3}
                            value={comment} // controlled input
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-purple-600 px-4 py-2 my-4 rounded-lg float-right"
                        onClick={createComment}
                    >
                        Submit
                    </button>
                    <div className="my-6">
                        {comments && project.commentId && comments
                            .filter((cmt) => project.commentId?.includes(cmt._id)) // Check if comment ID is in the array
                            .map((cmt) => (
                                <div key={cmt._id} className="p-4 my-4 rounded-lg flex space-x-4 w-[400px]">
                                    <Avatar src={cmt.user?.about.profilePicture || ""} />
                                    <div>
                                        <div className="flex space-x-2">
                                            <span className="font-semibold">{cmt.user?.about.name || "Unknown User"}</span>
                                        </div>
                                        <p className="text-gray-300">{cmt.comment}</p>
                                    </div>
                                </div>
                            ))}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ProjectDetailComponent;
