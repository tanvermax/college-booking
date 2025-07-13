'use client';


import { auth, firestore } from '@/lib/firebase.init';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';


const Navbar = () => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                if (user.emailVerified) {
                    const userDoc = await getDoc(doc(firestore, "users", user.uid));
                    console.log("userDoc.exists()", userDoc.exists())
                    if (!userDoc.exists()) {
                        const registrationData = localStorage.getItem("registrationData");
                        const {
                            name = "",
                            email = "",
                            password = "",
                            dueDate = ""
                        } = registrationData ? JSON.parse(registrationData) : {};
                        await setDoc(doc(firestore, "users", user.uid), {
                            name,
                            email: user.email,
                            password,
                            dueDate: dueDate || null,
                        });
                        localStorage.removeItem("registrationData");
                        console.log("User data saved to Firestore:", user.uid);
                    }
                    setUser(user);
                    setLoading(false);

                }
                else {
                    setUser(null);
                    router.push("/login");
                }
            }
            else {
                setUser(null);
                setLoading(false);
                router.push("/login");
            }
            setLoading(false);
        });
        return () => unsubscribe();

    }, [router])
    console.log("user from home ", user)



 const handleProfileClick = () => {
        if (user) {
            router.push(`/profile/${user.uid}`);
        }
    };
    return (
        <nav className="bg-white shadow-md px-4 py-5">
            <div className="w-11/12 mx-auto flex items-center justify-between">
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
                <div className="hidden md:flex items-center space-x-10 text-base font-medium text-gray-700">
                    <a href="/">Home</a>
                    <a href="/college">Colleges</a>
                    <a href="/admission">Admissions</a>
                    <a href="/mycollege">My College</a>
                    <a href="/research">Research</a>
                    <a href="/reviews">Reviews</a>
                </div>

                {/* Right - Search, Button, Avatar */}
                <div className="hidden md:flex items-center space-x-4">

                    {
                        user ?
                            <>
                                <button onClick={handleProfileClick} className="btn text-[5px]">{user.email}</button>
                                
                            </>
                            :
                            loading ?
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                                </div>
                                :
                                <div className="flex items-center justify-center ">
                                    <button
                                        onClick={() => router.push("/login")}
                                        className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700"
                                    >
                                        Login
                                    </button>
                                </div>
                    }

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
                    <a href="/" className="block">Home</a>
                    <a href="/college" className="block">Colleges</a>
                    <a href="/admission" className="block">Admissions</a>
                    <a href="/mycollege" className="block">My College</a>
                    <a href="/research" className="block">Research</a>
                    <a href="/reviews" className="block">Reviews</a>
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
