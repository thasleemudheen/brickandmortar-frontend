import React, { useState, useEffect } from 'react';
import {Modal, Input } from 'antd';

const ConfirmModal = ({ isModalOpen, setIsModalOpen, locationData, onSave ,title}) => {
    const [locationName, setLocationName] = useState('');

    useEffect(() => {
        if (locationData) {
            setLocationName(locationData.locationName);
        }
    }, [locationData]);

    const handleOk = () => {
        onSave(locationData.key, locationName);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="Edit location name"
                />
            </Modal>
        </>
    );
};

export default ConfirmModal;
