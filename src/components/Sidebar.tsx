"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SideBar() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) return setIsAdmin(false);

    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/verify?id=${id}`);
        if (!res.ok) {
          setIsAdmin(false);
          return;
        }

        const data = await res.json();
        setFullName(data.fullName || "User");
        setIsAdmin(data.isAdmin === true);
      } catch {
        setIsAdmin(false);
      }
    }

    fetchUser();
  }, []);

  // Avoid rendering until we know admin state
  if (isAdmin === null) return null;

  return (
    <div className="flex flex-col justify-between h-full w-64 border-r p-4">

      {/* TOP SECTION */}
      <div className="flex flex-col gap-4">

        {/* App Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <Image src="/images/appLogo.png" width={32} height={32} alt="App Logo" />
          Progress
        </div>

        {/* Training Logs */}
        <Link href="/dashboard/training" className="flex items-center gap-3 p-2 rounded hover:bg-gray-200">
          <Image src="/images/inactiveTrainingLogs.png" width={22} height={22} alt="Training" />
          <span>Training logs</span>
        </Link>

        {/* Animals */}
        <Link href="/dashboard/animals" className="flex items-center gap-3 p-2 rounded hover:bg-gray-200">
          <Image src="/images/inactiveAnimalLogo.png" width={22} height={22} alt="Animals" />
          <span>Animals</span>
        </Link>

        {/* ADMIN SECTION */}
        {isAdmin && (
          <>
            <div className="mt-4 mb-1 text-sm text-gray-500">Admin access</div>

            <Link href="/admin/training" className="flex items-center gap-3 p-2 rounded hover:bg-gray-200">
              <Image src="/images/inactiveAllTrainingLogo.png" width={22} height={22} alt="All training" />
              <span>All training</span>
            </Link>

            <Link href="/admin/animals" className="flex items-center gap-3 p-2 rounded hover:bg-gray-200">
              <Image src="/images/inactiveAllAnimalsLogo.png" width={22} height={22} alt="All animals" />
              <span>All animals</span>
            </Link>

            <Link href="/admin/users" className="flex items-center gap-3 p-2 rounded hover:bg-gray-200">
              <Image src="/images/inactiveAllUsersLogo.png" width={22} height={22} alt="All users" />
              <span>All users</span>
            </Link>
          </>
        )}
      </div>

      {/* BOTTOM USER INFO */}
      <div className="flex items-center justify-between border-t pt-3">
        <div className="flex flex-col text-sm">
          <span className="font-semibold">{fullName}</span>
          <span className="text-gray-500 text-xs">
            {isAdmin ? "Admin" : "User"}
          </span>
        </div>

        <Link href="/login">
          <Image src="/images/logoutLogo.png" width={22} height={22} alt="Logout" />
        </Link>
      </div>
    </div>
  );
}
