import { useState } from "react";
import Input from "@/components/shared/Input";
import DestinationCard from "@/components/inventory/DestinationCard";
import DestinationCardSkeleton from "@/components/inventory/DestinationCardSkeleton";
import { useInventory } from "@/hooks";

function Inventory() {
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    handleSearchChange,
    data,
    isLoading,
    isError,
    handleCardClick,
  } = useInventory();

  return (
    <section className="w-full flex-1 flex flex-col">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("countries")}
            className={`px-5 py-3.5 rounded-lg font-semibold transition-colors ${
              activeTab === "countries"
                ? "bg-main-700 text-white"
                : "bg-black text-white"
            }`}
          >
            Countries
          </button>
          <button
            onClick={() => setActiveTab("regional")}
            className={`px-5 py-3.5 rounded-lg font-semibold transition-colors ${
              activeTab === "regional"
                ? "bg-main-700 text-white"
                : "bg-black text-white"
            }`}
          >
            Regional Packs
          </button>
        </div>

        {/* Search */}
        <div className="w-full sm:w-64">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="">
        {isError ? (
          <div className="text-center py-12">
            <p className="text-red-600">
              Failed to load data. Please try again.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {isLoading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <DestinationCardSkeleton key={index} index={index} />
                ))
              : data?.data?.map((item, index) => (
                  <DestinationCard
                    key={`${activeTab}-${item._id}`}
                    item={item}
                    onClick={() => handleCardClick(item)}
                    index={index}
                  />
                ))}
          </div>
        )}

        {!isLoading && !isError && data?.data?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No results found</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Inventory;
