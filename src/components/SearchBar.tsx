"use client";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 w-80 bg-white">
      <span className="text-gray-500">🔍</span>
      <input
        placeholder="Search"
        className="w-full outline-none text-gray-700 placeholder:text-gray-500"
      />
    </div>
  );
}
