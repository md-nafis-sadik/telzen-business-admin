import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataLists: [],
  data: {},
  pageData: {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  search: "",
  selectedBrickList: null,
  singleBrick: null,
  filterChangeId: 0,
  loadingBrickId: null,

  addBrickForm: {
    brickTypes: [],
    images: [],
    videos: [],
    imagePreviews: [],
    videoPreviews: [],
    imageInputKey: Date.now(),
    videoInputKey: Date.now(),
  },
  editBrickForm: {
    brickTypes: [],
    images: [],
    videos: [],
    oldImages: [],
    oldVideo: null,
    imagePreviews: [],
    videoPreviews: [],
    imageInputKey: Date.now(),
    videoInputKey: Date.now(),
  },
};

const brickListSlice = createSlice({
  name: "brickList",
  initialState,
  reducers: {
    setBrickList: (state, action) => {
      const { data, meta, search = "" } = action.payload;

      if (meta?.last_page === 0) {
        const cacheKey = `page${meta?.current_page || 1}_${search}`;
        state.data[cacheKey] = [];
        state.dataLists = [];
        state.pageData = {
          totalItems: 0,
          totalPages: 1,
          currentPage: 1,
          pageSize: meta?.per_page || 10,
          hasNextPage: false,
          hasPreviousPage: false,
        };
        return;
      }

      if (meta?.current_page <= meta?.last_page) {
        const cacheKey = `page${meta?.current_page}_${search}`;
        state.data[cacheKey] = data;
        state.dataLists = data;

        state.pageData = {
          totalItems: meta?.total || 0,
          totalPages: meta?.last_page || 1,
          currentPage: meta?.current_page || 1,
          pageSize: meta?.per_page || 10,
          hasNextPage: meta?.current_page < meta?.last_page,
          hasPreviousPage: meta?.current_page > 1,
        };
      } else {
        const cacheKey = `page${state.pageData.currentPage}_${search}`;
        const otherData = state.data[cacheKey];
        const sliceData = otherData?.slice(0, meta?.per_page) || [];
        const currentPage = meta?.current_page - meta?.last_page;
        const page = meta?.current_page - currentPage;
        state.dataLists = [...sliceData];
        state.pageData.currentPage = page;
        state.pageData.totalPages = meta?.last_page;
      }
    },

    setPageData: (state, action) => {
      state.pageData = action.payload;
    },

    changeSearch(state, action) {
      state.search = action.payload;
      state.data = {};
      state.filterChangeId += 1;
    },

    setSelectedBrickList: (state, action) => {
      state.selectedBrickList = action.payload;
    },

    setSingleBrick: (state, action) => {
      state.singleBrick = action.payload;
    },

    updateBrickListStatus(state, action) {
      const { brick_id, status } = action.payload;

      const index = state.dataLists.findIndex((item) => item._id === brick_id);
      if (index !== -1) {
        state.dataLists[index].status = status;
      }

      Object.keys(state.data).forEach((pageKey) => {
        const pageIndex = state.data[pageKey].findIndex(
          (item) => item._id === brick_id
        );
        if (pageIndex !== -1) {
          state.data[pageKey][pageIndex].status = status;
        }
      });

      if (state.selectedBrickList?._id === brick_id) {
        state.selectedBrickList.status = status;
      }
    },

    setLoadingBrickId(state, action) {
      state.loadingBrickId = action.payload;
    },

    setAddBrickTypes(state, action) {
      state.addBrickForm.brickTypes = action.payload;
    },

    setAddImages(state, action) {
      state.addBrickForm.images = action.payload.images;
      state.addBrickForm.imagePreviews = action.payload.previews;
    },

    addAddImages(state, action) {
      state.addBrickForm.images.push(...action.payload.images);
      state.addBrickForm.imagePreviews.push(...action.payload.previews);
    },

    removeAddImage(state, action) {
      const index = action.payload;
      state.addBrickForm.images = state.addBrickForm.images.filter(
        (_, i) => i !== index
      );
      state.addBrickForm.imagePreviews =
        state.addBrickForm.imagePreviews.filter((_, i) => i !== index);
      state.addBrickForm.imageInputKey = Date.now();
    },

    setAddVideo(state, action) {
      state.addBrickForm.videos = [action.payload.video];
      state.addBrickForm.videoPreviews = [action.payload.preview];
    },

    removeAddVideo(state) {
      state.addBrickForm.videos = [];
      state.addBrickForm.videoPreviews = [];
      state.addBrickForm.videoInputKey = Date.now();
    },

    resetAddBrickForm(state) {
      state.addBrickForm = {
        brickTypes: [],
        images: [],
        videos: [],
        imagePreviews: [],
        videoPreviews: [],
        imageInputKey: Date.now(),
        videoInputKey: Date.now(),
      };
    },

    setEditBrickTypes(state, action) {
      state.editBrickForm.brickTypes = action.payload;
    },

    initEditBrickForm(state, action) {
      const brick = action.payload;
      state.editBrickForm.oldImages = brick?.images || [];
      state.editBrickForm.imagePreviews = [...(brick?.images || [])];
      state.editBrickForm.oldVideo = brick?.video || null;
      state.editBrickForm.videoPreviews = brick?.video ? [brick.video] : [];
      state.editBrickForm.brickTypes = brick?.brick_type || [];
      state.editBrickForm.images = [];
      state.editBrickForm.videos = [];
    },

    addEditImages(state, action) {
      state.editBrickForm.images.push(...action.payload.images);
      state.editBrickForm.imagePreviews.push(...action.payload.previews);
    },

    removeEditImage(state, action) {
      const index = action.payload;
      const preview = state.editBrickForm.imagePreviews[index];

      if (preview && preview.startsWith("http")) {
        state.editBrickForm.oldImages = state.editBrickForm.oldImages.filter(
          (img) => img !== preview
        );
      } else {
        const oldImagesCount = state.editBrickForm.oldImages.length;
        const newImageIndex = index - oldImagesCount;
        state.editBrickForm.images = state.editBrickForm.images.filter(
          (_, i) => i !== newImageIndex
        );
      }

      state.editBrickForm.imagePreviews =
        state.editBrickForm.imagePreviews.filter((_, i) => i !== index);
      state.editBrickForm.imageInputKey = Date.now();
    },

    setEditVideo(state, action) {
      state.editBrickForm.videos = [action.payload.video];
      state.editBrickForm.videoPreviews = [action.payload.preview];
      state.editBrickForm.oldVideo = null;
    },

    removeEditVideo(state) {
      state.editBrickForm.videos = [];
      state.editBrickForm.videoPreviews = [];
      state.editBrickForm.oldVideo = null;
      state.editBrickForm.videoInputKey = Date.now();
    },

    resetEditBrickForm(state) {
      state.editBrickForm = {
        brickTypes: [],
        images: [],
        videos: [],
        oldImages: [],
        oldVideo: null,
        imagePreviews: [],
        videoPreviews: [],
        imageInputKey: Date.now(),
        videoInputKey: Date.now(),
      };
    },

    addBrickToList: (state, action) => {
      const newItem = action.payload;
      const { currentPage, pageSize, totalItems, totalPages } = state.pageData;
      const { search } = state;

      const updatedPages = {};
      let itemToPushDown = newItem;

      for (
        let pageNum = 1;
        pageNum <= Math.max(totalPages, currentPage) + 1;
        pageNum++
      ) {
        const cacheKey = `page${pageNum}_${search}`;
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

      const currentCacheKey = `page${currentPage}_${search}`;
      state.dataLists = state.data[currentCacheKey] || [];

      state.pageData.totalItems = totalItems + 1;
      const newTotalPages = Math.ceil((totalItems + 1) / pageSize);
      state.pageData.totalPages = newTotalPages;

      if (!state.dataLists.length && currentPage > newTotalPages) {
        state.pageData.currentPage = newTotalPages;
        const newCacheKey = `page${newTotalPages}_${search}`;
        state.dataLists = state.data[newCacheKey] || [];
      }

      state.pageData.hasNextPage =
        state.pageData.currentPage < state.pageData.totalPages;
      state.pageData.hasPreviousPage = state.pageData.currentPage > 1;
    },

    updateBrickInList: (state, action) => {
      const updatedItem = action.payload;

      const index = state.dataLists.findIndex(
        (item) => item._id === updatedItem._id
      );
      if (index !== -1) {
        state.dataLists[index] = updatedItem;
      }

      Object.keys(state.data).forEach((key) => {
        const cachedList = state.data[key];
        const cachedIndex = cachedList.findIndex(
          (item) => item._id === updatedItem._id
        );
        if (cachedIndex !== -1) {
          state.data[key][cachedIndex] = updatedItem;
        }
      });

      if (state.singleBrick?._id === updatedItem._id) {
        state.singleBrick = updatedItem;
      }
    },

    removeBrickFromList: (state, action) => {
      const itemId = action.payload;

      state.dataLists = state.dataLists.filter((item) => item._id !== itemId);

      Object.keys(state.data).forEach((key) => {
        state.data[key] = state.data[key].filter((item) => item._id !== itemId);
      });

      state.pageData.totalItems = Math.max(0, state.pageData.totalItems - 1);
      state.pageData.totalPages = Math.ceil(
        state.pageData.totalItems / state.pageData.pageSize
      );
      state.pageData.hasNextPage =
        state.pageData.currentPage < state.pageData.totalPages;
    },
  },
});

export const {
  setBrickList,
  setPageData,
  changeSearch,
  setSelectedBrickList,
  setSingleBrick,
  updateBrickListStatus,
  setLoadingBrickId,
  setAddBrickTypes,
  setAddImages,
  addAddImages,
  removeAddImage,
  setAddVideo,
  removeAddVideo,
  resetAddBrickForm,
  setEditBrickTypes,
  initEditBrickForm,
  addEditImages,
  removeEditImage,
  setEditVideo,
  removeEditVideo,
  resetEditBrickForm,
  addBrickToList,
  updateBrickInList,
  removeBrickFromList,
} = brickListSlice.actions;
export default brickListSlice.reducer;
