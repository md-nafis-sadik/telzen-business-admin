import { VideoUploadIconSvg } from "@/services";
import { VideoIcon, X } from "lucide-react";

function VideoUpload({
  accept = "video/*",
  preview = null,
  onUpload = () => {},
  onRemove = () => {},
  id = "video-upload",
  ...rest
}) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleRemove = () => {
    onRemove();
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {/* Video Preview */}
      {preview && (
        <div className="relative">
          <video
            src={preview}
            className="w-[142px] h-[92px] object-cover rounded-lg"
            controls
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-50 text-white rounded-full p-1 hover:scale-105 transition-transform"
          >
            <X size={16} color="#FF4646" />
          </button>
        </div>
      )}

      {/* Upload Button */}
      {!preview && (
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id={id}
            {...rest}
          />
          <label
            htmlFor={id}
            className="w-[142px] h-[92px] flex flex-col gap-1 items-center justify-center rounded-lg bg-main-50 border-2 border-dashed border-main-200 hover:border-main-500 transition-all duration-200 cursor-pointer"
          >
            <VideoUploadIconSvg />
            <span className="text-main-500 text-sm font-medium">
              Upload a Video
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default VideoUpload;
