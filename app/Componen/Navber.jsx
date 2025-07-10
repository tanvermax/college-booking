'use client';

import { useState } from 'react';
import { FaSearch, FaUniversity } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white shadow-md px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left - Logo */}
                <div className="flex items-center space-x-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1_43)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.146 14.6667C14.146 14.6667 12.0248 11.3013 13.7231 8C15.6208 4.3112 14.0693 1.33333 14.0693 1.33333H2.33711C2.33711 1.33333 3.8859 4.31067 1.98971 7.99897C0.292091 11.301 2.42365 14.6667 2.42365 14.6667H14.146Z" fill="#121417" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_43">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <span className="text-xl font-bold text-gray-900">CollegeConnect</span>
                </div>

                {/* Center - Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
                    <a href="#">Home</a>
                    <a href="#">Colleges</a>
                    <a href="#">Admissions</a>
                    <a href="#">Events</a>
                    <a href="#">Research</a>
                    <a href="#">Reviews</a>
                </div>

                {/* Right - Search, Button, Avatar */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-gray-100 pl-8 pr-3 py-1.5 rounded-md focus:outline-none text-sm"
                        />
                        <FaSearch className="absolute left-2 top-2 text-gray-400 text-sm" />
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700">
                        Apply Now
                    </button>
                    <img
                        src="https://i.pravatar.cc/32"
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-3 space-y-2 text-sm font-medium text-gray-700">
                    <a href="#" className="block">Home</a>
                    <a href="#" className="block">Colleges</a>
                    <a href="#" className="block">Admissions</a>
                    <a href="#" className="block">Events</a>
                    <a href="#" className="block">Research</a>
                    <a href="#" className="block">Reviews</a>
                    <div className="flex items-center space-x-2 mt-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-gray-100 pl-8 pr-3 py-1.5 rounded-md focus:outline-none w-full"
                            />
                            <FaSearch className="absolute left-2 top-2 text-gray-400 text-sm" />
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm">
                            Apply
                        </button>
                        <img
                            src="https://i.pravatar.cc/32"
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
