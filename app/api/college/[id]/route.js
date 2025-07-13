import { firestore } from "@/lib/firebase.init";
import connectiontoDatabase from "@/lib/mongoos";
import User from "@/models/User";
import { updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        // Get ID from route parameters
        const { id } = params;
        console.log("Updating user with ID:", id);

        // Connect to MongoDB
        await connectiontoDatabase();
        console.log("Connected to DB");

        // Parse request body
        const { name, email, university, address, dueDate } = await request.json();
        console.log("Received update data:", { name, email, university, address, dueDate });

        // Update MongoDB
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                university,
                address,
                dueDate,
                updatedAt: new Date()
            },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            console.log("User not found in MongoDB");
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        console.log("MongoDB updated successfully");
        console.log(updatedUser)
        // Update Firestore

        return NextResponse.json(
            {
                success: true,
                data: updatedUser
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error in PUT handler:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Failed to update user"
            },
            { status: 500 }
        );
    }
}