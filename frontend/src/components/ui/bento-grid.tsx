import { cn } from "@/lib/utils";
import { TailwindcssButtons } from "../Global/TailwindcssButtons";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  link,
  linkname,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  link?: string | React.ReactNode;
  linkname?: string | React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-[#0B0121] border border-[#22066F] flex flex-col justify-between space-y-4",
        className
      )}
    >
      <div className="flex-grow">
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <div className="font-sans font-bold text-[#F6F6F6] dark:text-neutral-200 mb-2 mt-2 text-lg">
            {title}
          </div>
          <div className="font-sans font-normal text-[#F6F6F6] dark:text-neutral-300 my-2 text-sm">
            {description}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="relative inline-flex h-9 overflow-hidden rounded-lg p-[1px]">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            <Link href={`/${link}`}>{linkname}</Link>
          </span>
        </button>
      </div>
    </div>
  );
};
