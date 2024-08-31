import { axiosInst } from "@/utils/axios";



export const fetchReels = async(page: number) => {
    try {
        const res = await axiosInst.get(`/reel?limit=10&offset=${Number(page) * 10}`);
        return res.data.reels
    } catch (error) {
        throw error;
    }
}