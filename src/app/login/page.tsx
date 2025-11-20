"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("userId", data.id);
    localStorage.setItem("fullName", data.fullName);
    localStorage.setItem("isAdmin", data.isAdmin ? "true" : "false");

    router.push("/dashboard/training");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">

      {/* CARD */}
      <div className="w-full max-w-lg bg-white p-10 rounded-xl shadow-xl border">

        <h1 className="text-4xl font-bold text-center mb-10">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          
          <div className="flex flex-col">
            {email && <label className="text-sm text-gray-700 mb-1">Email</label>}
            <input
              type="email"
              placeholder={email ? "" : "Email"}
              className="border-b-2 border-red-500 p-2 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            {password && <label className="text-sm text-gray-700 mb-1">Password</label>}
            <input
              type="password"
              placeholder={password ? "" : "Password"}
              className="border-b-2 border-red-500 p-2 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-red-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition"
          >
            Log in
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-red-600 cursor-pointer font-semibold"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
