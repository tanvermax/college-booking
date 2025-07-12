"use client";
const { auth, firestore } = require("@/lib/firebase.init");
const { onAuthStateChanged, signOut } = require("firebase/auth");
const { getDoc, doc } = require("firebase/firestore");
const { useRouter } = require("next/navigation");
const { useState, use, useEffect } = require("react");

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                try {
                    // Create document reference properly
                    const userRef = doc(firestore, "users", user.uid);
                    const userDoc = await getDoc(userRef);
                    
                    if (userDoc.exists()) {
                        console.log("User data from dashboard:", userDoc.data());
                        const userData = userDoc.data();
                        setUserName(userData.name || user.email || "User");
                    } else {
                        console.log("No user document found");
                        // You might want to create one here if it doesn't exist
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    router.push("/login");
                }
            } else {
                router.push("/login");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            {userName && <h1>Welcome, {userName}</h1>}
            <button onClick={handleLogout}>Log out</button>
            <button onClick={() => router.push("/change-password")}>Change Password</button>
        </div>
    );
}

export default Dashboard;