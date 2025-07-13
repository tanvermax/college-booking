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
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dueDate: ''
    });
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (contextUser?.email) {
            setIsLoadingDbUser(true);
            axios.get(`/api/college?email=${contextUser.email}`)
                .then(response => {
                    setDbUser(response.data);
                    // Initialize form data with user data
                    setFormData({
                        name: response.data.data?.name || '',
                        email: response.data.data?.email || '',
                        dueDate: response.data.data?.dueDate || ''
                    });
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
        } catch (error) {
            console.error("Error sending password reset email:", error);
            setResetError(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("registrationData");
            if (setUser) setUser(null);
            router.push('/login');
        } catch (error) {
            console.error("Error signing out:", error);
            alert("There was an error signing out. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateError('');
        setUpdateSuccess(false);
console.log(formData)
        try {
            const response = await axios.put(`/api/college/${dbUser.data._id}`, formData);
            setDbUser(prev => ({
                ...prev,
                data: response.data.data
            }));
            console.log("User updated successfully:", response.data);
            setUpdateSuccess(true);
            setIsEditing(false);
            setTimeout(() => setUpdateSuccess(false), 3000);
        } catch (error) {
            console.error("Error updating user:", error);
            setUpdateError(error.response?.data?.message || 'Failed to update profile');
        }
    };

    if (loading || isLoadingDbUser) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!contextUser) return <div>Not authorized</div>;

    const user = {
        ...contextUser,
        ...dbUser?.data
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>

            <div className="bg-amber-600 rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <img
                        src="https://i.pravatar.cc/100"
                        alt="Profile"
                        className="w-20 h-20 rounded-full"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{user.name || 'No name'}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-amber-500 p-4 rounded-lg">
                                <h3 className="font-medium mb-2">Personal Information</h3>
                                <div className="space-y-2">
                                    <div>
                                        <label className="block text-sm font-medium">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                            required
                                            disabled // Typically email shouldn't be changed
                                        />
                                    </div>
                                    {user.dueDate && (
                                        <div>
                                            <label className="block text-sm font-medium">Due Date</label>
                                            <input
                                                type="date"
                                                name="dueDate"
                                                value={formData.dueDate?.split('T')[0] || ''}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-amber-500 p-4 rounded-lg">
                                <h3 className="font-medium mb-2">Account Details</h3>
                                <p><span className="font-medium">User ID:</span> {user._id || 'Not available'}</p>
                                <p><span className="font-medium">Account Created:</span>
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}
                                </p>
                            </div>
                        </div>

                        {updateError && <p className="text-red-500">{updateError}</p>}
                        {updateSuccess && <p className="text-green-500">Profile updated successfully!</p>}

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-amber-500 p-4 rounded-lg">
                                <h3 className="font-medium mb-2">Personal Information</h3>
                                <p><span className="font-medium">Name:</span> {user.name}</p>
                                <p><span className="font-medium">Email:</span> {user.email}</p>
                                {user.dueDate && (
                                    <p><span className="font-medium">Due Date:</span> {new Date(user.dueDate).toLocaleDateString()}</p>
                                )}
                            </div>

                            <div className="bg-amber-500 p-4 rounded-lg">
                                <h3 className="font-medium mb-2">Account Details</h3>
                                <p><span className="font-medium">User ID:</span> {user._id || 'Not available'}</p>
                                <p><span className="font-medium">Account Created:</span>
                                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-x-4">
                            <button
                                onClick={() => setIsEditing(true)}
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
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}