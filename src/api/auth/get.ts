import { axiosInst } from "@/utils/axios";


export const getSelf = async (userToken:any) => {
	try {
		const res = await axiosInst.get(`/user/${userToken}`); 
        // console.log("from api ", res.data)
		return res.data;
	} catch (error) {
		//
	}
};
