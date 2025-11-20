"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // Helper: returns red background if this tab is active
  const isActive = (route: string) =>
    pathname.startsWith(route)
      ? "bg-[#C0352A] text-white"
      : "text-gray-700 hover:bg-gray-100";

  return (
    <div className="w-64 h-screen border-r flex flex-col justify-between bg-white">
      {/* Logo */}
      <div>
        <div className="px-6 py-6 flex items-center gap-2">
          <Image
            src="/images/appLogo.png"
            alt="Progress Logo"
            width={28}
            height={28}
          />
          <h1 className="text-2xl font-bold text-gray-900">Progress</h1>
        </div>

        {/* Sidebar Tabs */}
        <div className="flex flex-col px-4 gap-2">

          {/* Training Logs */}
          <button
            onClick={() => router.push("/dashboard/training")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${isActive(
              "/dashboard/training"
            )}`}
          >
            <Image
              src={
                pathname.startsWith("/dashboard/training")
                  ? "/images/activeTrainingLogo.png"
                  : "/images/inactiveTrainingLogs.png"
              }
              alt="Training"
              width={20}
              height={20}
            />
            Training logs
          </button>

          {/* Animals */}
          <button
            onClick={() => router.push("/dashboard/animals")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium ${isActive(
              "/dashboard/animals"
            )}`}
          >
            <Image
              src={
                pathname.startsWith("/dashboard/animals")
                  ? "/images/activeAnimalsLogo.png"
                  : "/images/inactiveAnimalLogo.png"
              }
              alt="Animals"
              width={20}
              height={20}
            />
            Animals
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C0352A] text-white flex items-center justify-center">
            L
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Long Lam</p>
            <p className="text-xs text-gray-500">User</p>
          </div>
        </div>

        <Image
          src="/images/logoutLogo.png"
          alt="logout"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}
