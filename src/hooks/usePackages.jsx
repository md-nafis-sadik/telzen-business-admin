import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useGetPackagesQuery } from "@/features/inventory/inventoryApi";

export const usePackages = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const country_id = searchParams.get("country_id");
  const region_id = searchParams.get("region_id");
  const name = searchParams.get("name");

  const { data, isLoading, isError } = useGetPackagesQuery({
    country_id,
    region_id,
    page,
    limit: 20,
  });

  const formatDataSize = (sizeInMB) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(0)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  const handlePackageClick = (packageItem) => {
    // Navigate to checkout with package details
    navigate(
      `/admin/inventory/checkout/${packageItem._id}?country_id=${country_id || ""}&region_id=${region_id || ""}&package_id=${packageItem._id}`
    );
  };

  const handleBackClick = () => {
    navigate("/admin/inventory");
  };

  return {
    data,
    isLoading,
    isError,
    name,
    country_id,
    region_id,
    formatDataSize,
    handlePackageClick,
    handleBackClick,
    page,
    setPage,
  };
};

export default usePackages;
