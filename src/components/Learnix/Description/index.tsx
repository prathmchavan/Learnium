"use client";
import { useEffect, useState, useRef } from "react";
import { axiosInst, axiosInstGendev } from "@/utils/axios";
import { getUser } from "@/hooks/get-user";
import { enqueueSnackbar } from "notistack";
import { Avatar } from "@nextui-org/avatar";
import { IconArrowBarDown, IconArrowBarUp } from "@tabler/icons-react";

// Create a cache for user data
const userCache = new Map<number | string, any>();

export const Description = ({ reelId, id, avatar, name, caption, description, current }: { reelId: number | string, id: number | string, avatar: string, name: string, caption: string, description: string, current: any }) => {
    const [expanded, setExpanded] = useState(false);
    const [following, setFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>();  // Allow `any` for initial state
    const isFetchingUser = useRef(false); // Ref to track if user fetching is in progress

    useEffect(() => {
        const checkFollowing = async () => {
            try {
                setLoading(true);
                const res = await axiosInst.get(`/user/is-following/${id}`);
                setFollowing(res.data.following);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUser = async () => {
            // Avoid fetching user data if already in cache
            if (userCache.has(id)) {
                setUser(userCache.get(id));  // Use cached data
            } else if (!isFetchingUser.current) {
                // Set flag to avoid duplicate requests
                isFetchingUser.current = true;
                try {
                    const res = await axiosInst.get(`user/${id}`);
                    setUser(res.data);
                    userCache.set(id, res.data);  // Cache the result
                } catch (error) {
                    console.error(error);
                } finally {
                    isFetchingUser.current = false;
                }
            }
        };

        fetchUser();  // Fetch user details only if not cached

        if (reelId === current?.id) {
            checkFollowing();
        }
    }, [current, id]);  // Include `id` to trigger fetch when the reel changes

    const handleFollow = async () => {
        if (!getUser()) {
            enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
            return;
        }

        try {
            setFollowing(!following);
            await axiosInstGendev.put(`/user/follow/${id}`);
        } catch (error) {
            console.error(error);
            setFollowing(following);
        }
    };

    return (
        <div className="absolute flex flex-col bottom-5 left-2 gap-3 max-w-2/3 w-full z-50">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                    <Avatar

                        src={user?.about.profilePicture || user?.about.name}
                        name="Profile Picture"
                        className="w-9 h-9 rounded-full"
                        isBordered
                        color="success"
                        isFocusable

                    />
                    <p className="text-white font-raleway text-sm">
                        {user?.about?.name ? user.about.name : "User Name"}
                    </p>
                </div>
                {loading ? (
                    <div className="w-3 h-3 border-2 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                    <button
                        className="border border-white text-white cursor-pointer text-sm px-2 py-1 rounded"
                        onClick={handleFollow}
                    >
                        {following ? "Unfollow" : "Follow"}
                    </button>
                )}
            </div>
            <div className="flex align-middle  items-center gap-3">
                <div className="flex flex-col gap-3">
                    <p className="text-white font-semibold">{caption}</p>
                    {expanded && (
                        <p className="text-xs text-white">
                            {description}
                        </p>
                    )}
                </div>
                <button
                    className="text-gray-300 text-xs  "
                    onClick={() => setExpanded((e) => !e)}
                >
                    {expanded ? <h1> less</h1> : <h1>more</h1>}
                </button>
            </div>
        </div>
    );
};
