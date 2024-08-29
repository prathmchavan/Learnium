'use client'
import React, { useState, useEffect } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useAuthContext } from "@/context/AuthContext";
import { Divider } from "@nextui-org/divider";
import { FileUpload } from "@/components/ui/file-upload";
import { axiosInst } from "@/utils/axios";
import { ApiUrl, EnviromentId, ProjectId } from "@/constant/secrets";

interface Experience {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Data {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

const ExperienceComponent = () => {
    const { user, userToken } = useAuthContext();
    const [files, setFiles] = useState<File[]>([]);
    const [data, setData] = useState<Data>({
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        description: ""
    });
    const [experienceList, setExperienceList] = useState<Experience[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        if (user) {
            setExperienceList(user.experience || []);
            setSkills(user.professional.skills || []);
            setRole(user.professional.role || "");
        }
    }, [user]);

    const handleExpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedExperienceList = [...experienceList, data];
            const res = await axiosInst.put(`/user/${userToken}`, {
                experience: updatedExperienceList,
              
            });

            // Update state with response data if needed
            setExperienceList(updatedExperienceList);
            alert("Profile updated successfully!");
        } catch (error: any) {
            console.error("Error updating profile:", error.message);
            alert("There was an error updating your profile. Please try again.");
        }
    };

    const handleSkillpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
         
            const res = await axiosInst.put(`/user/${userToken}`, {
              
                professional: {
                    role,
                    skills
                }
            });

            // Update state with response data if needed
           
            alert("skills updated successfully!");
        } catch (error: any) {
            console.error("Error updating profile:", error.message);
            alert("There was an error updating your profile. Please try again.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSkillChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const skillInput = (e.target as HTMLInputElement).value.trim();
            if (skillInput) {
                setSkills(prevSkills => [...prevSkills, skillInput]);
                (e.target as HTMLInputElement).value = ''; // Clear input field
            }
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(prevSkills => prevSkills.filter(skill => skill !== skillToRemove));
    };

    const handleFileUpload = async (files: File[]) => {
        try {
            setFiles(files);
            console.log(files);
            const response = await fetch(`${ApiUrl}storage-accounts/Avatar/upload`, {
                method: 'POST',
                headers: {
                    projectId: ProjectId,
                    environmentId: EnviromentId,
                },
                body: JSON.stringify({
                    name: files[0].name,
                    size: files[0].size,
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
            formData.append('file', files[0]);

            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            // console.log("this is upload response", uploadResponse);

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload file");
            }

            //step 3.  file name storing in db
            console.log("file name before backend req", files[0].name)

         
            // console.log("backend res after updating the filename", user?.about.filename)

            fetchResume(files[0].name);

            alert("Avatar uploaded successfully!");
            
        } catch (error) {
            
        }
    };

    const fetchResume = async (filename: string) => {
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
                professional: {
                    role,
                    skills,
                    resume: cleanUrl,
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

    const handleDeleteExperience = async (index: number) => {
        const updatedExperienceList = experienceList.filter((_, i) => i !== index);

        try {
            await axiosInst.put(`/user/${userToken}`, {
                experience: updatedExperienceList,
                professional: {
                    role,
                    skills
                }
            });

            setExperienceList(updatedExperienceList);
            alert("Experience deleted successfully!");
        } catch (error: any) {
            console.error("Error deleting experience:", error.message);
            alert("There was an error deleting the experience. Please try again.");
        }
    };

    return (
        <>
            {userToken && (
                <div className="flex justify-center">
                    <BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-zinc-900 w-[800px] md:rounded-2xl md:p-8 shadow-input" containerClassName="w-auto">

                        <h2 className="font-bold text-xl text-neutral-200">Roles & Skills</h2>
                        <form className="my-8" onSubmit={handleSkillpSubmit}>

                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="role">Which role describes you best?</Label>
                                    <Input id="role" name="role" placeholder={role} type="text" className="placeholder:text-white" value={role} onChange={e => setRole(e.target.value)} />
                                </LabelInputContainer>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="skills">Your Skills</Label>
                                    <Input id="skills" name="skills" placeholder="Press space or enter to add" type="text" className="placeholder:text-white" onKeyDown={handleSkillChange} />
                                    <div className="flex flex-wrap mt-2">
                                        {skills.map(skill => (
                                            <div key={skill} className="flex items-center bg-blue-500 text-white rounded-full px-2 py-1 mr-2 mb-2">
                                                {skill}
                                                <button type="button" onClick={() => removeSkill(skill)} className="ml-2 text-sm">x</button>
                                            </div>
                                        ))}
                                    </div>
                                </LabelInputContainer>
                            </div>

                            <div className="my-5">
                                <FileUpload onChange={handleFileUpload} />
                                <h3>Your Resume: {user?.professional.filename}</h3>
                            </div>

                            <button className="bg-gradient-to-br from-zinc-900 to-zinc-900 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] relative group" type="submit">
                                Save &rarr;
                                <BottomGradient />
                            </button>
                        </form>

                        <Divider className="my-8 bg-purple-500" />

                        <h2 className="font-bold text-xl text-neutral-200">Experience Section</h2>

                        {experienceList.length > 0 && (
                            <div className="my-8">
                                {experienceList.map((exp, index) => (
                                    <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg">
                                        <h3 className="text-lg font-bold text-white">{exp.position}</h3>
                                        <p className="text-white">Company: {exp.company}</p>
                                        <p className="text-white">Start Date: {exp.startDate}</p>
                                        <p className="text-white">End Date: {exp.endDate}</p>
                                        <p className="text-white">Description: {exp.description}</p>
                                        <button onClick={() => handleDeleteExperience(index)} className="text-red-500">Delete</button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <form className="my-8" onSubmit={handleExpSubmit}>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="position">Position</Label>
                                <Input id="position" name="position" placeholder="Position" type="text" className="placeholder:text-white" onChange={handleChange} />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" name="company" placeholder="Company" type="text" className="placeholder:text-white" onChange={handleChange} />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input id="startDate" name="startDate" placeholder="Start Date" type="text" className="placeholder:text-white" onChange={handleChange} />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input id="endDate" name="endDate" placeholder="End Date" type="text" className="placeholder:text-white" onChange={handleChange} />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" name="description" placeholder="Description" type="text" className="placeholder:text-white" onChange={handleChange} />
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
    );
};


const BottomGradient = () => (
    <>
        <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    </>
);

const LabelInputContainer = ({ className, children }: React.PropsWithChildren<{ className?: string }>) => (
    <div className={cn("flex flex-col", className)}>
        {children}
    </div>
);

export default ExperienceComponent;
