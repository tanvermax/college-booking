'use client';

import { auth, firestore } from '@/lib/firebase.init';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const { uid } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(firestore, "users", uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such document!");
                    router.push('/');
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push('/');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [uid, router]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 ">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            
            <div className="bg-amber-600 h-[80vh] rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <img 
                        src="https://i.pravatar.cc/100" 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{userData?.name || 'No name'}</h2>
                        <p className="text-gray-600">{userData?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-500 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Personal Information</h3>
                        <p><span className="font-medium">Name:</span> {userData?.name || 'Not provided'}</p>
                        <p><span className="font-medium">Email:</span> {userData?.email}</p>
                        {userData?.dueDate && (
                            <p><span className="font-medium">Due Date:</span> {new Date(userData.dueDate).toLocaleDateString()}</p>
                        )}
                    </div>

                    <div className="bg-amber-500 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Account Details</h3>
                        <p><span className="font-medium">User ID:</span> {uid}</p>
                        <p><span className="font-medium">Account Created:</span> Coming soon</p>
                    </div>
                </div>
            </div>
        </div>
    );
}