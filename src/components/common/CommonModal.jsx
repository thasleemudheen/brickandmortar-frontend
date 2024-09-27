import React, { useState, useEffect } from "react";
import { Button, Dialog, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { CgDetailsLess } from "react-icons/cg";

export default function CommonModal({ open, onClose, onSave, title, content }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            const initialFormData = {};
            content.forEach((field) => {
                if (field.type === "select" && field.options.length > 0) {
                    initialFormData[field.label] = field.options[0].value;
                } else if (field.type === "array") {
                    initialFormData[field.label] = field.options.map(() => "");
                } else if (field.type === "file") {
                    initialFormData[field.label] = []; // Initialize for multiple file support
                } else {
                    initialFormData[field.label] = "";
                }
            });
            setFormData(initialFormData);
            setErrors({});
        }
    }, [open, content]);

    const handleChange = (e, field, index = null) => {
        setFormData((prev) => {
            if (field === "image" && e.target.files) {
                // Handle file input with multiple files
                return {
                    ...prev,
                    [field]: Array.from(e.target.files)
                };
            } else if (index !== null) {
                return {
                    ...prev,
                    [field]: prev[field].map((item, idx) => (idx === index ? e.target.value : item))
                };
            } else {
                return {
                    ...prev,
                    [field]: e.target.value
                };
            }
        });
    };

    const validateForm = () => {
        const newErrors = {};
        content.forEach((field) => {
            if (field.type === "array") {
                formData[field.label].forEach((value, idx) => {
                    if (!value) {
                        newErrors[`${field.label}-${idx}`] = "This field is required";
                    }
                });
            } else {
                if (!formData[field.label]) {
                    newErrors[field.label] = "This field is required";
                }
            }
        });
        return newErrors;
    };

    const handleSave = () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            const formattedData = { ...formData };
        
            formattedData.AdditionalDetails = JSON.stringify(content
            .find(field => field.label === 'AdditionalDetails')
            .options.map((option, index) => ({
                [option.label]: formData.AdditionalDetails[index]
            })));

            formattedData.distancetoNearbyplaces = JSON.stringify(content
            .find(field => field.label === 'distancetoNearbyplaces')
            .options.map((option, index) => ({
                [option.label]: formData.distancetoNearbyplaces[index]
            })));
          

            // Pass the formatted data to the save function
            onSave(formattedData);
            console.log('fromatted data',formattedData)
            onClose();
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex justify-center items-center lg:w-full w-full">
            <Dialog
                size="md"
                open={open}
                handler={onClose}
                className="flex justify-center items-center lg:ml-96 mx-auto lg:mt-24 shadow-xl min-h-2/6 lg:w-5/6 w-full"
            >
                <Card className="w-full lg:max-w-[30rem]">
                    <CardBody style={{ scrollbarWidth: "none" }} className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
                        <Typography className="text-center font-bold text-4xl" variant="h4" color="blue-gray">
                            {title}
                        </Typography>
                        {content.map((field, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <label htmlFor={field.label} className="text-sm font-semibold">
                                    {field.label}
                                </label>
                                {field.type === "select" ? (
                                    <select
                                        id={field.label}
                                        value={formData[field.label] || ""}
                                        onChange={(e) => handleChange(e, field.label)}
                                        className="p-2 border rounded"
                                    >
                                        {field.options?.map((option, optionIndex) => (
                                            <option key={optionIndex} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === "array" ? (
                                    field.options?.map((arrayField, arrayIndex) => (
                                        <div key={arrayIndex} className="flex flex-col gap-1">
                                            <label className="text-sm text-gray-600">{arrayField.label}</label>
                                            <input
                                                type="text"
                                                id={`${field.label}-${arrayIndex}`}
                                                placeholder={arrayField.placeholder}
                                                value={formData[field.label]?.[arrayIndex] || ""}
                                                onChange={(e) => handleChange(e, field.label, arrayIndex)}
                                                className={`p-2 border rounded ${errors[`${field.label}-${arrayIndex}`] ? 'border-red-500' : ''}`}
                                            />
                                            {errors[`${field.label}-${arrayIndex}`] && (
                                                <p className="text-red-500 text-xs">{errors[`${field.label}-${arrayIndex}`]}</p>
                                            )}
                                        </div>
                                    ))
                                ) : field.type === "file" ? (
                                    <>
                                        <input
                                            type="file"
                                            id={field.label}
                                            multiple={field.multiple}  // Enable multiple file selection
                                            onChange={(e) => handleChange(e, field.label)}
                                            className="p-2 border rounded"
                                        />
                                        {errors[field.label] && (
                                            <p className="text-red-500 text-xs">{errors[field.label]}</p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type={field.type}
                                            id={field.label}
                                            placeholder={field.placeholder}
                                            value={formData[field.label] || ""}
                                            onChange={(e) => handleChange(e, field.label)}
                                            className={`p-2 border rounded ${errors[field.label] ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        {errors[field.label] && (
                                            <p className="text-red-500 text-xs">{errors[field.label]}</p>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            className="bg-blue-300"
                            variant="gradient"
                            onClick={handleSave}
                            fullWidth
                        >
                            Save
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    );
}
