'use client';
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";

interface DropDownProps {
  title: string;
  placeholder: string;
  options: string[];
  onSelectionChange: (selected: Set<string>) => void;
}

export default function DropDown({ title, placeholder, options, onSelectionChange }: DropDownProps) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  const handleSelectionChange = useCallback((keys: Selection) => {
    setSelectedKeys(keys);
  }, []);

  useEffect(() => {
    const updatedSelection = selectedKeys === "all"
      ? new Set(options)
      : new Set(Array.from(selectedKeys).filter((key): key is string => typeof key === 'string'));

    onSelectionChange(updatedSelection);
  }, [selectedKeys, onSelectionChange, options]);

  const selectedValue = useMemo(() => {
    if (selectedKeys === "all" || (selectedKeys instanceof Set && selectedKeys.size === 0)) {
      return placeholder;
    }
    return Array.from(selectedKeys).join(", ").replaceAll("_", " ");
  }, [selectedKeys, placeholder]);

  return (
    <Dropdown className="bg-white text-black">
      <DropdownTrigger>
        <Button 
          variant="shadow" 
          className={`capitalize ${selectedKeys === "all" || (selectedKeys instanceof Set && selectedKeys.size === 0) ? "text-white" : "text-white"}`}
          color="secondary"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label={`${title} selection`}
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection={false}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        color="secondary"
      >
        {options.map((option) => (
          <DropdownItem key={option} textValue={option}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
