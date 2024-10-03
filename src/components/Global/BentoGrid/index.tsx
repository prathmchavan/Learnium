import { cn } from "@/lib/utils";
import React from "react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid  , BentoGridItem} from "@/components/ui/bento-grid";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto mt-16">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          link={item.link}
          linkname={item.linkname}
          className={i === 1 || i === 2 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Explore LearniX",
    description: "Discover short, engaging educational videos designed for quick learning. Perfect for on-the-go learners, explore various subjects like tech skills, science, and exam tips in a fun and easy-to-digest format.",
    link: "learnix",
    linkname:"Watch Now"
    // icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Upcoming Events",
    description: "Stay informed and engaged with the latest events happening within the Learnium community. Whether it's workshops, webinars, or networking events, there's always something exciting on the horizon. Don't miss out—register for an event today!",
    link: "event",
    linkname:"Explore"

    // icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Join the Conversation",
    description: "Connect with fellow learners and educators in our vibrant community. Share your thoughts, ask questions, and collaborate on ideas. Engage in meaningful discussions and be part of a supportive network that encourages growth and learning.",
    link: "community",
    linkname:"Join Now"

    // icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Showcase Your Projects",
    description:
      "Share your work with the world and get valuable feedback from your peers. Whether it's a coding project, a design, or a research paper, showcase your talent and creativity. Explore projects from other users, upvote your favorites, and contribute to the community's growth.",
    link: "project",
    linkname:"Share Now"

    // icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
 
];
