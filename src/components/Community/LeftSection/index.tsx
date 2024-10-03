import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import { IconArrowUpCircle, IconBallpen, IconMessageCircle } from "@tabler/icons-react";

export const LeftSection = () => {
    return (
        <div>
            {/* Div section for larger screens (laptops and monitors) */}
            <div className="hidden md:flex space-y-4 md:w-96 md:h-96 md:flex-col">
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

         
        </div>
    );
};
