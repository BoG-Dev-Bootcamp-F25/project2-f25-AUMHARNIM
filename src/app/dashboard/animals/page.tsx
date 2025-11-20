"use client";

import { useEffect, useState } from "react";

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);

  async function loadAnimals() {
    const userId = localStorage.getItem("userId");
    const res = await fetch(`/api/animal?user=${userId}`);
    const data = await res.json();
    setAnimals(data);
  }

  useEffect(() => {
    loadAnimals();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Animals</h1>

      <div className="grid grid-cols-2 gap-6">
        {animals.map((a: any) => (
          <div
            key={a._id}
            className="border rounded shadow-sm p-4 bg-gray-50"
          >
            <img
              src={a.imageUrl}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{a.name}</h2>
            <p className="text-gray-600">{a.breed}</p>
            <p className="text-sm mt-2">{a.hoursTrained} hours trained</p>
          </div>
        ))}
      </div>
    </div>
  );
}
