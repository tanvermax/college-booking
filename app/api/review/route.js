

import connectiontoDatabase from "@/lib/mongoos";
import College from "@/models/College";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectiontoDatabase();

        const { rating, comment, collegeId } = await req.json();
        console.log("Received data:", { rating, comment, collegeId });

        // Validate input
        if (!rating || !comment || !collegeId) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(collegeId)) {
            return NextResponse.json(
                { success: false, error: "Invalid college ID" },
                { status: 400 }
            );
        }

        // Create new review
        const newReview = {
            rating,
            comment,
            createdAt: new Date()
        };

        // Update college with new review
        const updatedCollege = await College.findByIdAndUpdate(
            collegeId,
            { $push: { reviews: newReview } },
            { new: true }
        );

        if (!updatedCollege) {
            return NextResponse.json(
                { success: false, error: "College not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                review: newReview,
                college: {
                    id: updatedCollege._id,
                    name: updatedCollege.name
                }
            }
        });

    } catch (error) {
        console.log("Error in API route:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}