import { ApiUrl, ApiUrl_Gen, ApiUrl_Gendev, EnviromentId, ProjectId } from "@/constant/secrets";
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
  

  export const axiosInstGendev = axios.create({
	baseURL: ApiUrl_Gendev,
	
  });
  
