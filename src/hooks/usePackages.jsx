import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useGetPackagesQuery } from "@/features/inventory/inventoryApi";

export const usePackages = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const country_id = searchParams.get("country_id");
  const region_id = searchParams.get("region_id");
  const name = searchParams.get("name");

  const { data, isLoading, isError, isFetching } = useGetPackagesQuery({
    country_id,
    region_id,
    page: 1,
    limit: 99999,
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

  const packages = data?.data?.packages || [];

  const encodedImage = data?.data?.country?.image ? encodeURI(data?.data?.country?.image) : encodeURI(data?.data?.region?.image);

  return {
    data,
    isLoading,
    isError,
    isFetching,
    name,
    country_id,
    region_id,
    formatDataSize,
    handlePackageClick,
    handleBackClick,
  };
};

export default usePackages;
