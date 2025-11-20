"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email,
        password,
        isAdmin,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    router.push("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8">

      <h1 className="text-4xl font-bold mb-10">Create Account</h1>

      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-8 w-full max-w-lg"
      >
        {/* Full Name */}
        <div className="flex flex-col">
          {fullName && <label className="text-gray-600 mb-1">Full Name</label>}
          <input
            type="text"
            placeholder="Full Name"
            className="border-b-2 border-red-400 p-2 focus:outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          {email && <label className="text-gray-600 mb-1">Email</label>}
          <input
            type="email"
            placeholder="Email"
            className="border-b-2 border-red-400 p-2 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          {password && <label className="text-gray-600 mb-1">Password</label>}
          <input
            type="password"
            placeholder="Password"
            className="border-b-2 border-red-400 p-2 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          {confirmPassword && (
            <label className="text-gray-600 mb-1">Confirm Password</label>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            className="border-b-2 border-red-400 p-2 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Admin Checkbox */}
        <label className="flex items-center gap-2 mt-2 text-gray-700">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="w-4 h-4"
          />
          Admin access
        </label>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center text-sm -mt-4">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition"
        >
          Sign up
        </button>

        {/* Redirect */}
        <p className="text-center mt-2">
          Already have an account?{" "}
          <span
            className="text-red-600 cursor-pointer font-semibold"
            onClick={() => router.push("/login")}
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
}
