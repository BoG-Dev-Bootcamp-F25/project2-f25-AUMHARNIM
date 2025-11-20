import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { name, breed, hoursTrained, profilePicUrl, ownerId } =
      await req.json();

    if (!name || !breed || !profilePicUrl || !ownerId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("animalTraining");

    const owner = await db
      .collection("users")
      .findOne({ _id: new ObjectId(ownerId) });

    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 400 });
    }

    const result = await db.collection("animals").insertOne({
      name,
      breed,
      hoursTrained: hoursTrained || 0,
      profilePicUrl,
      ownerId: new ObjectId(ownerId),
    });

    return NextResponse.json({ id: result.insertedId }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { animalId, hoursTrained } = await req.json();

    if (!animalId || hoursTrained === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("animalTraining");

    const result = await db.collection("animals").updateOne(
      { _id: new ObjectId(animalId) },
      { $set: { hoursTrained } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Animal not found" }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
