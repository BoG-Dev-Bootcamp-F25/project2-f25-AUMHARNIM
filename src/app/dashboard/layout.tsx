"use client";

import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <div className="border-b border-gray-300 px-8 py-4 flex justify-between items-center bg-white">
          <SearchBar />

          <button className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="text-lg">＋</span>
            Create new
          </button>
        </div>

        <div className="px-10 py-6">{children}</div>
      </div>
    </div>
  );
}
