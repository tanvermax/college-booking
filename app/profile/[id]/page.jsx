'use client';

import { useUser } from '@/app/context/UserContext';
import { auth } from '@/lib/firebase.init';
import axios from 'axios';
import { sendPasswordResetEmail, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const { user: contextUser, loading, setUser } = useUser();
    const [dbUser, setDbUser] = useState(null);
    const [isLoadingDbUser, setIsLoadingDbUser] = useState(true);
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [resetError, setResetError] = useState('');

    console.log(contextUser, "user in profile page");
    const router = useRouter();
    useEffect(() => {
        if (contextUser?.email) {
            setIsLoadingDbUser(true);
            console.log(`/api/college?email=${contextUser.email}`)
            axios.get(`/api/college?email=${contextUser.email}`)
                .then(response => {
                    console.log("User data fetched from DB:", response.data.data);
                    setDbUser(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                })
                .finally(() => {
                    setIsLoadingDbUser(false);
                });
        }
    }, [contextUser?.email]);

    const handlePasswordReset = async () => {
        if (!contextUser?.email) {
            setResetError('No email address available');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, contextUser.email);
            setResetEmailSent(true);
            setResetError('');
            console.log("Password reset email sent successfully");
        } catch (error) {
            console.error("Error sending password reset email:", error);
            setResetError(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            // Sign out from Firebase
            await signOut(auth);

            // Clear local storage
            localStorage.removeItem("registrationData");

            // Reset user context
            if (setUser) {
                setUser(null);
            }

            // Redirect to login page
            router.push('/login');

            console.log("User signed out successfully");
        } catch (error) {
            console.error("Error signing out:", error);
            alert("There was an error signing out. Please try again.");
        }
    };

    if (loading || isLoadingDbUser) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!contextUser) return <div>Not authorized</div>;

    // Merge context user with DB user, giving priority to DB data
    const user = {
        ...contextUser,
        ...dbUser
    };

    console.log(dbUser.data, "dbUser in profile page");
    const userId = dbUser.data; // Use _id from DB or uid from params
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>

            <div className="bg-amber-600 h-[80vh] rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <img
                        src="https://i.pravatar.cc/100"
                        alt="Profile"
                        className="w-20 h-20 rounded-full"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{userId.name || 'No name'}</h2>
                        <p className="text-gray-600">{userId?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-500 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Personal Information</h3>
                        <p><span className="font-medium">Name:</span> {userId.name}</p>
                        <p><span className="font-medium">Email:</span> {userId?.email}</p>
                        {userId?.dueDate && (
                            <p><span className="font-medium">Due Date:</span> {new Date(userId.dueDate).toLocaleDateString()}</p>
                        )}
                    </div>

                    <div className="bg-amber-500 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Account Details</h3>
                        <p><span className="font-medium">userId ID:</span> {userId?._id || 'Not available'}</p>
                        <p><span className="font-medium">Account Created:</span>
                            {userId?.createdAt ? new Date(userId.createdAt).toLocaleDateString() : 'Not available'}
                        </p>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="font-medium mb-2">Actions</h3>
                    <button
                        onClick={() => alert('Edit Profile')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={handlePasswordReset}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                        disabled={resetEmailSent}
                    >
                        {resetEmailSent ? 'Reset Email Sent' : 'Reset Password'}
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-4"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}