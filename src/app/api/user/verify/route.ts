import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import argon2 from "argon2";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("animalTraining");

    const user = await db.collection("users").findOne({ email });
    if (!user) return NextResponse.json({ error: "Invalid login" }, { status: 500 });

    const valid = await argon2.verify(user.passwordHash, password);
    if (!valid) return NextResponse.json({ error: "Invalid login" }, { status: 500 });

    return NextResponse.json(
      {
        id: user._id,
        fullName: user.fullName,
        isAdmin: user.isAdmin,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
