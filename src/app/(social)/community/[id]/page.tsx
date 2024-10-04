import QuestionDetail from "@/components/Community/QuestionDetail"

const Page =({params}:{params :{ id:string }})=>{
    return(
        <QuestionDetail params={params}/>
    )
}

export default Page;