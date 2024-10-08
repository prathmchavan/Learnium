import TestDetail from "@/components/Profile/TestRecord/TestDetail"

const Page = ({ params }: { params: any }) => {
    return (
        <div>
            <TestDetail params={params} />
        </div>
    )
}

export default Page;