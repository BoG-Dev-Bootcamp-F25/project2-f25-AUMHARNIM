import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { userId, animalId, title, description, hours } = await req.json();

    if (!userId || !animalId || !title || !description || hours === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("animalTraining");

    // Validate animal belongs to this user
    const animal = await db.collection("animals").findOne({
      _id: new ObjectId(animalId),
      ownerId: new ObjectId(userId),
    });

    if (!animal) {
      return NextResponse.json(
        { error: "Animal does not belong to this user" },
        { status: 400 }
      );
    }

    // Create new training log
    const result = await db.collection("trainingLogs").insertOne({
      userId: new ObjectId(userId),
      animalId: new ObjectId(animalId),
      title,
      description,
      hours,
      date: new Date(),
    });

    // Increase the animal's total hours
    await db.collection("animals").updateOne(
      { _id: new ObjectId(animalId) },
      { $inc: { hoursTrained: hours } }
    );

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
