"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    try {
      const res = await fetch("/api/user/verify", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Invalid email or password.");
        return;
      }

      const data = await res.json();

      localStorage.setItem("userId", data.id);
      localStorage.setItem("admin", data.admin);

      router.push("/dashboard/training");
    } catch (err) {
      setError("Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center">

      {/* HEADER */}
      <div className="w-full flex items-center px-8 py-4 border-b border-gray-300">
        <Image
          src="/images/appLogo.png"
          width={40}
          height={40}
          alt="Progress App Logo"
        />
        <span className="ml-3 text-3xl font-bold text-black">Progress</span>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center mt-16 w-full max-w-md">
        <h1 className="text-4xl font-bold text-black mb-10">Login</h1>

        {/* INPUTS */}
        <div className="flex flex-col w-full gap-8 px-6">
          <input
            type="text"
            placeholder="Email"
            className="border-b border-[#C43A2D] outline-none py-1 text-black placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border-b border-[#C43A2D] outline-none py-1 text-black placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ERROR MESSAGE */}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="mt-10 w-80 bg-[#C43A2D] hover:bg-[#A83226] text-white py-3 rounded-xl text-lg font-semibold transition"
        >
          Log in
        </button>

        {/* SIGNUP LINK */}
        <p className="mt-4 text-black text-sm">
          Don’t have an account?{" "}
          <span
            className="font-bold cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-center text-gray-600 text-xs">
        <p>Made with ♡ by Long Lam</p>
        <p>© 2023 BOG Developer Bootcamp. All rights reserved.</p>
      </div>
    </div>
  );
}
