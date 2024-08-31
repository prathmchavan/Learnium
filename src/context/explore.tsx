"use client";


import { fetchReels } from "@/hooks/explore";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react"

export interface Reel {
    id: number,
    video: string,
    thumbnail: string,
    caption: string,
    description: string,
    likes: number[],
    ownerId: number,
    owner: {
        name: string,
        avatar: string,
        id: number
    }
};

interface ExploreContextInt {
    reels: Reel[],
    current: Reel | null,
    setCurrent: Dispatch<SetStateAction<Reel | null>>
};

export const ExploreContext = createContext<ExploreContextInt>({
    reels: [],
    current: null,
    setCurrent: () => { }
});

export const ExploreProvider = ({ children }: { children: ReactNode }) => {

    const [reels, setReels] = useState<Reel[]>([]);
    const [current, setCurrent] = useState<Reel | null>(null);
    const [page, setPage] = useState(0);

    const getReels = async () => {
        try {
            const res = await fetchReels(page);
            setReels((reels) => ([...reels, ...res]));
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getReels().then((res) => setCurrent(() => res[0]));
    }, [])

    return (
        <ExploreContext.Provider
            value={{
                reels,
                current,
                setCurrent
            }}
        >
            {children}
        </ExploreContext.Provider>
    )
}