"use client";
import React, {  useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../../../ui/animated-modal";
import { ProjectForm } from "@/interface/projectForm";
import { Input, Button, Chip ,Kbd} from "@nextui-org/react";
import { useProjectContext } from "@/context/ProjectContext";
import { getUser } from "@/hooks/get-user";
import { enqueueSnackbar } from "notistack";

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
    const {createProject} = useProjectContext();
    const [techInput, setTechInput] = useState("");

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
            setFormData((prevFormData) => ({
                ...prevFormData,
                technologyUsed: [...(prevFormData.technologyUsed || []), techInput.trim()],
            }));
            setTechInput("");
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
            const userId = getUser();
            if (userId && (typeof userId === 'string' || typeof userId === 'number')) {
                const updatedFormData = {
                    ...formData,
                    bookmarksCount: [],
                    upvotes:[],
                    userId: String(userId), 
                };
                // console.log(updatedFormData.userId, "this is userId");
                await createProject(updatedFormData);
                enqueueSnackbar({message:"Project submitted successfully",variant:'success'})
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
                window.location.reload();
            } else {
                console.error("User ID not available. Please log in or try again.");
            }
        } catch (error) {
            console.error("Error submitting project:", error);
        }
    };
    
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
                <ModalBody className="bg-gradient-to-b from-[#000000] to-[#401479] h-full no-scrollbar overflow-y-auto">
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
                                <div className="flex gap-3 flex-col">
                                    <Input
                                        fullWidth
                                        label="Title"
                                        labelPlacement="outside"
                                        required
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full light"
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
