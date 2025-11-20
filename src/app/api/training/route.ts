import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { title, description, hours, userId, animalId } = await req.json();

    if (!title || !description || !hours || !userId || !animalId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("animalTraining");

    // Check ownership
    const animal = await db.collection("animals").findOne({
      _id: new ObjectId(animalId),
      ownerId: new ObjectId(userId),
    });

    if (!animal) {
      return NextResponse.json(
        { error: "Animal does not belong to user" },
        { status: 400 }
      );
    }

    const result = await db.collection("trainingLogs").insertOne({
      title,
      description,
      hours,
      date: new Date(),
      userId: new ObjectId(userId),
      animalId: new ObjectId(animalId),
    });

    return NextResponse.json({ id: result.insertedId }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
