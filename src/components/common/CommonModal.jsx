import React, { useState } from "react";
import { Button, Dialog, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";

export default function CommonModal({ open, onClose, onSave, title, content }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e, field) => {
      setFormData((prev) => ({
          ...prev,
          [field]: e.target.value
      }));
  };

    const handleSave = () => {
        onSave(formData); 
    };

    return (
        <div className="flex justify-center items-center ">
            <Dialog
                size="xs"
                open={open}
                handler={onClose}
                className="flex justify-center items-center mx-auto lg:mt-32 bg-slate-400 shadow-xl h-4/6 lg:w-1/3 w-3/4 "
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            {title}
                        </Typography>
                        {content.map((field, index) => (
                            <div key={index} className="flex flex-col gap-2">
                                <label htmlFor={field.label} className="text-sm font-semibold">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    id={field.label}
                                    placeholder={field.placeholder}
                                    value={formData[field.label] || ""}
                                    onChange={(e) => handleChange(e, field.label)}
                                    className="p-2 border rounded"
                                />
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
