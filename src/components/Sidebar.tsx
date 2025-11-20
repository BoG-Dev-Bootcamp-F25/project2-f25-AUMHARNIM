"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // pull admin status from localStorage
    const adminFlag = localStorage.getItem("admin") === "true";
    setIsAdmin(adminFlag);
  }, []);

  return (
    <div className="w-64 bg-white h-screen border-r flex flex-col justify-between py-6">

      {/* TOP SECTION */}
      <div>
        {/* LOGO */}
        <div className="flex items-center gap-3 px-6 mb-8">
          <Image
            src="/images/appLogo.png"
            alt="App Logo"
            width={40}
            height={40}
          />
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Progress</h1>
        </div>

        {/* TRAINING LOGS — ACTIVE */}
        <div
          className="flex items-center gap-3 mx-4 mb-3 p-3 bg-[#C0392B] text-white rounded-lg cursor-pointer"
          onClick={() => router.push("/dashboard/training")}
        >
          <Image
            src="/images/activeTrainingLogo.png"
            alt="Training Logo"
            width={22}
            height={22}
          />
          <span className="text-lg">Training logs</span>
        </div>

        {/* ANIMALS */}
        <div
          className="flex items-center gap-3 mx-4 mb-3 p-3 text-[#434A57] rounded-lg cursor-pointer hover:bg-gray-100"
          onClick={() => router.push("/dashboard/animals")}
        >
          <Image
            src="/images/inactiveAnimalLogo.png"
            alt="Animals Logo"
            width={22}
            height={22}
          />
          <span className="text-lg">Animals</span>
        </div>

        {/* ADMIN SECTION */}
        {isAdmin && (
          <div className="mt-6 border-t mx-4 pt-4">
            <p className="text-sm text-gray-500 mb-3 px-1">Admin access</p>

            <div
              className="flex items-center gap-3 mx-1 mb-3 p-3 text-[#434A57] rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => router.push("/dashboard/admin/training")}
            >
              <Image
                src="/images/inactiveTrainingLogs.png"
                alt="All training"
                width={22}
                height={22}
              />
              <span className="text-lg">All training</span>
            </div>

            <div
              className="flex items-center gap-3 mx-1 mb-3 p-3 text-[#434A57] rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => router.push("/dashboard/admin/animals")}
            >
              <Image
                src="/images/inactiveAllAnimalsLogo.png"
                alt="All animals"
                width={22}
                height={22}
              />
              <span className="text-lg">All animals</span>
            </div>

            <div
              className="flex items-center gap-3 mx-1 mb-3 p-3 text-[#434A57] rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => router.push("/dashboard/admin/users")}
            >
              <Image
                src="/images/inactiveAllUsersLogo.png"
                alt="All users"
                width={22}
                height={22}
              />
              <span className="text-lg">All users</span>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM USER SECTION */}
      <div className="flex items-center justify-between px-6 mt-4 border-t pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C0392B] text-white flex justify-center items-center text-lg font-bold">
            L
          </div>
          <div>
            <p className="font-semibold">Long Lam</p>
            <p className="text-sm text-gray-500">{isAdmin ? "Admin" : "User"}</p>
          </div>
        </div>

        <Image
          src="/images/logoutLogo.png"
          alt="Logout"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => router.push("/login")}
        />
      </div>
    </div>
  );
}
