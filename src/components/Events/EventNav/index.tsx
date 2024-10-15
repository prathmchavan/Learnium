import React, { useMemo, useCallback } from 'react';
import DropDown from '@/components/Global/DropDown';

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

interface EventNavProps {
  data: Event[];
  setSelectedType: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedFormat: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const EventNav = ({
  data,
  setSelectedType,
  setSelectedFormat,
  setSelectedCategory,
}: EventNavProps) => {
  const eventTypes = useMemo(() => Array.from(new Set(data.map(event => event.eventType))), [data]);
  const eventFormats = useMemo(() => Array.from(new Set(data.map(event => event.eventFormat))), [data]);
  const eventCategories = useMemo(() => Array.from(new Set(data.map(event => event.category))), [data]);

  const memoizedSetSelectedType = useCallback(setSelectedType, []);
  const memoizedSetSelectedFormat = useCallback(setSelectedFormat, []);
  const memoizedSetSelectedCategory = useCallback(setSelectedCategory, []);

  return (
    <div className='flex flex-col md:flex-row gap-5 mx-5 md:gap-16'>
      <DropDown
        title='Event Type'
        placeholder='Select Event Type'
        options={eventTypes}
        onSelectionChange={memoizedSetSelectedType}
      />
      <DropDown
        title='Event Format'
        placeholder='Select Event Format'
        options={eventFormats}
        onSelectionChange={memoizedSetSelectedFormat}
      />
      <DropDown
        title='Category'
        placeholder='Select Category'
        options={eventCategories}
        onSelectionChange={memoizedSetSelectedCategory}
      />
    </div>
  );
};

export default EventNav;
