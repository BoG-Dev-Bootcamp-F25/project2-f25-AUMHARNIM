"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAnimalPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [hours, setHours] = useState(0);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const ownerId = localStorage.getItem("userId");

    if (!ownerId) {
      setError("You must be logged in to create an animal.");
      return;
    }

    const res = await fetch("/api/animal", {
      method: "POST",
      body: JSON.stringify({
        name,
        breed,
        hoursTrained: hours,
        profilePicUrl: image,
        ownerId,
      }),
    });

    if (res.ok) {
      router.push("/dashboard/animals");
    } else {
      setError("Failed to create animal.");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Create New Animal</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border w-full p-2 rounded"
          placeholder="Animal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border w-full p-2 rounded"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />

        <input
          className="border w-full p-2 rounded"
          type="number"
          placeholder="Hours Trained"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
        />

        <input
          className="border w-full p-2 rounded"
          placeholder="Profile Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
          Create Animal
        </button>
      </form>
    </div>
  );
}
