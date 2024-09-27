import CommonButton from '@/components/common/CommonButton'
import CommonModal from '@/components/common/CommonModal'
import LocationListGet from '@/services/admin/LocationListGet'
import PropertyGetPage from '@/services/admin/PropertyGetPage'
import VendorAddProperty from '@/services/vendor/VendorAddProperty'
import React, { useEffect, useState } from 'react'

export default function VendorPropertyListPage() {
    const [showModal,setShowModal]=useState(false)
    const [property,setProperty]=useState([])
    const [location,setLocation]=useState([])

    console.log('property types property list page',property)
    console.log('location get page in property lsit page',location)
    const addPropertyModal =()=>{
         setShowModal(true)
    }
    const fetchPropertyTypes=async()=>{
            const response=await PropertyGetPage()
            console.log('get resposne ',response)
            setProperty(response.data.propertyType)

        }
const fetchLocation=async()=>{
        const response=await LocationListGet()
        setLocation(response.data.locations)
      }
    useEffect(()=>{
      console.log('started');
      
      fetchPropertyTypes()
      fetchLocation()
    },[])
  
    
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
    
        // Send the formData as a multipart/form-data request
        const response = await VendorAddProperty(formDataToSend);
        console.log('Property saved successfully', response);
      } catch (error) {
        console.log('Error saving property', error);
      }
    };
     
     const content=[
        { label: "PropertyName", type: "text", placeholder: "Enter property name" },
        {label :'propertyPrice', type:'text' ,placeholder:'enter price'},
        { label: "Property Type", type: "select", options: property.map(type => ({ label: type.propertyName, value: type._id }))},
        {label:'State',type:'select',options: location.map(type => ({ label: type.locationName, value: type._id }))},
        {label:'location',type:'text',placeholder:'enter the location'},
        { label: 'Additional details', type: "array", 
          options: [
            { label: "Rooms", placeholder: "Enter room details" },
          { label: "bathrooms", placeholder: "Enter bathroom count and details" },
          { label: "floors", placeholder: "how many floors and other details" }] }, 
        { 
          label: " distance to Nearby places", 
          type: "array",
          options: [
              { label: "School", placeholder: "distance nearest school" },
              { label: "Hospital", placeholder: "distance nearest hospital" },
              { label: "Place of worship", placeholder: "distance to place of worship " },
              { label: "restaurant", placeholder: "nearest restaurant" }
          ]
      },
      {label:'exact location', type:'text', placeholder:'give me the exact location of google map'},
      {label:'description',type:'textArea',placeholder:'give the detailed description about the property'},
      {label:'image',type:'file',placeholder:'property image',multiple:true  }
    ]
  return (
    <div>
   
        <CommonButton onClick={addPropertyModal} label={'ADD PROPERTY'} className='w-40'/>
      <h1>vendor property list page</h1>
      <CommonModal open={showModal} title={'add property'} onClose={()=>setShowModal(false)} content={content}  onSave={handleSaveProperty}/>
    </div>
  )
}
