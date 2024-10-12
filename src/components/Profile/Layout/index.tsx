'use client'
import { ProfileNav } from "@/components/Profile/ProfileNav";
import { AuthProvider } from "@/context/AuthContext";
import { TestProvider } from "@/context/TestContext";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile ",
    description: "Personalised your learnium"
}

export default function ProfileLayout({
    children,
}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <AuthProvider>
            <TestProvider>
                <div className="">
                    <ProfileNav />
                    {children}
                </div>
            </TestProvider>
        </AuthProvider>
    );
}