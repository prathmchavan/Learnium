'use client'
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useAuthContext } from "@/context/AuthContext";
import { Avatar } from "@nextui-org/react";
import { ApiUrl, EnviromentId, ProjectId } from "@/constant/secrets";
import { axiosInst } from "@/utils/axios";
import { enqueueSnackbar } from "notistack";

interface Data {
    fullname: string,
    bio: string
}

const AboutComponent = () => {
    const { user, userToken } = useAuthContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<Data>({ fullname: "", bio: "" });
    const expTime = 604800;
    // Ref to store the timer ID for URL rotation
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    // Handle input changes for fullname and bio
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    // Handle form submission to update user data
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axiosInst.patch(`/user/${userToken}`, {
                about: {
                    name: data.fullname || user?.about.name,
                    bio: data.bio || user?.about.bio,
                    profilePicture: user?.about.profilePicture,
                    filename: user?.about.filename,
                }
            });
            // Update the user context with the new data
            console.log("User data updated successfully", res.data);
            // updateUser(res.data); // Ensure this updates the context appropriately
            return res.data;
        } catch (error: any) {
            console.error("Error updating user data:", error.message);
            throw new Error(error.message);
        }
    };

    const updateAvatar = async () => {
        try {
            const file = fileInputRef.current?.files?.[0];
            if (!file) {
                alert("Please select a file to upload.");
                return;
            }
            // console.log(expTime)
            const response = await fetch(`${ApiUrl}storage-accounts/Avatar/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    projectId: ProjectId,
                    environmentId: EnviromentId,
                },
                body: JSON.stringify({
                    name: file.name,
                    size: file.size,
                    expiresIn: expTime // 1 week in seconds
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate presigned URL");
            }

            const { url, fields } = await response.json();
            const formData = new FormData();

            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value as string);
            });

            formData.append('file', file);
            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload file");
            }
            // console.log("File uploaded successfully:", file.name);
            await fetchAvatarUrl(file.name);
            alert("Avatar uploaded successfully!");
        } catch (error) {
            console.error("Error uploading avatar:", error);
            alert("There was an error uploading your avatar. Please try again.");
        }
    };

    const getExpirationTime = (url: string): Date | null => {
        try {
            const urlObj = new URL(url);
            const searchParams = urlObj.searchParams;
            const amzDate = searchParams.get('X-Amz-Date');
            const amzExpires = searchParams.get('X-Amz-Expires');
            if (!amzDate || !amzExpires) return null;
            const year = parseInt(amzDate.substring(0, 4));
            const month = parseInt(amzDate.substring(4, 6)) - 1;
            const day = parseInt(amzDate.substring(6, 8));
            const hour = parseInt(amzDate.substring(9, 11));
            const minute = parseInt(amzDate.substring(11, 13));
            const second = parseInt(amzDate.substring(13, 15));
            const amzDateParsed = new Date(Date.UTC(year, month, day, hour, minute, second));
            const expiresIn = parseInt(amzExpires, 10);
            if (isNaN(expiresIn)) return null;
            const expirationTime = new Date(amzDateParsed.getTime() + expiresIn * 1000);
            return expirationTime;
        } catch (error) {
            console.error("Error parsing expiration time from URL:", error);
            return null;
        }
    }

    const fetchAvatarUrl = async (filename: string) => {
        try {
            console.log(expTime)
            const response = await fetch(`${ApiUrl}storage-accounts/Avatar/download?name=${encodeURIComponent(filename)}&expiresIn=${expTime}`, {
                method: 'GET',
                headers: {
                    projectId: ProjectId,
                    environmentId: EnviromentId,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch avatar URL");
            }

            const data = await response.text();
            const cleanUrl = data.replace(/^"(.*)"$/, '$1');
            // console.log(cleanUrl)
            // Update the user profile with the new pre-signed URL
            const res = await axiosInst.patch(`/user/${userToken}`, {
                about: {
                    name: user?.about.name,
                    bio: user?.about.bio,
                    profilePicture: cleanUrl,
                    filename: filename
                }
            });
            enqueueSnackbar({ message: "Avatar URL updated successfully", variant: 'success' })
            // console.log("Avatar URL updated successfully", res.data);
            // Update the user context with the new data
            // updateUser(res.data); // Ensure this updates the context appropriately
            return cleanUrl;
        } catch (error) {
            console.error("Error fetching avatar URL:", error);
            return null;
        }
    }

    useEffect(() => {
        const url = user?.about.profilePicture;
        const filename = user?.about.filename;
        if (!url || !filename) return;
        const expirationTime = getExpirationTime(url);
        if (!expirationTime) {
            console.error("Could not determine expiration time for the pre-signed URL.");
            return;
        }
        const now = new Date();
        const refreshTime = new Date(expirationTime.getTime() - 12 * 60 * 60 * 1000); 
        const delay = refreshTime.getTime() - now.getTime();

        if (delay <= 0) {
            fetchAvatarUrl(filename);
        } else {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                fetchAvatarUrl(filename);
            }, delay);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [user?.about.profilePicture, user?.about.filename]);

    return (
        <>
            {userToken && (
                <div className="flex justify-center">
                    <BackgroundGradient className="rounded-[22px] max-w-md p-4 sm:p-10 bg-zinc-900 w-[300px] md:w-[500px] md:rounded-2xl md:p-8 shadow-input" containerClassName=" w-auto">
                        <h2 className="font-bold text-xl text-neutral-200">About Section</h2>
                        <form className="my-8" onSubmit={handleSubmit}>
                            <div className="flex justify-center">
                                <Avatar
                                    as="button"
                                    src={user?.about.profilePicture || user?.about.name}
                                    name="Profile Picture"
                                    className="w-56 h-56 text-large"
                                    isBordered
                                    color="success"
                                    isFocusable
                                    onClick={(e) => {
                                        e.preventDefault(); 
                                        fileInputRef.current?.click();
                                    }}
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={updateAvatar} 
                                />
                            </div>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="fullname">Full Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    placeholder={user?.about.name}
                                    type="text"
                                    className="placeholder:text-white"
                                    onChange={handleChange}
                                />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="bio">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    placeholder={user?.about.bio}
                                    type="text"
                                    className="placeholder:text-white"
                                    onChange={handleChange}
                                />
                            </LabelInputContainer>
                            <button
                                className="bg-gradient-to-br from-zinc-900 to-zinc-900 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] relative group"
                                type="submit"
                            >
                                Save &rarr;
                                <BottomGradient />
                            </button>
                        </form>
                    </BackgroundGradient>
                </div>
            )}
        </>
    )
}

const BottomGradient = () => (
    <>
        <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
    </div>
);

export default AboutComponent;
