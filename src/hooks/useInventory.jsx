import { useState } from "react";
import { useGetRegionsQuery, useGetCountriesQuery } from "@/features/inventory/inventoryApi";
import { useNavigate } from "react-router-dom";

export const useInventory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("countries");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const isCountriesTab = activeTab === "countries";
  const limit = 15;

  // Fetch regions or countries based on active tab
  const {
    data: regionsData,
    isLoading: isLoadingRegions,
    isError: isErrorRegions,
  } = useGetRegionsQuery(
    { page, limit, search: searchTerm },
    { skip: isCountriesTab }
  );

  const {
    data: countriesData,
    isLoading: isLoadingCountries,
    isError: isErrorCountries,
  } = useGetCountriesQuery(
    { page, limit, search: searchTerm },
    { skip: !isCountriesTab }
  );

  const data = isCountriesTab ? countriesData : regionsData;
  const isLoading = isCountriesTab ? isLoadingCountries : isLoadingRegions;
  const isError = isCountriesTab ? isErrorCountries : isErrorRegions;

  const handleCardClick = (item) => {
    if (isCountriesTab) {
      // Navigate to packages page with country_id
      navigate(
        `/admin/inventory/packages/${item._id}?country_id=${item._id}&name=${encodeURIComponent(item.name)}`
      );
    } else {
      // Navigate to packages page with region_id
      navigate(
        `/admin/inventory/packages/${item._id}?region_id=${item._id}&name=${encodeURIComponent(item.name)}`
      );
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page on search
  };

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    handleSearchChange,
    data,
    isLoading,
    isError,
    handleCardClick,
    page,
    setPage,
  };
};

export default useInventory;
