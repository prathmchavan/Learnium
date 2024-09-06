"use client"
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UploadModal } from "../UploadModal";
import { enqueueSnackbar } from "notistack";
import { getUser } from "@/hooks/get-user";
import { IconArrowNarrowLeft, IconUpload } from "@tabler/icons-react";


// import { ArrowBackIcon, UploadIcon } from "@/components/icons"; // Assume you have these icons available

export const ExploreHeader = () => {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="absolute top-2 md:top-2 w-full md:w-[400px] z-[999]">
            <div className="px-3 md:px-0 flex justify-between items-center">
                <div className="flex items-center px-5">
                    <IconArrowNarrowLeft
                    size={28}
                    stroke={2}
                    color="white"
                    onClick={()=>{
                        if(pathname === '/techsnippets')
                        {
                            router.push('/')
                        }
                        else{
                            router.replace('/techsnippets')
                        }
                    }}
                    />
                
                </div>
                <div className="flex items-center ">
                  <IconUpload
                    size={28}
                    stroke={2}
                    color="white"
                  onClick={()=>{
                    setOpen(true)
                  }}/>
                </div>
            </div>
            <UploadModal open={open} setOpen={setOpen} />
        </div>
    );
};
