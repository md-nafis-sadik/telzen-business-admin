import { useUploadProfileImageMutation } from "@/features/auth/authApi";
import {
  clearProfileImagePreview,
} from "@/features/shared/sharedSlice";
import {
  adminRouteLinks,
  images,
  errorNotify,
  successNotify,
} from "@/services";
import { empty } from "@/services/images";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useProfile = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.auth);
  const { profileImagePreview } = useSelector((state) => state.shared);

  const userData = auth;
  const isFetching = false;
  const isError = !auth?.name && !auth?.email;
  const error = isError
    ? { status: 404, data: { message: "Profile not found" } }
    : null;

  const [uploadProfileImage, { isLoading: isUploading }] =
    useUploadProfileImageMutation();

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      errorNotify("Please select a valid image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      errorNotify("Image size should be less than 5MB");
      return;
    }

    try {
      await uploadProfileImage(file).unwrap();
      dispatch(clearProfileImagePreview());
      successNotify("Profile image updated successfully");
    } catch (error) {
      errorNotify("Failed to upload image. Please try again.");
    }
  };

  const getImageSrc = () => {
    if (profileImagePreview) return profileImagePreview;
    if (auth?.image) return auth.image;
    return images.profileAvatar;
  };

  const isNotFound =
    error?.status === 404 ||
    error?.data?.message?.includes("could not be found");

  const backPath = adminRouteLinks.dashboard.path;

  return {
    fileInputRef,
    profileImagePreview,
    auth,
    isFetching,
    isError,
    error,
    isUploading,
    userData,
    handleEditClick,
    handleImageChange,
    getImageSrc,
    isNotFound,
    backPath,
    images,
    empty,
  };
};
