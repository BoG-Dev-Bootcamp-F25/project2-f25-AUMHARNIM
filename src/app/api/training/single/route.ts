import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("animalTraining");

    // Convert userId to ObjectId to match DB format
    const userObjectId = new ObjectId(userId);

    const logs = await db
      .collection("trainingLogs")
      .aggregate([
        { $match: { userId: userObjectId } },

        // JOIN WITH ANIMALS
        {
          $lookup: {
            from: "animals",
            localField: "animalId",
            foreignField: "_id",
            as: "animal",
          },
        },
        { $unwind: "$animal" },

        // JOIN WITH USERS
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },

        // FINAL FIELDS
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            hours: 1,
            date: 1,
            animalName: "$animal.name",
            animalBreed: "$animal.breed",
            userName: "$user.fullName",
          },
        },

        // Sort newest first
        { $sort: { date: -1 } },
      ])
      .toArray();

    return NextResponse.json(logs, { status: 200 });
  } catch (e) {
    console.error("TRAINING SINGLE GET ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
