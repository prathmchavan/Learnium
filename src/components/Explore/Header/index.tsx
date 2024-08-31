import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UploadModal } from "../UploadModal";
import { enqueueSnackbar } from "notistack";
import { getUser } from "@/hooks/get-user";
// import { ArrowBackIcon, UploadIcon } from "@/components/icons"; // Assume you have these icons available

export const ExploreHeader = () => {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="fixed top-2 md:top-7 w-full md:w-[400px] z-[999]">
            <div className="px-3 md:px-0 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            if (pathname === "/explore") {
                                router.replace("/");
                            } else {
                                router.replace("/explore");
                            }
                        }}
                        className="focus:outline-none"
                    >
                        {/* <ArrowBackIcon className="text-white" /> */}
                        <h1>arrow back</h1>
                    </button>
                    <h1 className="text-2xl font-semibold font-poiret-one text-white">
                        Treats
                    </h1>
                </div>
                <div className="relative">
                    <button
                        onClick={() => {
                            if (!getUser()) {
                                enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
                                return;
                            }
                            setOpen(true);
                        }}
                        className="focus:outline-none"
                    >
                        {/* <UploadIcon className="text-white" /> */}
                        <h1>upload icon</h1>
                    </button>
                    <span className="tooltip absolute right-0 -top-6 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        Upload a treat
                    </span>
                </div>
            </div>
            <UploadModal open={open} setOpen={setOpen} />
        </div>
    );
};
