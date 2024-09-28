import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';

const DetailsModal = ({ open, handleClose, property }) => {
  if (!property) return null; // Don't render the modal if no property is selected

  return (
    <>
    <div className='flex justify-center '>

    
      <Dialog open={open} handler={handleClose} className="max-w-5xl lg:ml-96 mx-auto"> {/* Increased width and centered */}
        <DialogHeader>{`Details for ${property.propertyName}`}</DialogHeader>
        <DialogBody className=" h-[32rem] w-[22rem] ">
          <Typography className="font-normal">
            <p><strong>Property State:</strong> {property.propertyState}</p>
            <p><strong>Exact Location:</strong> {property.exactLocation}</p>
            <p><strong>Description:</strong> {property.description}</p>
            <p><strong>Rooms:</strong> {property.additionalDetails.rooms}</p>
            <p><strong>Bathrooms:</strong> {property.additionalDetails.bathrooms}</p>
            <p><strong>Floors:</strong> {property.additionalDetails.floors}</p>

            <h3>Nearby Places:</h3>
            <p><strong>School:</strong> {property.distancetoNearbyPlaces.school}</p>
            <p><strong>Hospital:</strong> {property.distancetoNearbyPlaces.hospital}</p>
            <p><strong>Place of Worship:</strong> {property.distancetoNearbyPlaces.placeOfWorship}</p>
            <p><strong>Restaurant:</strong> {property.distancetoNearbyPlaces.restaurant}</p>

            <h3>Images:</h3>
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`property-${index}`}
                style={{ width: '100px', height: '100px', marginRight: '10px' }}
              />
            ))}
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleClose}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
      </div>
    </>
  );
};

export default DetailsModal;
