"use client";
import React, {  useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../../ui/animated-modal";
import { Input, Button, Chip ,Kbd} from "@nextui-org/react";
import { getUser } from "@/hooks/get-user";
import { Question } from "@/interface/communityTypes";
import { useCommunityContext } from "@/context/CommunityContext";


export function PostQuestionModal() {
    const [formData, setFormData] = useState<Question>({
        title: "",
        content: "",
        tags: [],
    });
    const { createQuestion } = useCommunityContext();
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
            // Add chip when space is pressed and techInput is not empty
            setFormData((prevFormData) => ({
                ...prevFormData,
                tags: [...(prevFormData.tags || []), techInput.trim()],
            }));
            setTechInput(""); // Clear the input field
        }
    };

    const handleDeleteChip = (tech: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            tags: prevFormData.tags?.filter(t => t !== tech) || [],
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userId = getUser();
            if (userId && (typeof userId === 'string' || typeof userId === 'number')) {
                const updatedFormData = {
                    ...formData,
                    votes:[],
                    views: [],
                    ownerId: String(userId),
                    answersId:[],
                };
                console.log(updatedFormData, "this is userId");
                await createQuestion(updatedFormData);
                alert("Project submitted successfully");
                setFormData({
                    title: "",
                    content: "",
                    tags: []
                });
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
                <ModalTrigger className="text-white border-2 border-[#432c83] flex justify-center group/modal-btn rounded-xl">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        Post Question
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20 ">
                        💻 🧑‍💻
                    </div>
                </ModalTrigger>
                <ModalBody className="bg-gradient-to-b from-[#000000] to-[#401479] h-full no-scrollbar overflow-y-auto">
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-100 font-bold text-center mb-8">
                           Write Your{" "}
                            <span className="px-1 py-0.5 rounded-md bg-neutral-800 border-neutral-700 border">
                                {"<>"}Question{"</>"}
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
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        className="w-full"
                                        color="success"
                                        onClear={() => setFormData(prevState => ({...prevState, content: ''}))}
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
                                        {formData.tags?.map((tag, index) => (
                                            <Chip
                                                key={index}
                                                color="success"
                                                onClose={() => handleDeleteChip(tag)}
                                                className="capitalize"
                                            >
                                                {tag}
                                            </Chip>
                                        ))}
                                    </div>
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

