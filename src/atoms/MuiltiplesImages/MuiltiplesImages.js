import React, { useRef, useState } from 'react';
import './MuiltiplesImages.scss';
import { Modal } from 'antd';
import { CustomToast } from '../toastMessage';

const MuiltiplesImages = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorImage, setErrorImage] = useState([]);
    const fileInputRef = useRef(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = async (event) => {
        const files = event.target.files;
        const imageArray = Array.from(files);

        // Enforce exactly 4 images
        if (imageArray.length > 4) {
            CustomToast({
                type: "error",
                message: "Please select maximum 4 images.",
            });
            return;
        }

        // Check image dimensions
        let invalidImagesCount = 0;
        let invalidImageNames = [];
        let previouslyInvalidImages = []; // Keep track of previously invalid images

        for (const image of imageArray) {
            const img = new Image();
            img.src = URL.createObjectURL(image);

            await new Promise(resolve => {
                img.onload = () => {
                    if (img.width < 50 || img.height < 50 || img.width !== img.height) {
                        invalidImagesCount++;

                        if (!previouslyInvalidImages.includes(image.name)) {
                            previouslyInvalidImages.push(image.name);
                            invalidImageNames.push(image.name);
                        }
                    }

                    resolve();
                };
            });
        }

        if (invalidImagesCount > 0) {
            setErrorImage({ ...errorImage, invalidImageNames })
        } else {
            setSelectedImages(imageArray);
            setErrorImage([])
        }
    };

    console.log("errorImage", errorImage?.invalidImageNames)

    const removeImage = (imageName) => {
        const updatedImages = selectedImages.filter(image => image.name !== imageName);
        setSelectedImages(updatedImages);
    };

    const removeAllImages = () => {
        setSelectedImages([]);
        setErrorImage([]);
    };

    return (
        <>
            <div className="row mt-4">
                <div className="col-12 mt-lg-0 mt-0  doc-setting-input">
                    <div className="">
                        <span className='border cursor-pointer hospital-slider-image' onClick={showModal}>
                            Select Images
                        </span>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />

                    <Modal
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={<button className='hospital-slider-image-inner px-5' onClick={handleCancel}>Submit</button>}
                        width={'75%'}
                    >
                        <div className=" d-flex flex-column flex-lg-row justify-content-between align-items-center" style={{ minHeight: '300px' }}>
                            <div className='d-flex justify-content-center w-100'>
                                <div className="hospital-slider-image-inner-show-container">
                                    {selectedImages.length > 0 ? (
                                        selectedImages.map((image, index) => (
                                            <div className='hospital-slider-image-inner-show border position-relative' key={index}>
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Image ${index}`}
                                                    className="w-100 h-100"
                                                />
                                                <button
                                                    className="delete-button-image position-absolute"
                                                    onClick={() => removeImage(image.name)}
                                                >
                                                    &#10005;
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No images selected.</p>
                                    )}
                                </div>
                            </div>
                            <div className='d-flex flex-column align-items-center w-100'>
                                <div className="d-flex justify-content-center w-100" >
                                    <div className='d-flex align-items-center border cursor-pointer hospital-slider-image-inner ' onClick={handleButtonClick}>
                                        Select Images
                                    </div>
                                    <div className='d-flex align-items-center border cursor-pointer hospital-slider-image ml-2 ' onClick={removeAllImages}>
                                        Remove Images
                                    </div>
                                </div>
                                <div className='d-flex flex-column'>
                                    {
                                        errorImage?.invalidImageNames ? 
                                        <span>Invalid Image:</span> : null
                                    }
                                    {   errorImage?.invalidImageNames ? errorImage?.invalidImageNames?.map((item, index) => (
                                        <span key={index}>{item}</span>
                                    )) : <span>Please upload 50 by 50 pixel image</span>}
                                </div>
                                {/* <button>asd</button> */}
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default MuiltiplesImages;
