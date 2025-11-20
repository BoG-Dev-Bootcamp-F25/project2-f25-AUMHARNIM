"use client";

import Image from "next/image";

export default function AnimalCard({ animal }: any) {
  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-4 w-full max-w-md">

      {/* Image */}
      <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
        <Image
          src={animal.profilePicUrl}
          alt={animal.name}
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Text */}
      <h2 className="text-lg font-semibold text-black">{animal.name}</h2>
      <p className="text-sm text-gray-600">{animal.breed}</p>

      <p className="mt-2 text-sm">
        <span className="font-semibold">Owner:</span> {animal.ownerName}
      </p>

      <p className="text-sm">
        <span className="font-semibold">Hours trained:</span> {animal.hoursTrained}
      </p>
    </div>
  );
}
