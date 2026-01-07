import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  divisions: [],
  districts: [],
  upazilas: [],

  divisionsLoading: false,
  districtsLoading: false,
  upazilasLoading: false,

  divisionsError: null,
  districtsError: null,
  upazilasError: null,

  selectedDivision: null,
  selectedDistrict: null,
  selectedUpazila: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {

    setDivisionsLoading: (state, action) => {
      state.divisionsLoading = action.payload;
    },

    setDivisions: (state, action) => {
      state.divisions = action.payload;
      state.divisionsLoading = false;
      state.divisionsError = null;
    },

    setDivisionsError: (state, action) => {
      state.divisionsError = action.payload;
      state.divisionsLoading = false;
    },

    setDistrictsLoading: (state, action) => {
      state.districtsLoading = action.payload;
    },

    setDistricts: (state, action) => {
      state.districts = action.payload;
      state.districtsLoading = false;
      state.districtsError = null;
    },

    setDistrictsError: (state, action) => {
      state.districtsError = action.payload;
      state.districtsLoading = false;
    },

    clearDistricts: (state) => {
      state.districts = [];
      state.districtsLoading = false;
      state.districtsError = null;
    },

    setUpazilasLoading: (state, action) => {
      state.upazilasLoading = action.payload;
    },

    setUpazilas: (state, action) => {
      state.upazilas = action.payload;
      state.upazilasLoading = false;
      state.upazilasError = null;
    },

    setUpazilasError: (state, action) => {
      state.upazilasError = action.payload;
      state.upazilasLoading = false;
    },

    clearUpazilas: (state) => {
      state.upazilas = [];
      state.upazilasLoading = false;
      state.upazilasError = null;
    },

    setSelectedDivision: (state, action) => {
      state.selectedDivision = action.payload;
      state.selectedDistrict = null;
      state.selectedUpazila = null;
      state.districts = [];
      state.upazilas = [];
    },

    setSelectedDistrict: (state, action) => {
      state.selectedDistrict = action.payload;
      state.selectedUpazila = null;
      state.upazilas = [];
    },

    setSelectedUpazila: (state, action) => {
      state.selectedUpazila = action.payload;
    },

    resetLocationData: (state) => {
      return initialState;
    },
  },
});

export const {
  setDivisionsLoading,
  setDivisions,
  setDivisionsError,

  setDistrictsLoading,
  setDistricts,
  setDistrictsError,
  clearDistricts,

  setUpazilasLoading,
  setUpazilas,
  setUpazilasError,
  clearUpazilas,

  setSelectedDivision,
  setSelectedDistrict,
  setSelectedUpazila,

  resetLocationData,
} = locationSlice.actions;

export default locationSlice.reducer;
