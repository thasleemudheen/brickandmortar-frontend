import React from 'react'
import { Link } from 'react-router-dom';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    MapPinIcon ,
    PowerIcon,
    BriefcaseIcon ,
  } from "@heroicons/react/24/solid";
   
  export default function AdminDashboard() {
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="p-6 bg-blue-600 mb-2 ">
          <Typography className='text-2xl font-bold text-white' variant="h5" color="blue-gray">
            ADMIN DASHBOARD
          </Typography>
        </div>
        <List>
           <Link to='/admin/dashboard'>
          <ListItem className='font-medium flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
            <ListItemPrefix>
              <PresentationChartBarIcon  className="h-5 w-5 mr-3" />
            </ListItemPrefix>
            DASHBOARD
          </ListItem>
          </Link>
          <Link to='/admin/property'>
          <ListItem className='font-medium flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5 mr-3" />
            </ListItemPrefix>
            PROPERTY
          </ListItem>
          </Link>
         <Link to='/admin/location'>
         <ListItem className='font-medium flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
            <ListItemPrefix>
              <MapPinIcon className="h-5 w-5 mr-3" />
            </ListItemPrefix>
            LOCATION
            <ListItemSuffix>
              <Chip value="" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
         </Link>
          
          <ListItem className='font-medium flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 mr-3" />
            </ListItemPrefix>
            PROFILE
          </ListItem>
          <ListItem className='font-medium flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 mr-3" />
            </ListItemPrefix>
            USER LIST
          </ListItem>
          <Link to='/admin/vendors'>
          <ListItem className='font-medium flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
            <ListItemPrefix>
              <BriefcaseIcon className="h-5 w-5 mr-3" />
            </ListItemPrefix>
            VENDOR LIST
          </ListItem>
          </Link>
          <ListItem className='font-medium flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5 mr-3" />
            </ListItemPrefix>
            SETTINGS
          </ListItem>
          <ListItem className='font-medium flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 mr-3" />
            </ListItemPrefix>
            LOGOUT
          </ListItem>

        </List>
      </Card>
    );
  }





