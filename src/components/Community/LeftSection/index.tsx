import { IconArrowUpCircle, IconBallpen, IconMessageCircle } from "@tabler/icons-react"

export const LeftSection =()=>{
    return(
  
            <div className="space-y-4 w-96 h-96">
              <button className="w-full flex items-center justify-between border-[#432c83] border-2 p-2 rounded-xl">
                My Questions
                <IconArrowUpCircle className="h-5 w-5" />
              </button>
              <button className="w-full flex items-center justify-between border-[#432c83] border-2 p-2 rounded-xl">
                My Answers
                <IconMessageCircle className="h-5 w-5" />
              </button>
              <button className="w-full flex items-center justify-between border-[#432c83] border-2 p-2 rounded-xl">
                Post Question
                <IconBallpen className="h-5 w-5" />
              </button>
            </div>
      
    )
}