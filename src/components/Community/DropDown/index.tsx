import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";

interface DropDownItem {
  key: string;
  label: string;
  icon: JSX.Element;
}

interface DropDownCompProps {
  title: string;
  className?: string;
  buttonVariant?: "solid" | "shadow" | "bordered" | "flat"; // Allow customization of button variant
  items: DropDownItem[]; // List of items for the dropdown menu
}

export const DropDownComp = ({ title, className, buttonVariant = "shadow", items }: DropDownCompProps) => {
  return (
    <div className={`my-2 ${className ? className : ""}`}>
      <Dropdown className="bg-black">
        <DropdownTrigger>
          <Button variant={buttonVariant}>
            {title}
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="shadow" aria-label="Dropdown menu with icons" className="bg-black" color="default">
          {items.map((item) => (
            <DropdownItem key={item.key} startContent={item.icon}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
