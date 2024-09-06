"use client"
import { useAuthContext } from "@/context/AuthContext";
import { getUser } from "@/hooks/get-user";
import { uploadToS3 } from "@/hooks/upload-s3";
import {  axiosInstGen } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";


interface VideoObj {
    raw: File | null,
    video: string | null
}

export const UploadModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {

    const [progress, setProgress] = useState(0);
    const {  userToken } = useAuthContext(); // Ensure `updateUser` exists in your context

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
            console.log(videoLoc);

            const res = await axiosInstGen.post("/reel", {
                video: videoLoc,
                caption: desc.caption,
                description: desc.description,
                thumbnail: "",
                ownerId: userToken
            });
            setProgress(100);

            console.log(res);
            enqueueSnackbar({ message: "Treat uploaded!", variant: "success" });
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
                className="w-4/5 md:w-300 bg-white rounded-12 p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Upload A Treat</h2>
                    <button onClick={handleClose}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <label htmlFor="treat-video" className="flex justify-center items-center mt-4">
                    <div className="w-150 h-200 border-2 border-dashed border-orange-500 rounded-12 flex items-center justify-center relative overflow-hidden">
                        {video.raw && video.video ? (
                            <video
                                src={video.video}
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                            />
                        ) : (
                            <p className="text-orange-500 text-sm font-semibold">Choose a video</p>
                        )}
                    </div>
                </label>
                <input
                    id="treat-video"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <div className="mt-4 flex flex-col gap-4">
                    {/* <MainInput
                        name="Caption"
                        fieldName="caption"
                        placeholder="Mouth watering..."
                        type="text"
                        onChange={(e) => setDesc((c) => ({ ...c, ["caption"]: e.target.value }))}
                        width="100%"
                        value={desc.caption}
                    />
                    <MainInput
                        name="Description"
                        fieldName="description"
                        placeholder="A wonderful treat for all..."
                        type="text"
                        onChange={(e) => setDesc((c) => ({ ...c, ["description"]: e.target.value }))}
                        width="100%"
                        value={desc.description}
                    /> */}
                       <div>
                        <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
                            Caption
                        </label>
                        <input
                            id="caption"
                            type="text"
                            placeholder="Mouth watering..."
                            className="text-black block w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            value={desc.caption}
                            onChange={(e) => setDesc((c) => ({ ...c, caption: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            placeholder="A wonderful treat for all..."
                            className="block w-full  text-black px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                            value={desc.description}
                            onChange={(e) => setDesc((c) => ({ ...c, description: e.target.value }))}
                        />
                    </div>
                    <h1>caption and description</h1>
                    {loading ? (
                        <div className="mt-4">
                            <progress className="w-full" value={progress} max="100"></progress>
                        </div>
                    ) : (
                        // <MainButton title="Upload!" onClick={handleUpload} />
                        <button
                        onClick={handleUpload}
                        className="px-4 py-2 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Upload!
                    </button>                    )}
                </div>
            </div>
        </div>
    );
};
