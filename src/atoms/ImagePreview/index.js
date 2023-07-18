import React from "react";
import { Modal } from "antd";
import "./ImagePreview.scss"; // Import your custom CSS file

const ImagePreview = ({
  imagePreviewUrl,
  closeImagePreview,
  isPreviewOpen,
}) => {
  // Render the component
  return (
    <Modal
    width="70%"
      visible={isPreviewOpen}
      closeIcon={null} // Remove the close icon
      footer={null}
      wrapClassName="image-preview-modal" // Apply custom CSS class
      mask={false} // Disable the mask (background overlay)
      onCancel={closeImagePreview} // Handle the close functionality
    >
      <div className="image_container">
        <img src={imagePreviewUrl} alt="Preview"  />
      </div>
    </Modal>
  );
};

export default ImagePreview;