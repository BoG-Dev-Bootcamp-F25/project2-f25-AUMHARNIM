"use client";

import Image from "next/image";

export default function AnimalCard({ animal }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image */}
      <div className="w-full h-56 relative">
        <Image
          src={animal.image}
          alt={animal.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full text-xs">
            L
          </div>
          <p className="font-semibold text-gray-800">
            {animal.name} - {animal.breed}
          </p>
        </div>

        <p className="text-xs text-gray-500">
          {animal.owner} • Trained: {animal.hours} hours
        </p>
      </div>
    </div>
  );
}
