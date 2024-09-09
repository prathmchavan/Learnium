"use client"
import { LearnixContext, Reel } from "@/context/learnix";
import { getUser } from "@/hooks/get-user";
import { axiosInst, axiosInstGen, axiosInstGendev } from "@/utils/axios";
import { IconBookmark, IconBookmarkFilled, IconHeart ,IconHeartFilled, IconShare3 } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";

export const Interaction = ({ reelId, current, title, description, video }: { reelId: number | string, current: Reel, title: string, description: string, video: string }) => {
    const [liked, setLiked] = useState<boolean>(false);
    const [saved, setSaved] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const { reels } = useContext(LearnixContext);
    const pathname = usePathname();
    useEffect(() => {
        const fetchLikedAndSaved = async () => {
            try {
                setLoading(true);
                const res = await axiosInstGen.get(`/reel/${reelId}/likes`, {
                    headers: {
                        Authorization: "Bearer " + getUser(),
                    },
                });
                setLiked(res.data.liked);
                // const res2 = await axiosInstGen.get("/reel/collection", {
                //     headers: {
                //         Authorization: "Bearer " + getUser(),
                //     },
                // });
                // if (res2.data.collection.reels?.includes(reelId)) {
                //     setSaved(true);
                // }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (reelId === current?._id) {
            fetchLikedAndSaved();
        }
    }, [current]);
    useEffect(() => {
        const countLikes = () => {
            const reel = reels.find((reel) => reel._id === reelId);
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
            const res = await axiosInstGen.put(`/reel/like/${reelId}`, {}, {
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
            // const res = await axiosInst.put(`/reel/add-to-collection/${reelId}`, {}, {
            //     headers: {
            //         Authorization: "Bearer " + getUser(),
            //     },
            // });
        } catch (error) {
            setSaved(save);
        }
    };
    const shareTreat = async () => {
        try {
            const shareData = {
                title: title ?? "Something mouth watering!",
                text: `Have a look at this treat I found for you! ${description}`,
                url: `https://onlymess.in/Learnix/${reelId}`,
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
        <div className="absolute flex flex-col bottom-5 right-6 gap-3 z-[999]">
            {loading ? (
                // <CircularProgressIcon className="h-3 w-3" />
                <h1>loader</h1>
            ) : (
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col items-center">
                        <button onClick={handleLike} className="focus:outline-none">
                            {liked ? (
                                // <FavoriteIcon className="text-red-500" />
                                <IconHeartFilled 
                                color="red"
                                />
                            ) : (
                                // <FavoriteBorderIcon className="text-gray-500" />
                                <IconHeart />
                            )}
                        </button>
                        <p className="text-white">{likeCount}</p>
                    </div>
                    <button onClick={handleSave} className="focus:outline-none">
                        {saved ? (
                           <IconBookmark/>
                        ) : (
                            <IconBookmarkFilled/>
                        )}
                    </button>
                    <button onClick={shareTreat} className="focus:outline-none">
                        <IconShare3/>
                    </button>
                </div>
            )}
        </div>
    );
};
