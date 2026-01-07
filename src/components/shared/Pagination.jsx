import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import SelectInput from "./SelectInput";
import { useState } from "react";

function Pagination({
  per_page,
  current_page,
  total_page,
  total_items = 0,
  updatePage = () => {},
}) {
  // Convert per_page to string for SelectInput
  const [filter, setFilter] = useState(String(per_page || 10));

  const filterOptions = [
    { id: 10, per_page: "10" },
    { id: 20, per_page: "20" },
    { id: 50, per_page: "50" },
    { id: 100, per_page: "100" },
    { id: 250, per_page: "250" },
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // Convert back to number when updating page
    updatePage({ current_page: 1, per_page: Number(newFilter) });
  };

  // Calculate showing range
  const fromEntry = total_items === 0 ? 0 : (current_page - 1) * per_page + 1;
  const toEntry = Math.min(current_page * per_page, total_items);

  return (
    <div className="flex items-center justify-end gap-6 py-2 px-6 rounded-b-lg ">
      <div className="text-text-500 text-base hidden md:block">
        Showing {fromEntry} to {toEntry} of {total_items} entries
      </div>
      <ResponsivePagination
        current={current_page}
        total={total_page == 0 ? 1 : total_page}
        onPageChange={(value) => updatePage({ current_page: value })}
        maxWidth={250}
      />

      <SelectInput
        data={filterOptions}
        value={filter}
        onValueChange={handleFilterChange}
        placeHolder="Filter by status"
        labelKey="per_page"
        selector="id"
        triggerClassName="w-20 !border-none px-3 py-0 truncate !border-white text-base bg-natural-50"
        dropdownClassName="!w-16"
      />
    </div>
  );
}

export default Pagination;
