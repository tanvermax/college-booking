"use client";

import { useState } from "react";
import Link from "next/link";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, firestore } from "@/lib/firebase.init";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      console.log("Login attempt:", { email, password });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user);

      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      console.log("user data", userDoc.exists(), "user doc", userDoc.data());
      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
        await setDoc(doc(firestore, "users", user.uid), {
          name,
          email: user.email,
          password,
        })
        setSuccess("Login successful! Redirecting...");
        router.push("/dashboard"); // Redirect to dashboard
        // router.push("/dashboard"); // Redirect to dashboard
      } else {
        setError("No user data found. Please verify  first.");
        console.error("No user data found for UID:", user.uid);
        setError("No user data found. Please register first.");
      }
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      }
      setError(errorMessage);
      console.error("Login error:", error.message);
    }
  };

  const handlegooglelogin= async () =>{
    setError(null);
    setSuccess(null);
    
    try {
      const provider = new GoogleAuthProvider();
      const result = signInWithPopup(auth,provider);
      const user = result.user;
      console.log("Google login successful:", user);

      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        await setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          createdAt: new Date(),
          provider: "google"
        });
      }
      setSuccess("Google login successful! Redirecting...");

    } catch (error) {
      console.log(" Google login error:", error.message);
      setError("Google login failed. Please try again.");
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to CollegeBook</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full mt-1 px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full mt-1 px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-sm">
            <Link href="/reset-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
            <Link href="/register" className="text-blue-600 hover:underline">
              Don't have an account?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          — Or continue with —
        </div>

        <div className="mt-4 flex justify-center gap-4">
          <button onClick={handlegooglelogin} className="px-4 py-2 border rounded-md hover:bg-gray-100">Google</button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Facebook</button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </div>

    </section>
  );
}
