import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import argon2 from "argon2";

export async function POST(req: Request) {
  try {
    const { fullName, email, password, isAdmin } = await req.json();

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("animalTraining");

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const passwordHash = await argon2.hash(password);

    const result = await db.collection("users").insertOne({
      fullName,
      email,
      passwordHash,
      isAdmin: !!isAdmin,
    });

    return NextResponse.json(
      { id: result.insertedId, fullName, isAdmin: !!isAdmin },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
