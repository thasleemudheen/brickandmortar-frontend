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
  if (!property) return null;

  return (
    <>
      <div className='flex justify-center items-center'>
        <Dialog 
          open={open} 
          handler={handleClose} 
          className="w-full max-w-3xl mx-auto h-[20rem] bg-white shadow-lg rounded-lg"
        > 
          <DialogHeader className="bg-gray-300 text-white py-3 px-5 rounded-t-lg">
            <Typography variant="h6" className= " text-center text-white">
              {`${property.propertyName}`}
            </Typography>
          </DialogHeader>
          
          <DialogBody className="p-4 bg-gray-50 overflow-y-auto h-[30rem]">
            <Typography className="font-normal text-gray-700">
              <div className="mb-4">
                <p><strong>Property State:</strong> {property.propertyState}</p>
                <p>
              <strong>Exact Location:</strong> 
              <a href={property.exactLocation} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {property.exactLocation}
              </a>
            </p>            
              <p><strong>Description:</strong> {property.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p><strong>Rooms:</strong> {property.additionalDetails.rooms}</p>
                  <p><strong>Bathrooms:</strong> {property.additionalDetails.bathrooms}</p>
                  <p><strong>Floors:</strong> {property.additionalDetails.floors}</p>
                </div>

                <div>
                  <p><strong>Distance to School :</strong> {property.distancetoNearbyPlaces.school}</p>
                  <p><strong>Distance to Hospital :</strong> {property.distancetoNearbyPlaces.hospital}</p>
                  <p><strong>Distance to Restaurant :</strong> {property.distancetoNearbyPlaces.restaurant}</p>
                  <p><strong>Distance to Place of worship :</strong> {property.distancetoNearbyPlaces.placeOfWorship}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Images:</h4>
                <div className="flex flex-wrap gap-2">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`property-${index}`}
                      className="w-28 h-28 object-cover rounded-md shadow-sm"
                    />
                  ))}
                </div>
              </div>
            </Typography>
          </DialogBody>

          <DialogFooter className="bg-gray-100 py-3 px-4 rounded-b-lg flex justify-end">
            <Button 
              variant="text" 
              color="blue-gray" 
              onClick={handleClose}
              className="mr-2"
            >
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </>
  );
};

export default DetailsModal;
