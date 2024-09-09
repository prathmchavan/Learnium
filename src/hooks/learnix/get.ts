import {  axiosInstGen, axiosInstGendev } from "@/utils/axios";



export const fetchReels = async(page: number) => {
    try {
        const res = await axiosInstGen.get(`/reel?limit=10&offset=${Number(page) * 10}`);
        return res.data.reels
    } catch (error) {
        throw error;
    }
}