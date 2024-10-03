import CommonButton from '@/components/common/CommonButton'
import CommonModal from '@/components/common/CommonModal'
import CommonTable from '@/components/common/CommonTable'
import ShowToast from '@/helpers/ShowToast'
import LocationListGet from '@/services/admin/LocationListGet'
import PropertyListGet from '@/services/admin/PropertyListGet'
import VendorAddProperty from '@/services/vendor/VendorAddProperty'
import VendorPropertyListGet from '@/services/vendor/VendorPropertyListGet'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DetailsModal from '@/components/common/DetailsModal'
import ConfirmModal from '@/components/common/ConfirmModal'
import VendorUpdateProduct from '@/services/vendor/VendorUpdateProduct'
export default function VendorPropertyPage() {
    const [showModal,setShowModal]=useState(false)
    const [property,setProperty]=useState([])
    const [location,setLocation]=useState([])
    const [showEditModal,setShowEditModal]=useState(false)
    const [data,setData]=useState([])
    const [isModal,setIsModal]=useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null); // Track the selected property

    const navigate=useNavigate()
    console.log('property types property list page',property)
    console.log('location get page in property lsit page',location)
    const addPropertyModal =()=>{
         setShowModal(true)
    }
    const fetchPropertyTypes=async()=>{
            const response=await PropertyListGet()
            console.log('get resposne ',response)
            setProperty(response.data.propertyType)

        }
const fetchLocation=async()=>{
        const response=await LocationListGet()
        setLocation(response.data.locations)
      }
      const fetchProperties=async()=>{
        const response=await VendorPropertyListGet()
         setData(response.data.properties)
      }
    useEffect(()=>{
      console.log('started');
      
      fetchPropertyTypes()
      fetchLocation()
      fetchProperties()
    },[])
    const showDetailModal = (record) => {
      setSelectedProperty(record); 
      setIsModal(true); 
    };
  
    const closeModal = () => {
      setIsModal(false);
      setSelectedProperty(null); 
    };
   
    const handleSaveProperty = async (formData) => {
      try {
        const formDataToSend = new FormData();
    
        for (const key in formData) {
          if (formData.hasOwnProperty(key) && key !== 'image') {
            formDataToSend.append(key, formData[key]); 
          }
        }
    
        if (formData.image && formData.image.length > 0) {
          for (let i = 0; i < formData.image.length; i++) {
            formDataToSend.append('image', formData.image[i]);  
          }
        }

        const response = await VendorAddProperty(formDataToSend);
        if(response.status===404){
              ShowToast('error',response.data.message)
            setTimeout(() => {
                navigate('/vendor/login')
            }, 2000);
            
            console.log('token not found admin want to login again')
        }else if(response.status===200){
          setData((prev)=>[...prev,response.data.property])
        }
        console.log('Property saved successfully', response);
      } catch (error) {
        console.log('Error saving property', error);
      }
    };
    const handleEdit = (property) => {
      console.log('properties from the property editing page',property)
      setSelectedProperty(property) 
      setShowEditModal(true) 
  }
//   const createFormData = (updatedValues) => {
//     const formData = new FormData();
    
//     // Append all the values from the updatedValues object to FormData
//     for (const key in updatedValues) {
//         if (key === 'newImages' && Array.isArray(updatedValues[key])) {
//             // If there are new images, append each image file to the form data
//             updatedValues[key].forEach((file, index) => {
//                 formData.append('image', file); // Ensure 'image' matches your backend field
//             });
//         } else if (key === 'imagesToDelete' && Array.isArray(updatedValues[key])) {
//             // Handle images marked for deletion
//             formData.append('imagesToDelete', JSON.stringify(updatedValues[key]));
//         } else {
//             formData.append(key, updatedValues[key]); // Append other fields
//         }
//     }

