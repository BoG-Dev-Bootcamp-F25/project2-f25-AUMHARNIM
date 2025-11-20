"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TrainingCard from "../../../components/TrainingCard";

export default function TrainingDashboard() {
  const router = useRouter();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch logs on mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    async function fetchLogs() {
      setLoading(true);
      const res = await fetch(`/api/training/single?userId=${userId}`);

      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      } else {
        console.error("Failed to fetch logs");
      }

      setLoading(false);
    }

    fetchLogs();
  }, []);

  function goToCreate() {
    router.push("/dashboard/training/create");
  }

  return (
    <div className="px-10 pt-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Training Logs</h1>

        <button
          onClick={goToCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + Create Training Log
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-500">No training logs yet. Create one!</p>
      ) : (
        <div className="flex flex-col gap-6">
          {logs.map((log) => (
            <TrainingCard key={log._id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
}
