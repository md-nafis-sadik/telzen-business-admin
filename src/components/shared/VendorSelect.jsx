import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function VendorSelect({ 
  vendors = [], 
  selectedVendor, 
  onVendorChange, 
  disabled = false,
  placeholder = "Select Vendor" 
}) {
  return (
    <Select 
      value={selectedVendor} 
      onValueChange={onVendorChange} 
      disabled={disabled}
    >
      <SelectTrigger className="max-w-[135px] h-8 text-sm border-none border-gray-300 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white z-[9999]">
        {vendors?.map((vendor, index) => (
          <SelectItem
            key={index}
            value={vendor.vendor_id}
            className="cursor-pointer text-sm truncate"
          >
            {vendor.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default VendorSelect;