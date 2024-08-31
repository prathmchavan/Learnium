import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        title: string;
        description: string;
        link: string;
        image: string;
        date: string;
        eventType: string;
        eventCategory: string;
        eventFormat: string;
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  py-10 ",
                className
            )}
        >
            {items.map((item, idx) => (
                <Link
                    href={item?.link}
                    key={item?.link}
                    className="relative group  block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-gradient-to-l from-[#da22ff]  to-[#9733ee]/[0.8] block  rounded-3xl "
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card
                        className="bg-white bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-5"
                        hovered={hoveredIndex === idx}
                    >
                        <CardImage src={item.image} />
                        <CardTitle hovered={hoveredIndex === idx}>
                            {item.title}
                        </CardTitle>
                        <CardDescription hovered={hoveredIndex === idx}>
                            {item.description}
                        </CardDescription>
                        <CardDetails hovered={hoveredIndex === idx}>
                            <CardEventCategory hovered={hoveredIndex === idx}>
                                {item.eventCategory}
                            </CardEventCategory>
                            <CardDate hovered={hoveredIndex === idx}>
                                {item.date}
                            </CardDate>
                            <CardEventType hovered={hoveredIndex === idx}>
                                {item.eventType}
                            </CardEventType>
                            <CardEventFormat hovered={hoveredIndex === idx}>
                                {item.eventFormat}
                            </CardEventFormat>
                        </CardDetails>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
    hovered,
}: {
    className?: string;
    children: React.ReactNode;
    hovered?: boolean;
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border  border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}
        >
            <div className="relative z-50">
                <div className={cn("p-4", hovered && "text-white")}>{children}</div>
            </div>
        </div>
    );
};

export const CardTitle = ({
    className,
    children,
    hovered,
}: {
    className?: string;
    children: React.ReactNode;
    hovered?: boolean;
}) => {
    return (
        <h4
            className={cn(
                "text-zinc-100 font-bold tracking-wide mt-4",
                hovered ? "text-white" : "text-zinc-100",
                className
            )}
        >
            {children}
        </h4>
    );
};

export const CardDescription = ({
    className,
    children,
    hovered,
}: {
    className?: string;
    children: React.ReactNode;
    hovered?: boolean;
}) => {
    return (
        <p
            className={cn(
                "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
                hovered ? "text-zinc-200" : "text-zinc-400",
                className
            )}
        >
            {children}
        </p>
    );
};

export const CardImage = ({
    src,
    className,
}: {
    src: string;
    className?: string;
}) => {
    return (
        <div className="relative h-40 w-full">
            <Image
                src={src}
                alt="Card image"
                layout="fill"
                objectFit="cover"
                className={cn("rounded-t-2xl", className)}
            />
        </div>
    );
};

export const CardDetails = ({
    className,
    children,
    hovered,
}: {
    className?: string;
    children: React.ReactNode;
    hovered?: boolean;
}) => {
    return (
        <div
            className={cn(
                "mt-4 text-sm text-zinc-400 space-y-2",
                hovered && "text-zinc-200",
                className
            )}
        >
            {children}
        </div>
    );
};

export const CardDate = ({
    className,
    children,
    hovered,
}: {
    className?: string;
    children: React.ReactNode;
    hovered?: boolean;
}) => {
    return (
        <p className={cn("text-zinc-400 text-xs", hovered ? "text-zinc-200" : "text-zinc-400", className)}>
            <span className="font-semibold">Date: </span>
            {children}
        </p>
    );
};

export const CardEventType = ({
    className,
    children,
    hovered,
}: {
    className?: string;
    children: React.ReactNode;
    hovered?: boolean;
}) => {
    return (
        <p className={cn("text-zinc-400 text-xs", hovered ? "text-zinc-200" : "text-zinc-400", className)}>
            <span className="font-semibold">Event Type: </span>
            {children}
        </p>
    );
};

export const CardEventCategory = ({
    className,
    children,
    hovered,
}: {
    className?: string;
    children: React.ReactNode;
    hovered?: boolean;
}) => {
    return (
        <p className={cn("text-zinc-400 text-xs", hovered ? "text-zinc-200" : "text-zinc-400", className)}>
            <span className="font-semibold">Category: </span>
            {children}
        </p>
    );
};

export const CardEventFormat = ({
    className,
    children,
    hovered,
}: {
    className?: string;
    children: React.ReactNode;
    hovered?: boolean;
}) => {
    return (
        <p className={cn("text-zinc-400 text-xs", hovered ? "text-zinc-200" : "text-zinc-400", className)}>
            <span className="font-semibold">Format: </span>
            {children}
        </p>
    );
};
