import { ApiUrl, ApiUrl_Gen, EnviromentId, ProjectId } from "@/constant/secrets";
import axios from "axios";



export const axiosInst = axios.create({
	baseURL: ApiUrl,
	headers: {
	  projectId: ProjectId,
	  environmentId: EnviromentId,
	},
  });
  

  
export const axiosInstGen = axios.create({
	baseURL: ApiUrl_Gen,
	
  });
  

