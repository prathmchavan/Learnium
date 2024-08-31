'use client';
import { useMemo, useState } from "react";
import { HoverEffect } from "../ui/card-hover-effect";
import EventNav from "./EventNav";

interface Event {
  title: string;
  description: string;
  link: string;
  image: string;
  date: string;
  eventType: string;
  eventCategory: string;
  eventFormat: string;
}


export function EventComponent() {
  const [selectedType, setSelectedType] = useState<Set<string>>(new Set());
  const [selectedFormat, setSelectedFormat] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(new Set());

  // Function to filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesType = selectedType.size === 0 || selectedType.has(event.eventType);
      const matchesFormat = selectedFormat.size === 0 || selectedFormat.has(event.eventFormat);
      const matchesCategory = selectedCategory.size === 0 || selectedCategory.has(event.eventCategory);
      return matchesType && matchesFormat && matchesCategory;
    });
  }, [selectedType, selectedFormat, selectedCategory]);

  return (
    <div className="p-16">
      <EventNav
        data={events}
        setSelectedType={setSelectedType}
        setSelectedFormat={setSelectedFormat}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="w-auto mx-auto px-8">
        <HoverEffect items={filteredEvents} />
      </div>
    </div>
  );
}

export const events: Event[] = [
  {
    title: "Introduction to AI and Machine Learning",
    description:
      "Join this beginner-friendly webinar to explore the basics of Artificial Intelligence and Machine Learning.",
    link: "#",
    image: "/images/any.jpg",
    date: "Fri 09 Feb 2024",
    eventType: "Webinar",
    eventCategory: "Technology",
    eventFormat: "Online",
  },
  {
    title: "Business Growth Strategies Workshop",
    description:
      "A workshop designed for entrepreneurs looking to scale their businesses effectively.",
    link: "#",
    image: "/images/any.jpg",
    date: "Sat 17 Mar 2024",
    eventType: "Workshop",
    eventCategory: "Business",
    eventFormat: "In-Person",
  },
  {
    title: "Annual Tech Innovation Hackathon",
    description:
      "Compete with the best minds in tech to create innovative solutions in this exciting hackathon.",
    link: "#",
    image: "/images/any.jpg",
    date: "Sun 20 Apr 2024",
    eventType: "Hackathon",
    eventCategory: "Technology",
    eventFormat: "Hybrid",
  },
  {
    title: "Financial Management for Startups",
    description:
      "An online webinar that teaches the essential financial management skills for startup founders.",
    link: "#",
    image: "/images/any.jpg",
    date: "Tue 10 May 2024",
    eventType: "Webinar",
    eventCategory: "Business",
    eventFormat: "Online",
  },
  {
    title: "Cloud Computing and DevOps Workshop",
    description:
      "Master the latest cloud computing and DevOps practices in this hands-on workshop.",
    link: "#",
    image: "/images/any.jpg",
    date: "Wed 21 Jun 2024",
    eventType: "Workshop",
    eventCategory: "Technology",
    eventFormat: "In-Person",
  },
  {
    title: "AI for Social Good Hackathon",
    description:
      "Participate in this hackathon to develop AI-driven solutions for social impact.",
    link: "#",
    image: "/images/any.jpg",
    date: "Fri 15 Jul 2024",
    eventType: "Hackathon",
    eventCategory: "Technology",
    eventFormat: "Online",
  },
];
