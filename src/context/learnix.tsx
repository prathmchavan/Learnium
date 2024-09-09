"use client";
import { fetchReels } from "@/hooks/learnix";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react"

export interface Reel {
    _id: number,
    video: string,
    thumbnail: string,
    caption: string,
    description: string,
    likes: number[],
    ownerId: string,
    owner: {
        name: string,
        avatar: string,
        id: number
    }
};

interface LearnixContextInt {
    reels: Reel[],
    current: Reel | null,
    setCurrent: Dispatch<SetStateAction<Reel | null>>
};

export const LearnixContext = createContext<LearnixContextInt>({
    reels: [],
    current: null,
    setCurrent: () => { }
});

export const LearnixProvider = ({ children }: { children: ReactNode }) => {

    const [reels, setReels] = useState<Reel[]>([]);
    const [current, setCurrent] = useState<Reel | null>(null);
    const [page, setPage] = useState(0);

    const getReels = async () => {
        try {
            const res = await fetchReels(page);
            setReels((reels) => ([...reels, ...res]));
            console.log("i am here",res);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getReels().then((res) => setCurrent(() => res[0]));
    }, [])

    return (
        <LearnixContext.Provider
            value={{
                reels,
                current,
                setCurrent
            }}
        >
            {children}
        </LearnixContext.Provider>
    )
}