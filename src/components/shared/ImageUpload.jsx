import { PlaceholderLogoSvg } from "@/services";
import { ImageIcon, X } from "lucide-react";

function ImageUpload({
  accept = ".jpg,.jpeg,.png",
  multiple = false,
  maxFiles = 5,
  previews = [],
  onUpload = () => {},
  onRemove = () => {},
  id = "image-upload",
  ...rest
}) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleRemove = (index) => {
    onRemove(index);
  };

  const showUploadButton = multiple ? previews.length < maxFiles : previews.length === 0;

  return (
    <div className="flex gap-4 flex-wrap">
      {/* Image Previews */}
      {previews.map((preview, index) => (
        <div key={`image-${index}`} className="relative">
          <img
            src={preview}
            alt={`Preview ${index + 1}`}
            className="w-[142px] h-[92px] object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-1 right-1 bg-red-50 text-white rounded-full p-1 hover:scale-105 transition-transform"
          >
            <X size={16} color="#FF4646" />
          </button>
        </div>
      ))}

      {/* Upload Button */}
      {showUploadButton && (
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
            id={id}
            {...rest}
          />
          <label
            htmlFor={id}
            className="w-[142px] h-[92px] flex flex-col gap-1 items-center justify-center rounded-lg bg-main-50 border-2 border-dashed border-main-200 hover:border-main-500 transition-all duration-200 cursor-pointer"
          >
            <PlaceholderLogoSvg />
            <span className="text-main-500 text-sm font-medium">
              Upload {multiple ? 'Images' : 'an Image'}
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
