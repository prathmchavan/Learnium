import QuestionDetail from "@/components/Community/QuestionDetail";

const Page =({ params } : {params : any})=>{
    return(
        <>
        <QuestionDetail 
        params={params}
        />
        </>
    )
}

export default Page;