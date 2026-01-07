import BrickHelper from "@/components/brickList/BrickHelper";
import BackToPrev from "@/components/shared/BackToPrev";
import Input from "@/components/shared/Input";
import RequestLoader from "@/components/shared/RequestLoader";
import SelectInput from "@/components/shared/SelectInput";
import MultiSelectInput from "@/components/shared/MultiSelectInput";
import Textarea from "@/components/shared/Textarea";
import ImageUpload from "@/components/shared/ImageUpload";
import VideoUpload from "@/components/shared/VideoUpload";
import { Link } from "react-router-dom";
import { useEditBrick } from "@/hooks";
import { BRICK_TYPE_OPTIONS, getBrickTypeLabel } from "@/services";

function EditBrick() {
  const {
    upIsFetching,
    upIsError,
    upError,
    singleBrick,
    isLoading,
    handleSubmit,
    brickTypes,
    handleBrickTypesChange,
    imagePreviews,
    videoPreviews,
    handleImageUpload,
    handleVideoUpload,
    removeImage,
    removeVideo,
    imageInputKey,
    videoInputKey,
    brickFields,
  } = useEditBrick();

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-2xl">
      <div className="flex gap-1">
        <BackToPrev path="/admin/brick-list" />
        <h1 className="self-stretch justify-start text-gray-700 text-lg font-semibold leading-relaxed">
          Edit Brick
        </h1>
      </div>
      <BrickHelper
        isFetching={upIsFetching}
        isError={upIsError}
        error={upError}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-end gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Product Name"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Enter product name"
                name="name"
                defaultValue={singleBrick?.product_name}
                required
              />

              <SelectInput
                label="Brick Field"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                data={brickFields}
                placeHolder="Select Brick Field"
                labelKey="brick_field_name"
                selector="_id"
                name="brick_field"
                defaultValue={singleBrick?.brick_field_id}
                required
              />

              <MultiSelectInput
                label="Brick Type"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                data={BRICK_TYPE_OPTIONS}
                placeholder="Select Brick Types"
                labelKey="label"
                selector="id"
                value={brickTypes}
                onChange={handleBrickTypesChange}
                chips={true}
              />
            </div>

            {/* Dynamic fields for each brick type */}
            {brickTypes.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {brickTypes.map((tag, index) => {
                  const label = getBrickTypeLabel(tag);
                  const stockDetail = singleBrick?.stock_details?.find(
                    (detail) => detail.brick_type === tag
                  );
                  return (
                    <div key={index} className="contents">
                      <Input
                        label={`${label} Price Per Thousand`}
                        labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                        placeholder="Enter price value"
                        name={`price_${tag}`}
                        type="number"
                        defaultValue={stockDetail?.unit_price}
                      />
                      <Input
                        label={`${label} Minimum Order Quantity`}
                        labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                        placeholder="Enter price value"
                        name={`moq_${tag}`}
                        type="number"
                        defaultValue={stockDetail?.minimum_order_quantity}
                      />
                      <Input
                        label={`${label} Stock`}
                        labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                        placeholder="Enter price value"
                        name={`stock_${tag}`}
                        type="number"
                        defaultValue={stockDetail?.stock}
                        disabled={!!stockDetail}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Textarea
                label="Details"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Enter details here..."
                name="overview"
                wrapper="col-span-2"
                height="h-[120px]"
                defaultValue={singleBrick?.details}
                required
              />
            </div>

            {/* Media Upload Section */}
            <div className="flex flex-col gap-4">
              <label className="text-text-700 self-stretch justify-start text-base font-medium leading-normal">
                Preview Media (Image Up to 5)
              </label>

              <div className="flex gap-4 flex-wrap">
                {/* Video Upload Component */}
                <VideoUpload
                  key={videoInputKey}
                  id="video-upload"
                  preview={videoPreviews[0] || null}
                  onUpload={handleVideoUpload}
                  onRemove={removeVideo}
                />

                {/* Image Upload Component */}
                <ImageUpload
                  key={imageInputKey}
                  id="image-upload"
                  multiple={true}
                  maxFiles={5}
                  previews={imagePreviews}
                  onUpload={handleImageUpload}
                  onRemove={removeImage}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link to="/admin/brick-list" className="btn_cancel !w-[112px]">
                Cancel
              </Link>
              <button type="submit" className="btn_save w-[112px]">
                Update
              </button>
            </div>
          </div>
        </form>
      </BrickHelper>
      {isLoading && <RequestLoader />}
    </section>
  );
}

export default EditBrick;
