"use client";
import React, { useRef, useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../../../ui/animated-modal";
import { ProjectForm } from "@/interface/projectForm";
import { Input, Button, Chip ,Kbd} from "@nextui-org/react";
import { ApiUrl, EnviromentId, ProjectId } from "@/constant/secrets";
import { axiosInst } from "@/utils/axios";
import { FileUpload } from "@/components/ui/file-upload";



export function UploadModal() {
    const [formData, setFormData] = useState<ProjectForm>({
        title: "",
        description: "",
        technologyUsed: [],
        category: "",
        thumbnailUrl: "",
        thumbnailName: "",
        userId: "",
        gitLink: ""
    });

    const [techInput, setTechInput] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const expTime = 604800;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleTechInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTechInput(e.target.value);
    };

    const handleTechInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " && techInput.trim() !== "") {
            // Add chip when space is pressed and techInput is not empty
            setFormData((prevFormData) => ({
                ...prevFormData,
                technologyUsed: [...(prevFormData.technologyUsed || []), techInput.trim()],
            }));
            setTechInput(""); // Clear the input field
        }
    };

    const handleDeleteChip = (tech: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            technologyUsed: prevFormData.technologyUsed?.filter(t => t !== tech) || [],
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Project submitted successfully");
                // Reset formData after submission
                setFormData({
                    title: "",
                    description: "",
                    technologyUsed: [],
                    category: "",
                    thumbnailUrl: "",
                    thumbnailName: "",
                    userId: "",
                    gitLink: ""
                });
            }
        } catch (error) {
            console.error("Error submitting project:", error);
        }
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

            // const res = await axiosInst.patch(`/user/${userToken}`,{
            //     professional: {
            //         role,
            //         skills,
            //         resume: cleanUrl,
            //         filename: `${filename}`  // Updated to 'profilePicture' instead of 'filename'
            //     }
            // })
         
            window.location.reload();
            // console.log(res)
            return cleanUrl;
        } catch (error) {
            console.error("Error fetching avatar URL:", error);
            return null;
        }
    }
    return (
        <div className="py-5 flex items-center justify-center">
            <Modal>
                <ModalTrigger className="bg-white text-black flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        Share Your Project!
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        💻 🧑‍💻
                    </div>
                </ModalTrigger>
                <ModalBody className="bg-gradient-to-t from-[#232526] to-[#414345] h-full no-scrollbar overflow-y-auto">
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-100 font-bold text-center mb-8">
                            Share Us Your{" "}
                            <span className="px-1 py-0.5 rounded-md bg-neutral-800 border-neutral-700 border">
                                {"<>"}Project{"</>"}
                            </span>{" "}
                            Details! 💻
                        </h4>
                        <div className="max-w-2xl mx-auto p-8">
                            <h1 className="text-3xl font-bold mb-6">Submit Your Project</h1>
                            <form onSubmit={handleSubmit} className="space-y-10 mt-10">
                                {/* Title */}
                                <div>
                                    <Input
                                        fullWidth
                                        label="Title"
                                        labelPlacement="outside"
                                        required
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full"
                                        color="success"
                                        isClearable
                                        isRequired
                                        onClear={() => setFormData(prevState => ({...prevState, title: ''}))}
                                    />
                                </div>
                                {/* Description */}
                                <div>
                                    <Input
                                        fullWidth
                                        label="Description"
                                        labelPlacement="outside"
                                        required
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full"
                                        color="success"
                                        onClear={() => setFormData(prevState => ({...prevState, description: ''}))}
                                        isClearable
                                        isRequired
                                />
                                </div>
                                {/* Technology Used */}
                                <div>
                                    <Input
                                        fullWidth
                                        label="Technology Used (Hit Space)"
                                        labelPlacement="outside"
                                        value={techInput}
                                        onChange={handleTechInputChange}
                                        onKeyUp={handleTechInputKeyPress}
                                        className="w-full"
                                        color="success"
                                        description="Hit Space For Adding Technology"
                                        isRequired
                                    />
                                    <div className="flex gap-2 mt-2">
                                        {formData.technologyUsed?.map((tech, index) => (
                                            <Chip
                                                key={index}
                                                color="success"
                                                onClose={() => handleDeleteChip(tech)}
                                                className="capitalize"
                                            >
                                                {tech}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                                {/* Category */}
                                <div>
                                    <Input
                                        fullWidth
                                        label="Category"
                                        labelPlacement="outside"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full"
                                        color="success"
                                        onClear={() => setFormData(prevState => ({...prevState, category: ''}))}
                                        isClearable
                                    />
                                </div> 
                                {/* Git Link */}
                                <div>
                                    <Input
                                        fullWidth
                                        label="GitHub Link"
                                        required
                                        labelPlacement="outside"
                                        name="gitLink"
                                        value={formData.gitLink}
                                        onChange={handleInputChange}
                                        className="w-full"
                                        color="success"
                                        onClear={() => setFormData(prevState => ({...prevState, gitLink: ''}))}
                                        isClearable
                                        isRequired
                                    />
                                </div>
                                <div className="my-5 flex justify-center align-middle flex-col">
                                    <h1 className="font-bold text-xl">Upload Image of Project :</h1>
                                <FileUpload onChange={handleFileUpload} />
                                {/* <h3>Your Resume: {user?.professional.filename}</h3> */}
                            </div>
                                {/* Submit Button */}
                                <Button type="submit" className="w-full bg-blue-500 text-white py-2 mt-4">
                                    Submit Project
                                </Button>
                            </form>
                        </div>
                    
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    );
}
