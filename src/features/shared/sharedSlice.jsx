import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePath: "",
  showSidebar: false,
  submenuOpen: {},
  address: "",
  showMarketingModal: false,
  location: {
    lat: 0,
    lng: 0,
  },
  showNavSidebar: false,
  showModal: false,
  showUploadModal: false,
  showDocumentModal: false,
  showDeleteModal: false,
  showSuccessModal: false,
  showDetailsModal: false,
  showLogoutModal: false,
  successMessage: "",
  profileImagePreview: null,
  sidebarSubmenuOpen: {},
  isLogoutLoading: false,
  selectedDivisions: [],
  selectedDistricts: [],
  selectedSubDistricts: [],
};

const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setActivePath: (state, action) => {
      state.activePath = action.payload;
    },
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },

    setShowDocumentModal: (state, action) => {
      state.showDocumentModal = action.payload;
    },

    setShowNavSidebar: (state, action) => {
      state.showNavSidebar = action.payload;
    },
    toggleDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },
    toggleLogoutModal: (state, action) => {
      state.showLogoutModal = action.payload;
    },

    toggleSuccessModal: (state, action) => {
      state.showSuccessModal = action.payload;
      if (!action.payload) {
        state.successMessage = "";
      }
    },

    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },

    showSuccessWithMessage: (state, action) => {
      state.successMessage = action.payload;
      state.showSuccessModal = true;
    },

    toggleDetailsModal: (state, action) => {
      state.showDetailsModal = action.payload;
    },

    toggleUploadModal: (state, action) => {
      state.showUploadModal = action.payload;
    },

    setSubmenuOpen: (state, action) => {
      const menu = action?.payload;
      Object.keys(state.submenuOpen).forEach((key) => {
        if (state.submenuOpen[key] !== state.submenuOpen[menu]) {
          state.submenuOpen[key] = false;
        }
      });
      state.submenuOpen[menu] = !state.submenuOpen[menu];
    },

    setProfileImagePreview: (state, action) => {
      state.profileImagePreview = action.payload;
    },

    clearProfileImagePreview: (state) => {
      state.profileImagePreview = null;
    },

    setSidebarSubmenuOpen: (state, action) => {
      const { menu } = action.payload;
      const isCurrentlyOpen = state.sidebarSubmenuOpen[menu];

      state.sidebarSubmenuOpen = {};
      if (!isCurrentlyOpen) {
        state.sidebarSubmenuOpen[menu] = true;
      }
    },

    forceSidebarSubmenuOpen: (state, action) => {
      const { menu } = action.payload;
      state.sidebarSubmenuOpen[menu] = true;
    },

    clearSidebarSubmenuOpen: (state) => {
      state.sidebarSubmenuOpen = {};
    },

    setLogoutLoading: (state, action) => {
      state.isLogoutLoading = action.payload;
    },

    setSelectedDivisions: (state, action) => {
      state.selectedDivisions = action.payload;
    },
    setSelectedDistricts: (state, action) => {
      state.selectedDistricts = action.payload;
    },
    setSelectedSubDistricts: (state, action) => {
      state.selectedSubDistricts = action.payload;
    },
    addDivision: (state, action) => {
      if (!state.selectedDivisions.includes(action.payload)) {
        state.selectedDivisions.push(action.payload);
      }
    },
    removeDivision: (state, action) => {
      state.selectedDivisions = state.selectedDivisions.filter(
        (division) => division !== action.payload
      );
    },
    addDistrict: (state, action) => {
      if (!state.selectedDistricts.includes(action.payload)) {
        state.selectedDistricts.push(action.payload);
      }
    },
    removeDistrict: (state, action) => {
      state.selectedDistricts = state.selectedDistricts.filter(
        (district) => district !== action.payload
      );
    },
    addSubDistrict: (state, action) => {
      if (!state.selectedSubDistricts.includes(action.payload)) {
        state.selectedSubDistricts.push(action.payload);
      }
    },
    removeSubDistrict: (state, action) => {
      state.selectedSubDistricts = state.selectedSubDistricts.filter(
        (subDistrict) => subDistrict !== action.payload
      );
    },
    clearAllSelections: (state) => {
      state.selectedDivisions = [];
      state.selectedDistricts = [];
      state.selectedSubDistricts = [];
    },
    setDivisionsWithReset: (state, action) => {
      state.selectedDivisions = action.payload;
      state.selectedDistricts = [];
      state.selectedSubDistricts = [];
    },
    setDistrictsWithReset: (state, action) => {
      state.selectedDistricts = action.payload;
      state.selectedSubDistricts = [];
    },
  },
});

export const {
  setActivePath,
  setSubmenuOpen,
  setShowSidebar,
  setShowNavSidebar,
  toggleModal,
  toggleUploadModal,
  toggleDeleteModal,
  toggleLogoutModal,
  toggleSuccessModal,
  setSuccessMessage,
  showSuccessWithMessage,
  toggleDetailsModal,
  setProfileImagePreview,
  clearProfileImagePreview,
  setSidebarSubmenuOpen,
  forceSidebarSubmenuOpen,
  clearSidebarSubmenuOpen,
  setShowDocumentModal,
  setLogoutLoading,
  addDivision,
  removeDivision,
  addDistrict,
  removeDistrict,
  addSubDistrict,
  removeSubDistrict,
  clearAllSelections,
  setDivisionsWithReset,
  setDistrictsWithReset,
  setSelectedDivisions,
  setSelectedDistricts,
  setSelectedSubDistricts,
} = sharedSlice.actions;
export default sharedSlice.reducer;
