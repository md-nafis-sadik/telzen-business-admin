import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataLists: [],
  pageData: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
  },
  search: "",
  selectedBrickStock: null,
  data: {},
  filterChangeId: 0,
  isLoading: false,
};

const brickStockSlice = createSlice({
  name: "brickStock",
  initialState,
  reducers: {
    setBrickStockList: (state, action) => {
      const { data, meta, search = "" } = action.payload;
      state.dataLists = data || [];
      state.pageData = {
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
        totalPages: meta?.last_page || 0,
        totalItems: meta?.total || 0,
      };

      const cacheKey = `page${meta?.page}_${search}`;
      state.data[cacheKey] = data;
    },

    setSelectedBrickStock: (state, action) => {
      state.selectedBrickStock = action.payload;
    },

    setPageData: (state, action) => {
      state.pageData = action.payload;
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

    addBrickStockToList: (state, action) => {
      const newItem = action.payload;

      state.dataLists = [newItem, ...state.dataLists];
      state.pageData.totalItems += 1;

      state.data = {};
    },

    updateBrickStockInList: (state, action) => {
      const updatedItem = action.payload;

      const isMatch = (item) => {
        return (
          item._id === updatedItem._id || item.brick_id === updatedItem.brick_id
        );
      };

      const index = state.dataLists.findIndex(isMatch);
      if (index !== -1) {
        state.dataLists[index] = {
          ...state.dataLists[index],
          ...updatedItem,
        };
      }

      Object.keys(state.data).forEach((key) => {
        const cachedList = state.data[key];
        const cachedIndex = cachedList.findIndex(isMatch);
        if (cachedIndex !== -1) {
          state.data[key][cachedIndex] = {
            ...state.data[key][cachedIndex],
            ...updatedItem,
          };
        }
      });

      if (state.selectedBrickStock && isMatch(state.selectedBrickStock)) {
        state.selectedBrickStock = {
          ...state.selectedBrickStock,
          ...updatedItem,
        };
      }
    },

    updateBrickStockFromHistory: (state, action) => {
      const { brick_id, brick_type, stock } = action.payload;

      const isMatch = (item) =>
        item._id === brick_id || item.brick_id === brick_id;

      const index = state.dataLists.findIndex(isMatch);
      if (index !== -1) {
        state.dataLists[index] = {
          ...state.dataLists[index],
          [brick_type]: stock,
        };
      }

      Object.keys(state.data).forEach((key) => {
        const cachedList = state.data[key];
        const cachedIndex = cachedList.findIndex(isMatch);
        if (cachedIndex !== -1) {
          state.data[key][cachedIndex] = {
            ...state.data[key][cachedIndex],
            [brick_type]: stock,
          };
        }
      });

      if (state.selectedBrickStock && isMatch(state.selectedBrickStock)) {
        state.selectedBrickStock = {
          ...state.selectedBrickStock,
          [brick_type]: stock,
        };
      }
    },
  },
});

export const {
  setBrickStockList,
  setSelectedBrickStock,
  setPageData,
  changeSearch,
  clearCache,
  setLoading,
  addBrickStockToList,
  updateBrickStockInList,
  updateBrickStockFromHistory,
} = brickStockSlice.actions;

export default brickStockSlice.reducer;