//     return formData;
// };
const handleSaveEdit = async (updatedValues) => {
  console.log('Updated property values in the frontend', updatedValues);
  const formData = new FormData();

  for (let key in updatedValues) {
    if (key === 'newImages') {
      // Handle image files
      const files = updatedValues[key];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Check if it's a File object
        if (file instanceof File) {
          formData.append('images', file, file.name);
        } else if (file.originFileObj instanceof File) {
          // If it's an object with originFileObj (as in your metadata)
          formData.append('images', file.originFileObj, file.originFileObj.name);
        } else {
          console.warn(`Invalid file object at index ${i}`, file);
        }
      }
    } else if (typeof updatedValues[key] === 'object' && !Array.isArray(updatedValues[key])) {
      formData.append(key, JSON.stringify(updatedValues[key])); // Append other objects as JSON strings
    } else {
      formData.append(key, updatedValues[key]); // Append other fields
    }
  }


  try {
    // Send formData to the backend
    const response = await VendorUpdateProduct(formData);
    console.log('Property updated successfully', response);
  } catch (error) {
    console.error('Error updating property', error);
  }
};



    const columns = [
      {
        title: 'Property Name',
        dataIndex: 'propertyName',
        key: 'propertyName',
      },
      {
        title: 'Price',
        dataIndex: 'propertyPrice',
        key: 'propertyPrice',
      },
      {
        title: 'Property Type',
        dataIndex: 'propertyType',
        key: 'propertyType',
      },
      {
        title: 'Location',
        dataIndex: 'propertyLocation',
        key: 'propertyLocation',
      },
      {
          title: 'Vendor ID',
          dataIndex: 'vendor',
          key: 'vendor',
          render: (vendor) => vendor, 
        },
      // {
      //   title:'PropertyState',
      //   dataIndex:'propertyState',
      //   key:'propertyState'
      // },
      // {
      //   title: 'Vendor ID',
      //   dataIndex: 'vendor',
      //   key: 'vendor',
      //   render: (vendor) => vendor, // Render the vendor ID
      // },
      // {
      //   title:'Location',
      //   dataIndex:'exactLocation',
      //   key:'exactLocation'
      // },
      // {
      //   title: 'Additional Details',
      //   key: 'additionalDetails',
      //   render: (record) => (
      //     <div>
      //       <p>Rooms: {record.additionalDetails.rooms}</p>
      //       <p>Bathrooms: {record.additionalDetails.bathrooms}</p>
      //       <p>Floors: {record.additionalDetails.floors}</p>
      //     </div>
      //   ),
      // },
      // {
      //   title: 'Nearby Places',
      //   key: 'distancetoNearbyPlaces',
      //   render: (record) => (
      //     <div>
      //       <p>School: {record.distancetoNearbyPlaces.school}</p>
      //       <p>Hospital: {record.distancetoNearbyPlaces.hospital}</p>
      //       <p>Place of Worship: {record.distancetoNearbyPlaces.placeOfWorship}</p>
      //       <p>Restaurant: {record.distancetoNearbyPlaces.restaurant}</p>
      //     </div>
      //   ),
      // },
      // {
      //   title: 'Image',
      //   dataIndex: 'images',
      //   key: 'images',
      //   render: (images) => (
      //     <img
      //       src={images[0]} // Display the first image
      //       alt="property"
      //       style={{ width: '100px', height: '100px', objectFit: 'cover' }}
      //     />
      //   ),
      // },
      {
        title: 'More Details',
        key: 'moreDetails',
        render: (record) => (
          <Button type="primary" onClick={() => showDetailModal(record)}>
            View Details
          </Button>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (record) => (
          <div className="flex space-x-2">
            <Button  onClick={() => handleEdit(record)}>
              <EditOutlined/>
            </Button>
            <Button onClick={() => handleDelete(record._id)}>
              <DeleteOutlined/>
            </Button>
          </div>
        ),
      },
    ];
     
     const content=[
        { label: "PropertyName", type: "text", placeholder: "Enter property name" },
        {label :'propertyPrice', type:'text' ,placeholder:'enter price'},
        { label: "PropertyType", type: "select", options: property.map(type => ({ label: type.propertyName, value: type.propertyName }))},
        {label:'State',type:'select',options: location.map(type => ({ label: type.locationName, value: type.locationName }))},
        {label:'location',type:'text',placeholder:'enter the location'},
        { label: 'AdditionalDetails', type: "array", 
          options: [
            { label: "Rooms", placeholder: "Enter room details" },
          { label: "bathrooms", placeholder: "Enter bathroom count and details" },
          { label: "floors", placeholder: "how many floors and other details" }] }, 
        { 
          label: "distancetoNearbyplaces", 
          type: "array",
          options: [
              { label: "School", placeholder: "distance nearest school" },
              { label: "Hospital", placeholder: "distance nearest hospital" },
              { label: "Placeofworship", placeholder: "distance to place of worship " },
              { label: "restaurant", placeholder: "nearest restaurant" }
          ]
      },
      {label:'exactlocation', type:'url', placeholder:'copy paste the link of exact location from the google map'},
      {label:'description',type:'textArea',placeholder:'give the detailed description about the property'},
      {label:'image',type:'file',placeholder:'property image',multiple:true  }
    ]
  return (
    <div>
 {/* <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.1340432053274!2d75.899557!3d11.12406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba651df61386e71%3A0x503c742010689b05!2sCUIET%20Thenjipalam!5e0!3m2!1sen!2sin!4v1636124739626!5m2!1sen!2sin"
                width="600" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
            ></iframe> */}
        <CommonButton onClick={addPropertyModal} label={'ADD PROPERTY'} className='w-40'/>
      <h1>vendor property list page</h1>
      <CommonModal open={showModal} title={'add property'} onClose={()=>setShowModal(false)} content={content}  onSave={handleSaveProperty}/>
        <ToastContainer/>
        <CommonTable columns={columns} data={data} />
        <DetailsModal
        open={isModal}
        handleClose={closeModal}
        property={selectedProperty}
      />
      
      <ConfirmModal 
        isModalOpen={showEditModal} 
        setIsModalOpen={setShowEditModal} 
        formData={selectedProperty} // Pass selected property data to ConfirmModal
        onSave={handleSaveEdit} // Function to handle saving edited data
        title="Edit Property" 
    />
    </div>
  )
}
