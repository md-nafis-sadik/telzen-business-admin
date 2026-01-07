import { useSelector, useDispatch } from "react-redux";
import {
  useGetBrickListQuery,
  useToggleBrickStatusMutation,
  useAddBrickMutation,
  useUpdateBrickMutation,
  useGetSingleBrickQuery,
  useDeleteBrickMutation,
  useGetAllBrickFieldsQuery,
} from "@/features/brickList/brickListApi";
import {
  changeSearch,
  setSelectedBrickList,
  setPageData,
  setLoadingBrickId,
  setAddBrickTypes,
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
} from "@/features/brickList/brickListSlice";
import {
  toggleDeleteModal,
  toggleDetailsModal,
  toggleSuccessModal,
  showSuccessWithMessage,
} from "@/features/shared/sharedSlice";
import { errorNotify, infoNotify } from "@/services";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { useEffect } from "react";

export const useBrickList = () => {
  const {
    dataLists,
    pageData,
    search,
    selectedBrickList,
    data,
    filterChangeId,
    loadingBrickId,
  } = useSelector((state) => state.brickList);
  const { showDeleteModal, showSuccessModal, successMessage } = useSelector(
    (state) => state.shared
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const debouncedSearch = useDebounce(search, 500);
  const { currentPage, pageSize, totalItems } = pageData;
  const cacheKey = `page${currentPage}_${debouncedSearch}`;
  const cachedData = data[cacheKey];

  const { isFetching, isError, error } = useGetBrickListQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      search: debouncedSearch,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const [toggleBrickStatus, { isLoading: isStatusChanging }] =
    useToggleBrickStatusMutation();
  const [deleteBrick] = useDeleteBrickMutation();

  useEffect(() => {
    if (location.state?.showSuccess && location.state?.message) {
      dispatch(showSuccessWithMessage(location.state.message));
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, dispatch, navigate, location.pathname]);

  const handlePageChange = (page) => {
    const updates = { currentPage: page.current_page };
    if (page.per_page && page.per_page !== pageData.pageSize) {
      updates.pageSize = page.per_page;
    }
    dispatch(setPageData({ ...pageData, ...updates }));
  };

  const handleSearchChange = (searchTerm) => {
    dispatch(changeSearch(searchTerm));
    dispatch(setPageData({ ...pageData, currentPage: 1 }));
  };

  const handleViewBrickList = (brick) => {
    dispatch(setSelectedBrickList(brick));
    dispatch(toggleDetailsModal(true));
  };

  const handleUpdateBrickList = (brick) => {
    navigate(`/admin/brick-list/edit/${brick._id}`);
  };

  const deleteConfirmHandler = async () => {
    try {
      if (selectedBrickList?._id) {
        await deleteBrick(selectedBrickList._id).unwrap();
        dispatch(toggleDeleteModal(false));
        dispatch(
          showSuccessWithMessage(
            "The selected Brick Field has been permanently removed from the list."
          )
        );
      }
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to delete brick");
    }
  };
  const successConfirmHandler = () => {
    dispatch(toggleSuccessModal(false));
  };

  const handleShowDeleteModal = (brick) => {
    dispatch(setSelectedBrickList(brick));
    dispatch(toggleDeleteModal(true));
  };

  const handleStatusChange = async (brick) => {
    dispatch(setLoadingBrickId(brick._id));
    try {
      const result = await toggleBrickStatus({
        _id: brick._id,
        status: !brick.status,
      }).unwrap();
      infoNotify(result.message || "Brick status updated successfully");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to update brick status");
    } finally {
      dispatch(setLoadingBrickId(null));
    }
  };

  return {
    isFetching,
    isError,
    error,
    dispatch,
    loadingBrickId,
    brickList: cachedData || dataLists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: pageData.totalPages,
    total_items: pageData.totalItems,
    search,
    selectedBrickList,
    updatePage: handlePageChange,
    handleSearchChange,
    handleViewBrickList,
    handleUpdateBrickList,
    handleStatusChange,
    deleteConfirmHandler,
    successConfirmHandler,
    handleShowDeleteModal,
    showDeleteModal,
    showSuccessModal,
    successMessage,
  };
};

export const useAddBrick = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addBrick, { isLoading }] = useAddBrickMutation();
  const { data: brickFieldsData } = useGetAllBrickFieldsQuery();

  const { addBrickForm } = useSelector((state) => state.brickList);
  const {
    brickTypes,
    images,
    videos,
    imagePreviews,
    videoPreviews,
    imageInputKey,
    videoInputKey,
  } = addBrickForm;

  const handleBrickTypesChange = (tags) => {
    dispatch(setAddBrickTypes(tags));
  };

  const handleImageUpload = (files) => {
    if (images.length + files.length > 5) {
      infoNotify("Maximum 5 images allowed");
      return;
    }
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    dispatch(addAddImages({ images: files, previews: newPreviews }));
  };

  const handleVideoUpload = (file) => {
    if (file) {
      dispatch(
        setAddVideo({ video: file, preview: URL.createObjectURL(file) })
      );
    }
  };

  const removeImage = (index) => {
    dispatch(removeAddImage(index));
  };

  const removeVideo = () => {
    dispatch(removeAddVideo());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const stockDetails = brickTypes.map((tag) => ({
      brick_type: tag,
      minimum_order_quantity: parseInt(form[`moq_${tag}`].value),
      stock: parseInt(form[`stock_${tag}`].value),
      unit_price: parseInt(form[`price_${tag}`].value),
    }));

    const data = {
      product_name: form.name.value,
      brick_type: brickTypes,
      brick_field_id: form.brick_field.value,
      details: form.overview.value,
      stock_details: stockDetails,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    images.forEach((image) => {
      formData.append("multipleImage", image);
    });

    if (videos.length > 0) {
      formData.append("video", videos[0]);
    }

    try {
      const res = await addBrick(formData).unwrap();
      dispatch(resetAddBrickForm());
      navigate("/admin/brick-list", {
        state: {
          showSuccess: true,
          message: "Your brick is now visible in the list.",
        },
      });
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to add brick");
    }
  };

  return {
    handleSubmit,
    isLoading,
    brickTypes,
    handleBrickTypesChange,
    images,
    videos,
    imagePreviews,
    videoPreviews,
    handleImageUpload,
    handleVideoUpload,
    removeImage,
    removeVideo,
    imageInputKey,
    videoInputKey,
    brickFields: brickFieldsData?.data || [],
  };
};

export const useEditBrick = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: brickFieldsData } = useGetAllBrickFieldsQuery();
  const { singleBrick, editBrickForm } = useSelector(
    (state) => state.brickList
  );
  const {
    brickTypes,
    images,
    videos,
    oldImages,
    imagePreviews,
    videoPreviews,
    imageInputKey,
    videoInputKey,
  } = editBrickForm;

  const {
    isFetching: upIsFetching,
    isError: upIsError,
    error: upError,
  } = useGetSingleBrickQuery(
    { brick_id: id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  const [updateBrick, { isLoading }] = useUpdateBrickMutation();

  useEffect(() => {
    if (singleBrick) {
      dispatch(initEditBrickForm(singleBrick));
    }
  }, [singleBrick, dispatch]);

  const handleImageUpload = (files) => {
    const totalImages = oldImages.length + images.length + files.length;
    if (totalImages > 5) {
      infoNotify("Maximum 5 images allowed");
      return;
    }
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    dispatch(addEditImages({ images: files, previews: newPreviews }));
  };

  const handleVideoUpload = (file) => {
    if (file) {
      dispatch(
        setEditVideo({ video: file, preview: URL.createObjectURL(file) })
      );
    }
  };

  const removeImage = (index) => {
    dispatch(removeEditImage(index));
  };

  const removeVideo = () => {
    dispatch(removeEditVideo());
  };

  const handleBrickTypesChange = (tags) => {
    dispatch(setEditBrickTypes(tags));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const stockDetails = brickTypes.map((tag) => ({
      brick_type: tag,
      minimum_order_quantity: parseInt(form[`moq_${tag}`]?.value || 0),
      stock: parseInt(form[`stock_${tag}`]?.value || 0),
      unit_price: parseInt(form[`price_${tag}`]?.value || 0),
    }));

    const data = {
      product_name: form.name.value,
      brick_type: brickTypes,
      brick_field_id: form.brick_field.value,
      details: form.overview.value,
      stock_details: stockDetails,
      old_images: oldImages,
    };

    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    images.forEach((image) => {
      formData.append("multipleImage", image);
    });

    if (videos.length > 0) {
      formData.append("video", videos[0]);
    }

    try {
      const res = await updateBrick({ formData, brick_id: id }).unwrap();
      dispatch(resetEditBrickForm());
      navigate("/admin/brick-list", {
        state: {
          showSuccess: true,
          message: "Your brick info updated successfully..",
        },
      });
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to update brick");
    }
  };

  return {
    upIsFetching,
    upIsError,
    upError,
    singleBrick,
    isLoading,
    handleSubmit,
    brickFields: brickFieldsData?.data || [],
    images,
    videos,
    imagePreviews,
    videoPreviews,
    handleImageUpload,
    handleVideoUpload,
    removeImage,
    removeVideo,
    brickTypes,
    handleBrickTypesChange,
    imageInputKey,
    videoInputKey,
  };
};
