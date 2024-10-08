"use client"
import BarChart from "../ChartsComps/BarChart"
import LineChart from "../ChartsComps/LineChart"
import PieChart from "../ChartsComps/PieChart"

const TestDetail = ({ params }: { params: { id: string } }) => {
    return (
        <div className="flex flex-col items-center space-y-8">
            <div className="flex gap-32 ">
                <div className="border-2 border-[#7d5dd4] bg-[#FFFFFF1A] p-5 flex justify-center items-center flex-col gap-5 rounded-xl">
                    <h2 className="text-xl font-bold">Section-wise Performance</h2>
                    <div className="w-[500px] h-96 flex justify-center">
                        <BarChart />
                    </div>
                </div>
                <div className="border-2 border-[#7d5dd4] bg-[#FFFFFF1A] p-5 flex justify-center items-center flex-col gap-5 rounded-xl">
                    <h2 className="text-xl font-bold">Time Analysis</h2>
                    <div className="w-[500px] h-96 flex justify-center">
                        <LineChart />
                    </div>
                </div>
            </div>
            <div className="border-2 border-[#7d5dd4] bg-[#FFFFFF1A] p-5 flex justify-center items-center flex-col gap-5 rounded-xl">
                <h2 className="text-xl font-bold">Answer Distribution</h2>
                <div className="w-[500px] h-96 flex justify-center ">
                    <PieChart />
                </div>
            </div>
        </div>
    )
}

export default TestDetail