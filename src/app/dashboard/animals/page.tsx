"use client";

import { useEffect, useState } from "react";
import AnimalCard from "../../../components/AnimalCard";
import { useRouter } from "next/navigation";

export default function AnimalsPage() {
  const router = useRouter();
  const [animals, setAnimals] = useState([]);

  // Fetch animals for logged-in user
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    async function fetchAnimals() {
      const res = await fetch(`/api/animal?ownerId=${userId}`);
      const data = await res.json();
      setAnimals(data);
    }

    fetchAnimals();
  }, []);

  return (
    <div className="w-full px-8 pt-10">

      {/* Header Row */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Animals</h1>

        <button
          onClick={() => router.push("/dashboard/animals/create")}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          + Create Animal
        </button>
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {animals.length === 0 ? (
          <p className="text-gray-500 text-lg">No animals yet.</p>
        ) : (
          animals.map((animal: any) => (
            <AnimalCard key={animal._id} animal={animal} />
          ))
        )}
      </div>
    </div>
  );
}
