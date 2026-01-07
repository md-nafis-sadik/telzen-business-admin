import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataLists: [],
  data: {},
  pageData: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
  },
  filter: {
    division: "",
    district: "",
    sub_district: "",
  },
  search: "",
  selectedBrickField: null,
  filterChangeId: 0,
  isLoading: false,
};

const brickFieldSlice = createSlice({
  name: "brickField",
  initialState,
  reducers: {
    setBrickFieldList: (state, action) => {
      const { data, meta, search = "", filter = {} } = action.payload;
      state.dataLists = data || [];
      state.pageData = {
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
        totalPages: meta?.last_page || 0,
        totalItems: meta?.total || 0,
      };

      const cacheKey = `page${meta?.page}_${search}_${filter.division || ""}_${
        filter.district || ""
      }_${filter.sub_district || ""}`;
      state.data[cacheKey] = data;
    },

    setSelectedBrickField: (state, action) => {
      state.selectedBrickField = action.payload;
    },

    setPageData: (state, action) => {
      state.pageData = action.payload;
    },

    changeFilter: (state, action) => {
      state.filter = action.payload;
      state.filterChangeId += 1;
      state.data = {};
    },

    changeSearch: (state, action) => {
      state.search = action.payload;
      state.filterChangeId += 1;
      state.data = {};
    },

    clearCache: (state) => {
      state.data = {};
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    addBrickFieldToList: (state, action) => {
      const newItem = action.payload;
      const { currentPage, pageSize, totalItems, totalPages } = state.pageData;
      const { search, filter } = state;

      const updatedPages = {};
      let itemToPushDown = newItem;

      const filterStr = `${filter.division || ""}_${filter.district || ""}_${
        filter.sub_district || ""
      }`;

      for (
        let pageNum = 1;
        pageNum <= Math.max(totalPages, currentPage) + 1;
        pageNum++
      ) {
        const cacheKey = `page${pageNum}_${search}_${filterStr}`;
        const currentItems = state.data[cacheKey] || [];

        if (pageNum === 1) {
          updatedPages[cacheKey] = [itemToPushDown, ...currentItems];

          if (updatedPages[cacheKey].length > pageSize) {
            itemToPushDown = updatedPages[cacheKey].pop();
          } else {
            itemToPushDown = null;
          }
        } else if (itemToPushDown) {
          updatedPages[cacheKey] = [itemToPushDown, ...currentItems];

          if (updatedPages[cacheKey].length > pageSize) {
            itemToPushDown = updatedPages[cacheKey].pop();
          } else {
            itemToPushDown = null;
          }
        } else if (currentItems.length > 0) {
          updatedPages[cacheKey] = [...currentItems];
        }
      }

      Object.keys(updatedPages).forEach((key) => {
        state.data[key] = updatedPages[key];
      });

      const currentCacheKey = `page${currentPage}_${search}_${filterStr}`;
      state.dataLists = state.data[currentCacheKey] || [];

      state.pageData.totalItems = totalItems + 1;
      const newTotalPages = Math.ceil((totalItems + 1) / pageSize);
      state.pageData.totalPages = newTotalPages;

      if (!state.dataLists.length && currentPage > newTotalPages) {
        state.pageData.currentPage = newTotalPages;
        const newCacheKey = `page${newTotalPages}_${search}_${filterStr}`;
        state.dataLists = state.data[newCacheKey] || [];
      }
    },

    updateBrickFieldInList: (state, action) => {
      const updatedItem = action.payload;

      const index = state.dataLists.findIndex(
        (item) =>
          item._id === updatedItem._id ||
          item.brick_field_id === updatedItem.brick_field_id
      );
      if (index !== -1) {
        state.dataLists[index] = updatedItem;
      }

      Object.keys(state.data).forEach((key) => {
        const cachedList = state.data[key];
        const cachedIndex = cachedList.findIndex(
          (item) =>
            item._id === updatedItem._id ||
            item.brick_field_id === updatedItem.brick_field_id
        );
        if (cachedIndex !== -1) {
          state.data[key][cachedIndex] = updatedItem;
        }
      });

      if (
        state.selectedBrickField?._id === updatedItem._id ||
        state.selectedBrickField?.brick_field_id === updatedItem.brick_field_id
      ) {
        state.selectedBrickField = updatedItem;
      }
    },

    removeBrickFieldFromList: (state, action) => {
      const itemId = action.payload;

      state.dataLists = state.dataLists.filter(
        (item) => item._id !== itemId && item.brick_field_id !== itemId
      );

      Object.keys(state.data).forEach((key) => {
        state.data[key] = state.data[key].filter(
          (item) => item._id !== itemId && item.brick_field_id !== itemId
        );
      });

      state.pageData.totalItems = Math.max(0, state.pageData.totalItems - 1);
      state.pageData.totalPages = Math.ceil(
        state.pageData.totalItems / state.pageData.pageSize
      );
    },
  },
});

export const {
  setBrickFieldList,
  setSelectedBrickField,
  setPageData,
  changeFilter,
  changeSearch,
  clearCache,
  setLoading,
  addBrickFieldToList,
  updateBrickFieldInList,
  removeBrickFieldFromList,
} = brickFieldSlice.actions;

export default brickFieldSlice.reducer;
