// app/api/college/route.js
import { NextResponse } from "next/server";
import { firestore } from "@/lib/firebase.init";
import { doc, setDoc } from "firebase/firestore"; // Use setDoc instead of addDoc
import connectiontoDatabase from "@/lib/mongoos";
import User from "@/models/User";
// Fix import path

export async function POST(req) {
  console.log("POST request received");

  try {
    const { name, email,password, uid, dueDate } = await req.json(); // Remove password
    if (!name || !email || !uid) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, email, or uid" },
        { status: 400 }
      );
    }
    await connectiontoDatabase();
    const newUser = new User({
      name,
      email,
      password,
      uid, // Store Firebase UID
      dueDate,
    });
    await newUser.save();
    console.log("Saving to Firestore:", { name, email,password, uid, dueDate });
    await setDoc(doc(firestore, "users", uid), {
      name,
      email,
      password,
      uid,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    }).catch((firestoreError) => {
      console.error("Firestore write error:", firestoreError);
      throw firestoreError;
    });
    console.log("Firestore document set with ID:", uid);

    return NextResponse.json(
      {
        success: true,
        data: { id: uid, mongoId: newUser._id, name, email, uid, dueDate },
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


export async function GET(req, { params }) {
  try {
    await connectiontoDatabase();
    console.log(params, "params in GET request");
    console.log(params?.id)
    
    // If ID parameter exists (dynamic route)
    if (params?.id) {
      const user = await User.findById(params.id);
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { success: true, data: user },
        { status: 200 }
      );
    }
    // If no ID parameter (base route)
    else {
      const users = await User.find({});
      return NextResponse.json(
        { success: true, data: users },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

