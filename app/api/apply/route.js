import connectiontoDatabase from "@/lib/mongoos";
import College from "@/models/College";
import { NextResponse } from "next/server";


export async function POST(req) {
    console.log("POST request received for college application");

    try {
        await connectiontoDatabase();

        const { name, subject, email, phone, address, dob } = await req.json();
        if (!name || !subject || !email || !phone || !address || !dob) {
            return NextResponse.json(
                { success: false, error: "Missing required fields: name, subject, email, phone, address, or dob" },
                { status: 400 }
            );
        }
        const newCollege = new College({
            name, subject, email, phone, address, dob
        });
        await newCollege.save();
        return NextResponse.json(
            {
                success: true,
                data: newCollege,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error saving user:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        await connectiontoDatabase();
        const applications = await College.find();
        return NextResponse.json(
            {
                success: true,
                data: applications
            },
            { status: 200 }
        );

    } catch (error) {
        console.log(error, "Error fetching applications");
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}