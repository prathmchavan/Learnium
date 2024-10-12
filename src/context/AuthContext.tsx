"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "@/api/auth/post";
import { getSelf } from "@/api/auth/get";
import { getUser } from "@/hooks/get-user";
import { enqueueSnackbar } from "notistack";
useRouter

// Define the shape of the context
interface AuthContextType {
    login: (e: React.FormEvent) => Promise<void>;
    signup: (e: React.FormEvent) => Promise<void>;
    logout: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    user: any;
    userToken: any
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
    const [userToken, setUserToken] = useState<any>(null);
    const router = useRouter();
    const [data, setData] = useState<Data>({ fullname: "", email: "", phone: "", password: "" });

    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem("user");
            setUserToken(storedUser);
        };


        const fetchSelf = async () => {
            // setLoading(true);
            try {
                const Token = getUser();
                if (!Token) {
                    // console.log("i am here")
                    return;
                }
                // console.log(Token);
                const self = await getSelf(Token);

                setUser(self);
            } catch (error) {
                throw error;
            }

        };
        fetchSelf();
        fetchUser();

    }, []);



    const login = async (e: FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await loginUser(data.email, data.password);
            await localStorage.setItem("user", res._id);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
            window.location.replace("/");
            // enqueueSnackbar({message:"Login Successfull", variant:'success'})
        }
    };

    const signup = async (e:FormEvent) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const res = await signupUser(data.fullname, data.email, data.phone, data.password);
            // console.log(res)
            await localStorage.setItem("user", res.id);
        } catch (error) {
            console.error("Signup failed:", error);
        } finally {
            setIsLoading(false);
            window.location.replace("/");
        }
    };



    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.replace('/')
    };



    return (
        <AuthContext.Provider value={{ login, signup, logout, isLoading, handleChange, user, userToken }}>
            {children}
        </AuthContext.Provider>
    );
};
