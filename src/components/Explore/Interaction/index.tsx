import { ExploreContext, Reel } from "@/context/explore";
import { getUser } from "@/hooks/get-user";
import { axiosInst } from "@/utils/axios";
import { usePathname } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
// import { BookmarkIcon, BookmarkBorderIcon, FavoriteIcon, FavoriteBorderIcon, ShareIcon, CircularProgressIcon } from "@/components/icons"; // Replace with your icons

export const Interaction = ({ reelId, current, title, description, video }: { reelId: number | string, current: Reel, title: string, description: string, video: string }) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const { reels } = useContext(ExploreContext);
    const pathname = usePathname();

    useEffect(() => {
        const fetchLikedAndSaved = async () => {
            try {
                setLoading(true);
                const res = await axiosInst.get(`/reel/${reelId}/likes`, {
                    headers: {
                        Authorization: "Bearer " + getUser(),
                    },
                });
                setLiked(res.data.liked);

                const res2 = await axiosInst.get("/reel/collection", {
                    headers: {
                        Authorization: "Bearer " + getUser(),
                    },
                });
                if (res2.data.collection.reels?.includes(reelId)) {
                    setSaved(true);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (reelId === current?.id) {
            fetchLikedAndSaved();
        }
    }, [current]);

    useEffect(() => {
        const countLikes = () => {
            const reel = reels.find((reel) => reel.id === reelId);
            if (reel) {
                setLikeCount(reel.likes.length);
            }
        };
        countLikes();
    }, [reels, reelId]);

    const handleLike = async () => {
        const like = liked;
        if (!getUser()) {
            enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
            return;
        }
        try {
            setLiked(() => !like);
            const res = await axiosInst.put(`/reel/like/${reelId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getUser(),
                },
            });
            setLikeCount((prevCount) => (like ? prevCount - 1 : prevCount + 1));
        } catch (error) {
            setLiked(like);
        }
    };

    const handleSave = async () => {
        const save = saved;
        if (!getUser()) {
            enqueueSnackbar({ message: "You are not logged in!", variant: "warning" });
            return;
        }
        try {
            setSaved(() => !save);
            const res = await axiosInst.put(`/reel/add-to-collection/${reelId}`, {}, {
                headers: {
                    Authorization: "Bearer " + getUser(),
                },
            });
        } catch (error) {
            setSaved(save);
        }
    };

    const shareTreat = async () => {
        try {
            const shareData = {
                title: title ?? "Something mouth watering!",
                text: `Have a look at this treat I found for you! ${description}`,
                url: `https://onlymess.in/explore/${reelId}`,
            };

            if (navigator.share) {
                await navigator.share(shareData);
                enqueueSnackbar({ message: "Shared!", variant: "success" });
            } else {
                console.log("Web Share API is not supported.");
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ message: "Please try sharing once more!", variant: "warning" });
        }
    };

    return (
        <div className="absolute flex flex-col bottom-5 right-2 gap-3 z-[999]">
            {loading ? (
                // <CircularProgressIcon className="h-3 w-3" />
                <h1>loader</h1>
            ) : (
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col items-center">
                        <button onClick={handleLike} className="focus:outline-none">
                            {liked ? (
                                // <FavoriteIcon className="text-red-500" />
                                <h1>fav</h1>
                            ) : (
                                // <FavoriteBorderIcon className="text-gray-500" />
                                <h1>fav border</h1>
                            )}
                        </button>
                        <p className="text-white">{likeCount}</p>
                    </div>

                    <button onClick={handleSave} className="focus:outline-none">
                        {saved ? (
                            // <BookmarkIcon className="text-white" />
                            <h1>bookmark</h1>
                        ) : (
                            // <BookmarkBorderIcon className="text-gray-500" />
                            <h1>bookmark borderr</h1>
                        )}
                    </button>

                    <button onClick={shareTreat} className="focus:outline-none">
                        {/* <ShareIcon className="text-gray-500" /> */}
                        <h1>shhareicon</h1>
                    </button>
                </div>
            )}
        </div>
    );
};
