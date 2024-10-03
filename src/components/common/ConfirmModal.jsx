import React, { useState, useEffect } from 'react';
import { Modal, Input, Checkbox, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import LocationListGet from '@/services/admin/LocationListGet';
import PropertyListGet from '@/services/admin/PropertyListGet';

const { Option } = Select;

const ConfirmModal = ({ 
    isModalOpen, 
    setIsModalOpen, 
    formData,  
    onSave,   
    title 
}) => {
    const [formValues, setFormValues] = useState({}); 
    const [selectedImages, setSelectedImages] = useState([]); // State to manage selected images for deletion
    const [newImages, setNewImages] = useState([]); // State to manage new image uploads
    const [locations, setLocations] = useState([]); // State to hold locations
    const [propertyTypes, setPropertyTypes] = useState([]); // State to hold property types

    // Fetch locations
    const fetchLocation = async () => {
        const response = await LocationListGet();
        setLocations(response.data.locations); // Assuming response.data contains the locations
    };

    // Fetch property types
    const fetchPropertyType = async () => {
        const response = await PropertyListGet();
        setPropertyTypes(response.data.propertyType); // Assuming response.data contains the property types
    };

    useEffect(() => {
        if (formData) {
            setFormValues(formData);
            setSelectedImages([]); // Reset selected images if formData changes
        }
        fetchLocation();
        fetchPropertyType();
    }, [formData]);

   
    const handleInputChange = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value
        });
    };

    const handleNestedInputChange = (parentField, field, value) => {
        setFormValues(prevValues => ({
            ...prevValues,
            [parentField]: {
                ...prevValues[parentField],
                [field]: value
            }
        }));
    };

    // Handle checkbox change for deleting images
    const handleImageChange = (image) => {
        if (selectedImages.includes(image)) {
            setSelectedImages(selectedImages.filter((img) => img !== image)); // Deselect image
        } else {
            setSelectedImages([...selectedImages, image]); // Select image
        }
    };

    // Handle image upload
    const handleImageUpload = ({ file, fileList }) => {
        setNewImages(fileList);  // Update the fileList with selected images
        return false;  // Prevent auto-upload
    };
    const handleFileChange = ({ fileList }) => {
        setNewImages(fileList);  // Update the newImages state with selected files
    };

    const handleOk = () => {
        // Include selected images to delete and new images in the saved values
        const updatedValues = { 
            ...formValues, 
            imagesToDelete: selectedImages, // Send selected images to delete
            newImages // Send new images to upload
        };
        console.log('form values', updatedValues);
        onSave(updatedValues); // Call the onSave function with updated values
        setIsModalOpen(false); // Close the modal
    };

    const handleCancel = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <Modal
            title={title}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {Object.keys(formValues).map((field) => {
                // Check if the field is an object
                if (typeof formValues[field] === 'object' && !Array.isArray(formValues[field])) {
                    return (
                        <div key={field} style={{ marginBottom: 16 }}>
                            <label style={{ marginBottom: 8, display: 'block' }}>{`Edit ${field}`}</label>
                            {Object.keys(formValues[field]).map((nestedField) => (
                                <div key={nestedField} style={{ marginBottom: 8 }}>
                                    <label style={{ marginBottom: 4, display: 'block' }}>{`Edit ${nestedField}`}</label>
                                    <Input
                                        value={formValues[field][nestedField]}
                                        onChange={(e) => handleNestedInputChange(field, nestedField, e.target.value)}
                                        placeholder={`Enter ${nestedField}`}
                                    />
                                </div>
                            ))}
                        </div>
                    );
                }

                // Render dropdowns for property type and location
                if (field === 'propertyType') {
                    return (
                        <div style={{ marginBottom: 16 }}>
                        <label style={{ marginBottom: 8, display: 'block' }}>Select Property Type</label>
                        <Select
                            value={formValues.propertyType}  // Bind to formValues propertyType field
                            onChange={(value) => handleInputChange('propertyType', value)}  // Update formValues on selection
                            placeholder="Select Property Type"
                            style={{ width: '200px' }}
                        >
                            {propertyTypes.map((type) => (
                                <Option key={type._id} value={type._id}>{type.propertyName}</Option>  // Use type.id and propertyName from API
                            ))}
                        </Select>
                    </div>
                    
                    );
                }
                if(field==='__v'|| field==='_id' ||field==='vendor' || field==='createdAt'){
                    return(
                     <Input type='hidden' />
                    )
             }

                if (field === 'propertyState') {
                    return (
                        <div style={{ marginBottom: 16 }}>
                <label style={{ marginBottom: 8, display: 'block' }}>Select Location</label>
                <Select
                    value={formValues.propertyState}  // Bind to formValues propertyState field
                    onChange={(value) => handleInputChange('propertyState', value)}  // Update formValues on selection
                    placeholder="Select Location"
                    style={{ width: '200px' }}
                >
                    {locations.map((location) => (
                        <Option key={location._id} value={location._id}>{location.locationName}</Option>  // Use location.id and locationName from API
                    ))}
                </Select>
            </div>             
                    );
                }

                // Render normal input for non-object fields
                return (
                    <div key={field} style={{ marginBottom: 16 }}>
                        <label style={{ marginBottom: 8, display: 'block' }}>{`Edit ${field}`}</label>
                        <Input
                            value={formValues[field]}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            placeholder={`Enter ${field}`}
                        />
                    </div>
                );
            })}

            {/* Render existing images with checkboxes for deletion */}
            {formValues.images && formValues.images.length > 0 && (
                <div style={{ marginTop: 16 }}>
                    <label style={{ display: 'block', marginBottom: 8 }}>Select images to delete:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {formValues.images?.map((image) => (
                            <Checkbox
                                key={image}
                                value={image}
                                checked={selectedImages.includes(image)}
                                onChange={() => handleImageChange(image)}
                            >
                                <img src={image} alt={image.alt || 'Image'} style={{ width: 50, height: 50, marginRight: 8 }} />
                                {image.alt || 'Image'}
                            </Checkbox>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload new images */}
            <div style={{ marginTop: 16 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>Upload new images:</label>
            <Upload
                multiple
                beforeUpload={handleImageUpload}  // Prevent default behavior
                onChange={handleFileChange}  // Handle file list changes
                fileList={newImages}  // Bind the selected images to fileList
            >
                <Button icon={<UploadOutlined />}>Select Images</Button>
            </Upload>
        </div>
        </Modal>
    );
};

export default ConfirmModal;
