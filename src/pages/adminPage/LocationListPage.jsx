import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CommonTable from '../../components/common/CommonTable';
import CommonButton from '../../components/common/CommonButton';
import CommonModal from '../../components/common/CommonModal';
import instance from '../../utils/Axios';
import AdminAddLocation from '../../services/admin/AdminAddLocation';
import ConfirmModal from '../../components/common/ConfirmModal';

export default function LocationListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editLocationData, setEditLocationData] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await instance.get('/admin/location', {
          withCredentials: true,
        });
        setLocation(response.data.locations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocation();
  }, []);

  const columns = [
    { title: 'Location Name', dataIndex: 'locationName', key: 'locationName' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Edit', key: 'edit',
      render: (text, record) => (
        <button
          onClick={() => handleEdit(record.key)}
          className="text-blue-500"
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
          className="text-red-500"
        >
          <DeleteOutlined />
        </button>
      ),
    },
  ];

  const handleEdit = (id) => {
    const locationToEdit = location.find(loc => loc._id === id);
    setEditLocationData({ key: id, locationName: locationToEdit.locationName });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const result = await instance.delete(`/admin/deleteLocation/${id}`, {
        withCredentials: true
      });
      setLocation(result.data.filteredLocation);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLocation = async (id, updatedLocationName) => {
    try {
      const result = await instance.patch(`/admin/editLocation/${id}`, {
        newLocationName: updatedLocationName,
      }, {
        withCredentials: true
      });
      setLocation(result.data.updatedLocation);  // Update the list with the returned updated location
    } catch (error) {
      console.log(error);
    }
  };

  const data = location.map((loc) => ({
    key: loc._id,
    locationName: loc.locationName,
    createdAt: new Date(loc.createdAt).toLocaleString(),
  }));

  const handleOpenModal = () => setIsModalOpen((cur) => !cur);

  const handleSaveLocation = async (newLocation) => {
    try {
      const result = await AdminAddLocation({ location: newLocation['add location'] });
      setLocation([...location, result.data.latestLocation]);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const content = [
    { type: 'text', placeholder: 'Add location', label: 'add location' }
  ];

  return (
    <div className='w-full p-6'>
      <div className='flex flex-col items-center mb-6'>
        <h1 className='text-2xl font-semibold mb-4'>Add Location</h1>
        <CommonButton className='w-40' label="Add Location" onClick={handleOpenModal} />
        <CommonModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveLocation}
          title="Add Location"
          content={content}
        />
      </div>

      <h1 className='text-xl font-semibold mb-4'>Location List</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <CommonTable columns={columns} data={data} className="min-w-full bg-white" />
      </div>

      <ConfirmModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        data={editLocationData}
        onSave={handleUpdateLocation}
        title="Edit Location"
        fieldName="locationName"
        placeholder="Edit location name"
      />
    </div>
  );
}
