import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { FilterSectionProps } from "@/interface/filtersection";



export default function FilterSection({ onFilterChange }: FilterSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<Selection>(new Set());
    const [selectedTechnology, setSelectedTechnology] = useState<Selection>(new Set());

    const selectedCategoryValue = React.useMemo(
        () => Array.from(selectedCategory).join(", ").replaceAll("_", " "),
        [selectedCategory]
    );
    const selectedTechnologyValue = React.useMemo(
        () => Array.from(selectedTechnology).join(", ").replaceAll("_", " "),
        [selectedTechnology]
    );
    const handleSelectionChange = () => {
        onFilterChange({
            category: Array.from(selectedCategory) as string[],
            technology: Array.from(selectedTechnology) as string[]
        });
    };
    return (
        <div className="flex flex-col gap-10 md:my-5 ">
            <Dropdown className="bg-gray-800">
                <DropdownTrigger>
                    <Button
                        className="capitalize text-white border-2 border-[#432c83] bg-black"
                    >
                        Category: {selectedCategoryValue || 'Select Category'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Category selection"
                    variant="shadow"
                    closeOnSelect={false}
                    selectionMode="multiple"
                    selectedKeys={selectedCategory}
                    onSelectionChange={keys => {
                        setSelectedCategory(keys);
                        handleSelectionChange();
                    }}
                    color="success"
                >
                    <DropdownItem key="SaaS">SaaS</DropdownItem>
                    <DropdownItem key="AI">AI</DropdownItem>
                    <DropdownItem key="E-commerce">E-commerce</DropdownItem>
                    <DropdownItem key="Education">Education</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown className=" bg-gray-800" >
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="capitalize text-white border-2 border-[#432c83] bg-black"
                    >
                        Technology: {selectedTechnologyValue || 'Select Technology'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Technology selection"
                    variant="shadow"
                    closeOnSelect={false}
                    selectionMode="multiple"
                    selectedKeys={selectedTechnology}
                    onSelectionChange={keys => {
                        setSelectedTechnology(keys);
                        handleSelectionChange();
                    }}
                    color="success"
                >
                    <DropdownItem key="React">React</DropdownItem>
                    <DropdownItem key="Next.js">Next.js</DropdownItem>
                    <DropdownItem key="Node.js">Node.js</DropdownItem>
                    <DropdownItem key="Python">Python</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
