import { useEffect, useState } from "react";
import { axiosInst } from "@/utils/axios";
import { getUser } from "@/hooks/get-user";
import { enqueueSnackbar } from "notistack";

export const Description = ({ reelId, id, avatar, name, caption, description, current }: { reelId: number | string, id: number | string, avatar: string, name: string, caption: string, description: string, current: any }) => {
    const [expanded, setExpanded] = useState(false);
    const [following, setFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkFollowing = async () => {
            const follow = following;
            try {
                setLoading(true);
                const res = await axiosInst.get(`/user/is-following/${id}`, {
                    headers: {
                        Authorization: "Bearer " + getUser()
                    }
                });
                setFollowing(res.data.following);
            } catch (error) {
                console.error(error);
                setFollowing(follow);
            } finally {
                setLoading(false);
            }
        };

        if (reelId === current?.id) {
            checkFollowing();
        }
    }, [current]);

    const handleFollow = async () => {
        const foll = following;
        if (!getUser()) {
            enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
            return;
        }
        try {
            setFollowing(!foll);
            await axiosInst.put(`/user/follow/${id}`, {}, {
                headers: {
                    Authorization: "Bearer " + getUser()
                }
            });
        } catch (error) {
            console.error(error);
            setFollowing(foll);
        }
    };

    return (
        <div className="absolute flex flex-col bottom-5 left-2 gap-3 max-w-2/3 w-full z-50">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <img
                        src={avatar}
                        alt={name}
                        className="w-9 h-9 rounded-full"
                    />
                    <p className="text-white font-raleway text-sm">
                        {name}
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
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-3">
                    <p className="text-white font-semibold">{caption}</p>
                    {expanded && (
                        <p className="text-xs text-white">
                            {description}
                        </p>
                    )}
                </div>
                <button
                    className="text-gray-500 text-xs p-0 capitalize"
                    onClick={() => setExpanded((e) => !e)}
                >
                    {expanded ? "Less" : "More"}
                </button>
            </div>
        </div>
    );
};
