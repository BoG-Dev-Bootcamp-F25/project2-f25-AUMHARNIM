"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup() {
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          fullName: name,
          email,
          password,
          admin,
        }),
      });

      if (!res.ok) {
        setError("Unable to create account.");
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
          alt="Progress Logo"
        />
        <span className="ml-3 text-3xl font-bold text-black">Progress</span>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center mt-16 w-full max-w-md">
        <h1 className="text-4xl font-bold text-black mb-10">Create Account</h1>

        <div className="flex flex-col w-full gap-8 px-6">

          <input
            type="text"
            placeholder="Full Name"
            className="border-b border-[#C43A2D] outline-none py-1 text-black placeholder-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            className="border-b border-[#C43A2D] outline-none py-1 text-black placeholder-gray-500"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {/* ADMIN CHECKBOX */}
          <label className="flex items-center gap-3 text-black text-sm mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
              className="h-4 w-4 border-2 border-[#C43A2D] accent-[#C43A2D]"
            />
            Admin access
          </label>
        </div>

        {/* ERROR MESSAGE */}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {/* SIGNUP BUTTON */}
        <button
          onClick={handleSignup}
          className="mt-10 w-80 bg-[#C43A2D] hover:bg-[#A83226] text-white py-3 rounded-xl text-lg font-semibold transition"
        >
          Sign up
        </button>

        {/* LOGIN LINK */}
        <p className="mt-4 text-black text-sm">
          Already have an account?{" "}
          <span
            className="font-bold cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Sign in
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
