"use client"
import { useAuthContext } from "@/context/AuthContext";
import { getUser } from "@/hooks/get-user";
import { uploadToS3 } from "@/hooks/upload-s3";
import { axiosInstGen } from "@/utils/axios";
import { IconUpload } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";


interface VideoObj {
    raw: File | null,
    video: string | null
}

export const UploadModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {

    const [progress, setProgress] = useState(0);
    const { userToken } = useAuthContext();

    const handleClose = () => setOpen(false);
    const [video, setVideo] = useState<VideoObj>({
        raw: null,
        video: null
    });
    const [desc, setDesc] = useState({ caption: "", description: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file && file.type.startsWith("video/")) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result as string;
                setVideo({ raw: file, video: base64String });
            };
        }
    };

    const handleUpload = async () => {
        setLoading(true);
        setProgress(10);
        if (!userToken) {
            enqueueSnackbar({ message: "Please login to upload learnix video", variant: "warning" });
        }
        if (!video.raw && !video.video) {
            enqueueSnackbar({ message: "Please add a video!", variant: "warning" });
            return;
        }
        if (!desc.caption) {
            enqueueSnackbar({ message: "Caption cannot be empty", variant: "warning" });
            return;
        }
        if (!desc.description) {
            enqueueSnackbar({ message: "Description cannot be empty", variant: "warning" });
            return;
        }
        setProgress(20);
        try {
            console.log(video);
            const videoLoc = await uploadToS3(`${Date.now()}_${video.raw?.name.split(" ").join("_")}`, video.raw as File);
            setProgress(80);
            // console.log(videoLoc);
            const res = await axiosInstGen.post("/reel", {
                video: videoLoc,
                caption: desc.caption,
                description: desc.description,
                thumbnail: "",
                ownerId: userToken
            });
            setProgress(100);
            console.log(res);
            enqueueSnackbar({ message: "learnix uploaded!", variant: "success" });
            handleClose();
            router.refresh();
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ message: "Upload failed, please try again!", variant: "error" });
        } finally {
            setLoading(false);
            setProgress(0);
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center ${open ? "block" : "hidden"}`}
            onClick={handleClose}
        >
            <div
                className="w-4/5 md:w-[600px] bg-gray-800 rounded-xl border-[#9e5ad4] border-2 p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">Upload A LearniX</h2>
                    <button onClick={handleClose}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <label htmlFor="learnix-video" className="flex justify-center items-center mt-4">
                    <div className="w-150 h-200 border-2 border-dashed border-[#9e5ad4] rounded-12 flex items-center justify-center relative overflow-hidden">
                        {video.raw && video.video ? (
                            <video
                                src={video.video}
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                            />
                        ) : (
                            <div className="flex items-center px-5 py-2 gap-5">
                            <p className="text-white text-sm font-semibold">Choose a video </p>
                            <IconUpload className="text-white"/>
                            </div>
                        )}
                    </div>
                </label>
                <input
                    id="learnix-video"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <div className="mt-4 flex flex-col gap-5">
                    <div>
                        <label htmlFor="caption" className="block text-sm font-medium text-white">
                            Caption
                        </label>
                        <input
                            id="caption"
                            type="text"
                            placeholder="How use-client works in Next js"
                            className="text-white block w-full px-3 py-2 mt-1 text-sm border border-[#9e5ad4] rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            value={desc.caption}
                            onChange={(e) => setDesc((c) => ({ ...c, caption: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-white">
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            placeholder="In Next js ...."
                            className="block w-full  text-white px-3 py-2 mt-1 text-sm border border-[#9e5ad4] rounded-md shadow-sm "
                            value={desc.description}
                            onChange={(e) => setDesc((c) => ({ ...c, description: e.target.value }))}
                        />
                    </div>
                    {loading ? (
                        <div className="mt-4">
                            <progress className="w-full" value={progress} max="100"></progress>
                        </div>
                    ) : (
                        <button
                            onClick={handleUpload}
                            className="px-4 py-2 font-semibold text-white bg-[#9e5ad4] rounded-xl hover:bg-black"
                        >
                            Upload!
                        </button>)}
                </div>
            </div>
        </div>
    );
};
