"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "@/api/auth/post";
useRouter

// Define the shape of the context
interface AuthContextType {
    login: (e: React.FormEvent) => Promise<void>;
    signup: (e: React.FormEvent) => Promise<void>;
    logout: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    user: any;  // Define a more specific type if needed
}

interface Data {
    fullname: string;
    email: string;
    phone: string;
    password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<any>(null); // Use a more specific type if available
    const router = useRouter();
    const [data, setData] = useState<Data>({ fullname: "", email: "", phone: "", password: "" });

    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem("user");
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };

        fetchUser();

    }, [user]);

    const login = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await loginUser(data.email, data.password);
            localStorage.setItem("user", JSON.stringify(res));
            setUser(res);
            window.location.replace("/");        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await signupUser(data.fullname, data.email, data.phone, data.password);
            localStorage.setItem("user", JSON.stringify(res));
            setUser(res);
            window.location.replace("/");    
        } catch (error) {
            console.error("Signup failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        router.replace("/");
    };

   

    return (
        <AuthContext.Provider value={{ login, signup, logout, isLoading, handleChange, user }}>
            {children}
        </AuthContext.Provider>
    );
};
