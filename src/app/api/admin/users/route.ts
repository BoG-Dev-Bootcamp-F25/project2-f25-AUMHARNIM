import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("animalTraining");

    const users = await db
      .collection("users")
      .find({}, { projection: { passwordHash: 0 } })
      .toArray();

    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
