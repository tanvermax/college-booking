import connectiontoDatabase from "@/lib/mongoos";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase.init";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
  console.log("POST request received");

  try {
    // Parse the request body
    const { name, email,password, uid, dueDate } = await req.json();

    // Validate required fields
    if (!name || !email || !uid) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, or uid" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectiontoDatabase();

    // Save to MongoDB
    const newUser = new User({
      name,
      email,
      password,
      uid, // Store Firebase UID
      dueDate,
    });
    await newUser.save();

    // Save to Firestore
    const userRef = await addDoc(collection(firestore, "users"), {
      name,
      email,
      uid,
      password,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        data: { id: userRef.id, mongoId: newUser._id, name, email, uid, dueDate },
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