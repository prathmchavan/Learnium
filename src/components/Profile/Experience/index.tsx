'use client'
import React, { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useAuthContext } from "@/context/AuthContext";
import { Divider } from "@nextui-org/divider";
import { FileUpload } from "@/components/ui/file-upload";

const ExperienceComponent = () => {
    const { user, userToken } = useAuthContext();
    const [files, setFiles] = useState<File[]>([]);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {


    };
    const updateAvatar = () => {


    };

    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        console.log(files);
    };

    return (
        <>
            {userToken && (

                <div className="flex justify-center ">
                    <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-zinc-900 w-[800px] md:rounded-2xl md:p-8 shadow-input" containerClassName=" w-auto">

                        <h2 className="font-bold text-xl text-neutral-200">Roles & Skills</h2>
                        <form className="my-8" onSubmit={handleSubmit}>

                            {/* name and bio section */}

                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">

                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="role">Which role describe you best? </Label>
                                    <Input id="role" name="role" placeholder={user?.professional.role} type="text" className=" placeholder:text-white" />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="skills">Your Skills</Label>
                                    <Input id="skills" name="skills" placeholder={user?.professional.skills} type="text" className=" placeholder:text-white" />
                                </LabelInputContainer>
                            </div>
                            {/* resume below */}
                            <div className="my-5">

                                <FileUpload onChange={handleFileUpload} />
                                <h3>Your Resume: {user?.professional.resume}</h3>
                            </div>

                            <button className="bg-gradient-to-br from-zinc-900 to-zinc-900 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] relative group" type="submit">
                                Save &rarr;
                                <BottomGradient />
                            </button>
                        </form>

                        <Divider className="my-8 bg-purple-500" />

                        <h2 className="font-bold text-xl text-neutral-200">Experience Section</h2>

                        <form className="my-8" onSubmit={handleSubmit}>
                            {/* name and bio section */}
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="position">Position</Label>
                                <Input id="position" name="position" placeholder={user?.experience.position} type="text" className=" placeholder:text-white" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" name="company" placeholder={user?.experience.company} type="text" className=" placeholder:text-white" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="startdate">Start Date</Label>
                                <Input id="startdate" name="startdate" placeholder={user?.experience.startDate} type="text" className=" placeholder:text-white" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="enddate">End Date</Label>
                                <Input id="enddate" name="enddate" placeholder={user?.experience.endDate} type="text" className=" placeholder:text-white" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" name="description" placeholder={user?.experience.description} type="text" className=" placeholder:text-white" />
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



export default ExperienceComponent;
