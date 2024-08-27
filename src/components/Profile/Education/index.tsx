'use client'
import React from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useAuthContext } from "@/context/AuthContext";
import { Avatar } from "@nextui-org/react";


const EducationComponent = () => {
    const { user, userToken } = useAuthContext();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {


    };
    const updateAvatar = () => {


    };
    return (
        <>
            {userToken && (

                <div className="flex justify-center ">
                    <BackgroundGradient className="rounded-[22px] max-w-md p-4 sm:p-10 bg-zinc-900 w-[500px] md:rounded-2xl md:p-8 shadow-input" containerClassName=" w-auto">

                    <h2 className="font-bold text-xl text-neutral-200">Education Section</h2>

                        <form className="my-8" onSubmit={handleSubmit}>
                            {/* name and bio section */}
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="degree">Degree</Label>
                                <Input id="degree" name="degree" placeholder={user?.education.degree} type="text" className=" placeholder:text-white" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="institution">Institution</Label>
                                <Input id="institution" name="institution" placeholder={user?.education.institution} type="text" className=" placeholder:text-white" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="yearofgrad">Year Of Graduation</Label>
                                <Input id="yearofgrad" name="yearofgrad" placeholder={user?.education.yearOfGraduation} type="text" className=" placeholder:text-white" />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="fieldofstudy">Field Of Study</Label>
                                <Input id="fieldofstudy" name="fieldofstudy" placeholder={user?.education.fieldOfStudy} type="text" className=" placeholder:text-white" />
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



export default EducationComponent;
