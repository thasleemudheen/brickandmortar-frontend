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
import DetailsModal from '@/components/common/DetailsModal'
export default function VendorPropertyPage() {
    const [showModal,setShowModal]=useState(false)
    const [property,setProperty]=useState([])
    const [location,setLocation]=useState([])
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
      setSelectedProperty(record); // Set the selected property for modal display
      setIsModal(true); // Open the modal
    };
  
    // Function to handle closing the modal
    const closeModal = () => {
      setIsModal(false); // Close the modal
      setSelectedProperty(null); // Clear the selected property
    };
   
    const handleSaveProperty = async (formData) => {
      try {
        // Create a FormData object
        const formDataToSend = new FormData();
    
        // Append each field from the formData object
        for (const key in formData) {
          if (formData.hasOwnProperty(key) && key !== 'image') {
            formDataToSend.append(key, formData[key]); // Append other form data fields
          }
        }
    
        // Append files (assuming formData.image is an array of file objects)
        if (formData.image && formData.image.length > 0) {
          for (let i = 0; i < formData.image.length; i++) {
            formDataToSend.append('image', formData.image[i]);  // The key 'image' must match the multer field
          }
        }

    //    console.log('form data to send',formDataToSend)
        // Send the formData as a multipart/form-data request
        const response = await VendorAddProperty(formDataToSend);
        if(response.status===404){
              ShowToast('error',response.data.message)
            //   return <Navigate to="/vendor/login" />
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
          render: (vendor) => vendor, // Render the vendor ID
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
            <Button type="primary" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button type="danger" onClick={() => handleDelete(record._id)}>
              Delete
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
    </div>
  )
}
