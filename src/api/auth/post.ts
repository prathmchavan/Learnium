import { axiosInst } from "@/utils/axios";


export const signupUser = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      const res = await axiosInst.post(
        "/user",
        {
            about:{
                name
                },
            contact: {
            email,
            phone,
            password,
          },
        }
      );
  
      // console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    }
  };
  

export const loginUser = async (email: string, password: string) => {
	try {
		const res = await axiosInst.post("/user/login",    {
            contact: {
                email,
                password,
              }
            });
		// console.log(res.data);
		return res.data;
	} catch (error: any) {
		console.log(error);
		throw error;
	}
};