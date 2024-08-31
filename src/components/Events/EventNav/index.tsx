import React from 'react';
import DropDown from '@/components/Global/DropDown';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholder-and-vanish-input';
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


interface EventNavProps {
  data: Event[];
  setSelectedType: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedFormat: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Set<string>>>;
  onSearchResults?: (results: Event[]) => void; // Optional prop
}

const EventNav = ({
  data,
  setSelectedType,
  setSelectedFormat,
  setSelectedCategory,
  onSearchResults,
}: EventNavProps) => {
  const eventTypes = Array.from(new Set(data.map(event => event.eventType)));
  const eventFormats = Array.from(new Set(data.map(event => event.eventFormat)));
  const eventCategories = Array.from(new Set(data.map(event => event.eventCategory)));

  const placeholders = [
    "Search the event"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className='flex gap-16'>
      <DropDown
        title='Event Type'
        placeholder='Select Event Type'
        options={eventTypes}
        onSelectionChange={setSelectedType}
      />
      <DropDown
        title='Event Format'
        placeholder='Select Event Format'
        options={eventFormats}
        onSelectionChange={setSelectedFormat}
      />
      <DropDown
        title='Category'
        placeholder='Select Category'
        options={eventCategories}
        onSelectionChange={setSelectedCategory}
      />

      {/* <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      /> */}
    </div>
  );
};

export default EventNav;
