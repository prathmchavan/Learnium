'use client'
import React, { useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInst } from "@/utils/axios";

interface Data {
    email: string,
    phone: string,
    password: string
}

const ContactComponent = () => {
    const { user, userToken } = useAuthContext();
    const [data, setData] = useState<Data>({
        email: "",
        phone: "",
        password: user?.contact.password ?? "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axiosInst.patch(`/user/${userToken}`, {
                contact: {
                    email: data.email || user?.contact.email,
                    phone: data.phone || user?.contact.phone,
                    password: data.password || user?.contact.password,
                },
            });
            window.location.reload();
            return res;
        } catch (error: any) {
            throw error.message;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            {userToken && (
                <div className="flex justify-center">
                    <BackgroundGradient className="rounded-[22px] max-w-md p-4 sm:p-10 bg-zinc-900 w-[500px] md:rounded-2xl md:p-8 shadow-input" containerClassName="w-auto">
                        <h2 className="font-bold text-xl text-neutral-200">Contact Section</h2>

                        <form className="my-8" onSubmit={handleSubmit}>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder={user?.contact.email} type="text" className="placeholder:text-white" onChange={handleChange} />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="phone">Phone no.</Label>
                                <Input id="phone" name="phone" placeholder={user?.contact.phone} type="text" className="placeholder:text-white" onChange={handleChange} />
                            </LabelInputContainer>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="password">Update Password</Label>
                                <Input id="password" name="password" placeholder="•••••••••••" type="password" className="placeholder:text-red-500" onChange={handleChange} />
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
        <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
    </div>
);

export default ContactComponent;
