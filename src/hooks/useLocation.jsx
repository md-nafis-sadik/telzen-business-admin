import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  useGetDivisionsQuery,
  useGetDistrictsQuery,
  useGetUpazilasQuery,
} from "@/features/location/locationApi";
import {
  setSelectedDivision,
  setSelectedDistrict,
  setSelectedUpazila,
  clearDistricts,
  clearUpazilas,
} from "@/features/location/locationSlice";

export const useLocation = (divisionId = null, districtId = null) => {
  const dispatch = useDispatch();

  const {
    divisions,
    districts,
    upazilas,
    divisionsLoading,
    districtsLoading,
    upazilasLoading,
    divisionsError,
    districtsError,
    upazilasError,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
  } = useSelector((state) => state.location);

  const { isLoading: divisionsQueryLoading, error: divisionsQueryError } =
    useGetDivisionsQuery(
      {},
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const targetDivisionId = divisionId || selectedDivision?.id;
  const { isLoading: districtsQueryLoading, error: districtsQueryError } =
    useGetDistrictsQuery(
      { divisionId: targetDivisionId },
      {
        skip: !targetDivisionId || targetDivisionId === "all",
        refetchOnMountOrArgChange: true,
      }
    );

  const targetDistrictId = districtId || selectedDistrict?.id;
  const { isLoading: upazilasQueryLoading, error: upazilasQueryError } =
    useGetUpazilasQuery(
      { districtId: targetDistrictId },
      {
        skip: !targetDistrictId || targetDistrictId === "all",
        refetchOnMountOrArgChange: true,
      }
    );

  const handleDivisionChange = useCallback((divisionId) => {
    const division = divisions.find((d) => d.id === divisionId);
    dispatch(setSelectedDivision(division));
  }, [divisions, dispatch]);

  const handleDistrictChange = useCallback((districtId) => {
    const district = districts.find((d) => d.id === districtId);
    dispatch(setSelectedDistrict(district));
  }, [districts, dispatch]);

  const handleUpazilaChange = useCallback((upazilaId) => {
    const upazila = upazilas.find((u) => u.id === upazilaId);
    dispatch(setSelectedUpazila(upazila));
  }, [upazilas, dispatch]);

  const clearDistrictsData = useCallback(() => {
    dispatch(clearDistricts());
  }, [dispatch]);

  const clearUpazilasData = useCallback(() => {
    dispatch(clearUpazilas());
  }, [dispatch]);

  const rawDivisions = divisions || [];
  const rawDistricts = districts || [];
  const rawUpazilas = upazilas || [];

  return {
    divisions: rawDivisions,
    districts: rawDistricts,
    upazilas: rawUpazilas,

    divisionsLoading: divisionsLoading || divisionsQueryLoading,
    districtsLoading: districtsLoading || districtsQueryLoading,
    upazilasLoading: upazilasLoading || upazilasQueryLoading,

    divisionsError: divisionsError || divisionsQueryError,
    districtsError: districtsError || districtsQueryError,
    upazilasError: upazilasError || upazilasQueryError,

    selectedDivision,
    selectedDistrict,
    selectedUpazila,

    handleDivisionChange,
    handleDistrictChange,
    handleUpazilaChange,
    clearDistrictsData,
    clearUpazilasData,

    isDivisionSelected: !!selectedDivision && selectedDivision.id !== "all",
    isDistrictSelected: !!selectedDistrict && selectedDistrict.id !== "all",
    hasDistricts: rawDistricts.length > 0,
    hasUpazilas: rawUpazilas.length > 0,
  };
};
