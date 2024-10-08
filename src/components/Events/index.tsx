'use client';
import { useEffect, useMemo, useState } from "react";
import { HoverEffect } from "../ui/card-hover-effect";
import EventNav from "./EventNav";
import { axiosInst } from "@/utils/axios";

interface Event {
  title: string;
  description: string;
  url: string;
  image: string;
  date: string;
  eventType: string;
  category: string;
  eventFormat: string;
}

export function EventComponent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedType, setSelectedType] = useState<Set<string>>(new Set());
  const [selectedFormat, setSelectedFormat] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const params = {
        limit: 10,
        offset: 0
      };

      const res = await axiosInst.get('/events', { params });
      setEvents(res.data.data); 
    } catch (error: any) {
      console.error("Failed to fetch events:", error.message);
    }
  };

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesType = selectedType.size === 0 || selectedType.has(event.eventType);
      const matchesFormat = selectedFormat.size === 0 || selectedFormat.has(event.eventFormat);
      const matchesCategory = selectedCategory.size === 0 || selectedCategory.has(event.category);
      return matchesType && matchesFormat && matchesCategory;
    });
  }, [events, selectedType, selectedFormat, selectedCategory]);

  return (
    <div className="p-16">
      <EventNav
        data={events}
        setSelectedType={setSelectedType}
        setSelectedFormat={setSelectedFormat}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="w-auto">
        <HoverEffect items={filteredEvents} />
      </div>
    </div>
  );
}
