import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center justify-between w-full sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? '✕' : '☰'}
            </button>

            {/* Logo (center) */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Logo</span>
            </div>

            {/* Login icon (right) */}
            <button className="bg-gray-400 p-2  text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              {/* <span className="sr-only"></span> */}
              <CgProfile/>
            </button>
          </div>

          {/* Desktop layout */}
          <div className="hidden sm:flex sm:items-center sm:justify-between sm:w-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">Logo</span>
            </div>

            {/* Navigation Items */}
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/property">Property</NavItem>
                <NavItem href="/services">Services</NavItem>
                <NavItem href="/about">About</NavItem>
                <NavItem href="/contact">Contact</NavItem>
              </div>
            </div>

            {/* Login Icon */}
            <button className="bg-gray-600 p-2 rounded-full text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">Login</span>
              <CgProfile/>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <MobileNavItem href="/">Home</MobileNavItem>
          <MobileNavItem href="/property">Property</MobileNavItem>
          <MobileNavItem href="/services">Services</MobileNavItem>
          <MobileNavItem href="/about">About</MobileNavItem>
          <MobileNavItem href="/contact">Contact</MobileNavItem>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
    >
      {children}
    </a>
  );
};

const MobileNavItem = ({ href, children }) => {
  return (
    <a
      href={href}
      className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
    >
      {children}
    </a>
  );
};

export default Navbar;