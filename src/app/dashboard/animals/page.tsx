"use client";

import Image from "next/image";
import AnimalCard from "../../../components/AnimalCard";

export default function AnimalsPage() {
  // TEMPORARY STATIC DATA (replace with real MongoDB later)
  const animals = [
    {
      id: 1,
      name: "Lucy",
      breed: "Golden Retriever",
      owner: "Long Lam",
      hours: 100,
      image: "/images/dog.jpg",
    },
    {
      id: 2,
      name: "Lucy",
      breed: "Golden Retriever",
      owner: "Long Lam",
      hours: 100,
      image: "/images/dog.jpg",
    },
    {
      id: 3,
      name: "Lucy",
      breed: "Golden Retriever",
      owner: "Long Lam",
      hours: 100,
      image: "/images/dog.jpg",
    },
    {
      id: 4,
      name: "Lucy",
      breed: "Golden Retriever",
      owner: "Long Lam",
      hours: 100,
      image: "/images/dog.jpg",
    },
    {
      id: 5,
      name: "Lucy",
      breed: "Golden Retriever",
      owner: "Long Lam",
      hours: 100,
      image: "/images/dog.jpg",
    },
    {
      id: 6,
      name: "Lucy",
      breed: "Golden Retriever",
      owner: "Long Lam",
      hours: 100,
      image: "/images/dog.jpg",
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-xl font-semibold mb-6">Animals</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}
