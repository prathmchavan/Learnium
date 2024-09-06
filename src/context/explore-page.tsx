"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { Reel } from "./explore";
import { useParams } from "next/navigation";
import { axiosInst, axiosInstGen } from "@/utils/axios";
import { enqueueSnackbar } from "notistack";



export interface User {
    avatar: string | null,
    city: string | null,
    email: string,
    emailVerified: boolean,
    followers: number[],
    followings: [],
    id: number,
    landmark: string | null,
    locality: string | null,
    name: string,
    phoneNumber: string | null,
    phoneVerified: boolean,
    signupType: "credentials" | "google",
    state: string | null,
}

interface ExplorePageContext {
    reel: Reel | null,
    postedBy: User | null
    like: Function,
    save: Function,
    share: Function
}

export const ExplorePageContext = createContext<ExplorePageContext>({
    reel: null,
    postedBy: null,
    like: () => { },
    save: () => { },
    share: () => { }
});

export const ExplorePageProvider = ({ children }: { children: ReactNode }) => {
    const {
        id: treatId
    } = useParams();
    const [reel, setReel] = useState<Reel | null>(null);
    const [postedBy, setPostedBy] = useState<User | null>(null);
    console.log(treatId);

    useEffect(() => {
        const fetchReel = async () => {
            try {
                const res = await axiosInstGen.get(`/reel/${treatId}`)
                console.log(res);
                setReel(() => res.data.reel);
                setPostedBy(() => res.data.postedBy);
            } catch (error) {
                enqueueSnackbar({ message: "Unable to get that one!", variant: "warning" });
            }
        };
        fetchReel();
    }, [])

    const like = async () => {

    }

    const save = async () => {

    }

    const share = async () => {

    }

    return (
        <ExplorePageContext.Provider
            value={{
                reel,
                postedBy,
                like,
                save,
                share
            }}
        >
            {children}
        </ExplorePageContext.Provider>
    )
}