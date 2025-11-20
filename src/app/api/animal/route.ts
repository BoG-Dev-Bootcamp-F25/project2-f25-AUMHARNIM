import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

//
// ----------------------------
// CREATE ANIMAL (POST)
// ----------------------------
export async function POST(req: Request) {
  try {
    const { name, breed, hoursTrained, profilePicUrl, ownerId } =
      await req.json();

    if (!name || !breed || !profilePicUrl || !ownerId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("animalTraining");

    // Validate owner exists
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
  } catch (e) {
    console.error("ANIMAL POST ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

//
// ----------------------------
// GET ALL ANIMALS (GET)
// ----------------------------
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("animalTraining");

    const animals = await db
      .collection("animals")
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "ownerId",
            foreignField: "_id",
            as: "owner",
          },
        },
        { $unwind: "$owner" },
        {
          $project: {
            name: 1,
            breed: 1,
            hoursTrained: 1,
            profilePicUrl: 1,
            ownerName: "$owner.fullName",
          },
        },
      ])
      .toArray();

    return NextResponse.json(animals, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
