import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import SelectInput from "./SelectInput";
import { useState } from "react";

const ChevronLeftIcon = ({ className = "", disabled = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M14.6583 15L15.8333 13.825L12.0166 10L15.8333 6.175L14.6583 5L9.65829 10L14.6583 15Z"
      fill={disabled ? "#B8B8B8" : "#616161"}
    />
    <path
      d="M9.16663 15L10.3416 13.825L6.52496 10L10.3416 6.175L9.16663 5L4.16663 10L9.16663 15Z"
      fill={disabled ? "#B8B8B8" : "#616161"}
    />
  </svg>
);

const ChevronRightIcon = ({ className = "", disabled = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="10"
    viewBox="0 0 12 10"
    fill="none"
    className={className}
  >
    <path
      d="M1.175 0L0 1.175L3.81667 5L0 8.825L1.175 10L6.175 5L1.175 0Z"
      fill={disabled ? "#B8B8B8" : "#616161"}
    />
    <path
      d="M6.66667 0L5.49167 1.175L9.30833 5L5.49167 8.825L6.66667 10L11.6667 5L6.66667 0Z"
      fill={disabled ? "#B8B8B8" : "#616161"}
    />
  </svg>
);

function Pagination({
  limit,
  current_page,
  total_page,
  total_items = 0,
  updatePage = () => {},
}) {
  // Convert limit to string for SelectInput
  const [filter, setFilter] = useState(String(limit || 10));

  const filterOptions = [
    { id: 10, limit: "10" },
    { id: 20, limit: "20" },
    { id: 50, limit: "50" },
    { id: 100, limit: "100" },
    { id: 250, limit: "250" },
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // Convert back to number when updating page
    updatePage({ current_page: 1, limit: Number(newFilter) });
  };

  const handlePrevious = () => {
    if (current_page > 1) {
      updatePage({ current_page: current_page - 1 });
    }
  };

  const handleNext = () => {
    if (current_page < total_page) {
      updatePage({ current_page: current_page + 1 });
    }
  };

  const isFirstPage = current_page === 1;
  const isLastPage = current_page >= total_page || total_page === 0;

  // Calculate showing range
  const fromEntry = total_items === 0 ? 0 : (current_page - 1) * limit + 1;
  const toEntry = Math.min(current_page * limit, total_items);

  return (
    <div className="flex items-center justify-end gap-6 py-2 px-6 rounded-b-lg ">
      <div className="text-text-500 text-base hidden md:block">
        Showing {fromEntry} to {toEntry} of {total_items} entries
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={isFirstPage}
          className={`flex items-center justify-center w-6 h-6 rounded ${
            isFirstPage
              ? "border-gray-300 cursor-not-allowed opacity-50"
              : "border-gray-300 hover:bg-gray-50 cursor-pointer"
          }`}
        >
          <ChevronLeftIcon disabled={isFirstPage} />
        </button>

        <ResponsivePagination
          current={current_page}
          total={total_page == 0 ? 1 : total_page}
          onPageChange={(value) => updatePage({ current_page: value })}
          maxWidth={250}
        />

        <button
          onClick={handleNext}
          disabled={isLastPage}
          className={`flex items-center justify-center w-6 h-6 rounded ${
            isLastPage
              ? "border-gray-300 cursor-not-allowed opacity-50"
              : "border-gray-300 hover:bg-gray-50 cursor-pointer"
          }`}
        >
          <ChevronRightIcon disabled={isLastPage} />
        </button>
      </div>

      <SelectInput
        data={filterOptions}
        value={filter}
        onValueChange={handleFilterChange}
        placeHolder="Filter by status"
        labelKey="limit"
        selector="id"
        triggerClassName="w-20 min-h-[32px] !border-none px-3 py-0 truncate !border-white text-base bg-natural-50"
        dropdownClassName="!w-16"
      />
    </div>
  );
}

export default Pagination;
