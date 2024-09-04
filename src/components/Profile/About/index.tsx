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

interface Data {
    fullname: string,
    bio: string
}

const AboutComponent = () => {
    const { user, userToken } = useAuthContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<Data>({ fullname: "", bio: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

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

            // Handle success - return or log the response
            console.log("User data updated successfully", res.data);
           window.location.reload();
            return res.data;

        } catch (error: any) {
            // Handle error - log or show an error message
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

            // Step 1: Generate a Presigned URL by making a POST request to your API endpoint
            const response = await fetch(`${ApiUrl}storage-accounts/Avatar/upload`, {
                method: 'POST',
                headers: {
                    projectId: ProjectId,
                    environmentId: EnviromentId,
                },
                body: JSON.stringify({
                    name: file.name,
                    size: file.size,
                    expiresIn:3000
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate presigned URL");
            }

            const { url, fields } = await response.json();

            // Step 2: Use the URL and fields to upload the file
            const formData = new FormData();
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value as string);
            });
            formData.append('file', file);

            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            // console.log("this is upload response", uploadResponse);

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload file");
            }

            //step 3.  file name storing in db
            console.log("file name before backend req", file.name)

         
            // console.log("backend res after updating the filename", user?.about.filename)

            fetchAvatarUrl(file.name);

            alert("Avatar uploaded successfully!");
        } catch (error) {
            console.error("Error uploading avatar:", error);
            alert("There was an error uploading your avatar. Please try again.");
        }
    };

    const fetchAvatarUrl = async (filename: string) => {
        try {
            // console.log("filename inside", filename)
            const response = await fetch(`${ApiUrl}storage-accounts/Avatar/download?name=${encodeURIComponent(filename)}`, {
                method: 'GET',
                headers: {
                    projectId: ProjectId,
                    environmentId: EnviromentId,
                },
            });

            const data = await response.text();
            const cleanUrl = data.replace(/^"(.*)"$/, '$1'); // Removes surrounding double quotes if any

            // console.log("from inside", data);

            const res = await axiosInst.patch(`/user/${userToken}`,{
                about: {
                    name: `${user?.about.name}`,
                    bio: `${user?.about.bio}`,
                    profilePicture: cleanUrl,
                    filename: `${filename}`  // Updated to 'profilePicture' instead of 'filename'
                }
            })
         
            window.location.reload();
            // console.log(res)
            return cleanUrl;
        } catch (error) {
            console.error("Error fetching avatar URL:", error);
            return null;
        }
    }


    return (
        <>
            {userToken && (
                <div className="flex justify-center ">
                    <BackgroundGradient className="rounded-[22px] max-w-md p-4 sm:p-10 bg-zinc-900 w-[500px] md:rounded-2xl md:p-8 shadow-input" containerClassName=" w-auto">
                        <h2 className="font-bold text-xl text-neutral-200">About Section</h2>

                        <form className="my-8" onSubmit={handleSubmit}>
                            {/* profile pic section */}
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
                                        e.preventDefault(); // Prevent form submission
                                        fileInputRef.current?.click();
                                    }}
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={updateAvatar} // Call updateAvatar on file selection
                                />
                            </div>
                            {/* name and bio section */}
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="fullname">Full Name</Label>
                                <Input id="fullname" name="fullname" placeholder={user?.about.name} type="text" className=" placeholder:text-white" onChange={handleChange} />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" name="bio" placeholder={user?.about.bio} type="text" className=" placeholder:text-white" onChange={handleChange} />
                            </LabelInputContainer>

                            <button className="bg-gradient-to-br from-zinc-900 to-zinc-900 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] relative group" type="submit">
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
