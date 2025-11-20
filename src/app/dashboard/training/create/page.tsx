"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateTrainingLogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [animalId, setAnimalId] = useState("");

  const [animals, setAnimals] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAnimals() {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await fetch(`/api/animal?userId=${userId}`);
      const data = await res.json();
      setAnimals(data);
    }

    loadAnimals();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    const userId = localStorage.getItem("userId");
    if (!userId) return setError("User not logged in.");

    if (!title || !description || !hours || !animalId) {
      return setError("All fields are required.");
    }

    const res = await fetch("/api/training", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        animalId,
        title,
        description,
        hours: Number(hours),
      }),
    });

    if (res.ok) {
      router.push("/dashboard/training");
    } else {
      const data = await res.json();
      setError(data.error || "Error creating training log");
    }
  }

  return (
    <div className="px-10 pt-10 max-w-xl">
      <h1 className="text-3xl font-semibold mb-8">Add Training Log</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Hours"
          min="1"
          className="border p-2 rounded"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={animalId}
          onChange={(e) => setAnimalId(e.target.value)}
        >
          <option value="">Select an Animal</option>
          {animals.map((a: any) => (
            <option key={a._id} value={a._id}>
              {a.name} — {a.breed}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Log
        </button>
      </form>
    </div>
  );
}
