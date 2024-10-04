import ProjectDetailComponent from "@/components/Project/ProjectDetail"

const Page =({ params } : {params : any})=>{
    return(
        <ProjectDetailComponent 
        params={params}
        />
    )
}

export default Page;