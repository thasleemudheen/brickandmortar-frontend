import React, { useEffect, useState } from 'react';
import CommonModal from '@/components/common/CommonModal';
import CommonButton from '@/components/common/CommonButton';
import AdminAddPropertyType from '@/services/admin/AdminAddPropertyType';
import CommonTable from '@/components/common/CommonTable';
import instance from '@/utils/Axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ConfirmModal from '@/components/common/ConfirmModal';
import PropertyListGet from '@/services/admin/PropertyListGet';

export default function PropertyTypeListPage() {
    const [isShowModal, setShowModal] = useState(false);
    const [propertyType, setPropertyType] = useState([]);
    const [editModal,setEditModal]=useState(false)
    const [editProperty,setEditProperty]=useState(null)
    const [editId,setEditId]=useState(null)

    const addProperty = () => setShowModal((cur) => !cur);

    const handleSavePropertyType = async (values) => {
        try {
            const response = await AdminAddPropertyType(values);
            if (response.status === 200) {
                const newPropertyType = response.data.propertyType;
                setPropertyType((prev) => [
                    ...prev, 
                    {
                        key: newPropertyType._id, 
                        propertyName: newPropertyType.propertyName,
                    }
                ]);
                setShowModal(false); 
            }
        } catch (error) {
            console.error('Error adding property type:', error);
        }
    };

    useEffect(() => {
        const fetchPropertyTypes = async () => {
            try {
                const response = await PropertyListGet();
                if (response.status === 200) {
                    const propertyTypesWithKey = response.data.propertyType.map((item) => ({
                        key: item._id,
                        propertyName: item.propertyName,
                    }));
                    setPropertyType(propertyTypesWithKey);
                }
            } catch (error) {
                console.error('Error fetching property types:', error);
            }
        };
        fetchPropertyTypes();
    }, []);
   
    const handleEdit =(id) => {
      let propertyEdit=propertyType.find(pro=>pro.key===id)
      const {propertyName,key}=propertyEdit
      setEditId(key)
      setEditProperty({propertyName})
      setEditModal(true)

    };
    const handleUpdateLocation=async(formValues)=>{
        const {propertyName}=formValues
        const id=editId
        try {
            const response=await instance.patch(`/admin/editProperty/${id}`,{
                newPropertyName:propertyName},{withCredentials:true}
            )
            setPropertyType(response.data.updatedProperty.map((item) => ({
                key: item._id,
                propertyName: item.propertyName,
            })))
        } catch (error) {
            console.log(error)
        }
 }

    const handleDelete =async(key) => {
        try {
            const response=await instance.delete(`/admin/deleteProperty/${key}`,{withCredentials:true})
            setPropertyType(response.data.filtered.map((item) => ({
                key: item._id,
                propertyName: item.propertyName,
            })))
            } catch (error) {
            console.log(error)
        }
    };

    const columns = [
        {
            title: 'Property Name', 
            dataIndex: 'propertyName', 
            key: 'propertyName',
            className: 'text-left', // Align text to the left
        },
        {
            title: 'Edit', key: 'edit',
            render: (text, record) => (
                <button
                    onClick={() => handleEdit(record.key)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <EditOutlined />
                </button>
            ),
        },
        {
            title: 'Delete', key: 'delete',
            render: (text, record) => (
                <button
                    onClick={() => handleDelete(record.key)}
                    className="text-red-500 hover:text-red-700"
                >
                    <DeleteOutlined />
                </button>
            ),
        },
    ];

    const content = [
        { label: "PropertyName", type: "text", placeholder: "Enter property name" },
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center items-center mb-6">
                <CommonButton className="bg-blue-300 w-40 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg" label={'Add Property'} onClick={addProperty} />
            </div>

            <div className="overflow-x-auto">
                <CommonTable columns={columns} data={propertyType} className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md" />
            </div>
           
            <CommonModal
                open={isShowModal}
                content={content}
                onClose={() => setShowModal(false)}
                onSave={handleSavePropertyType}
                title={'Add Property Type'}
            />
             <ConfirmModal
                isModalOpen={editModal}
                setIsModalOpen={setEditModal}
                formData={editProperty} // Pass the dynamic form data
                onSave={handleUpdateLocation} // Handle saving the updated data
                title="Edit Location"
            />
        </div>
        
    );
}
