"use client";

interface TrainingCardProps {
  log: {
    _id: string;
    title: string;
    description: string;
    hours: number;
    date: string;
    animalName: string;
    animalBreed: string;
    userName: string;
  };
}

export default function TrainingCard({ log }: TrainingCardProps) {
  const dateObj = new Date(log.date);
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return (
    <div className="flex items-center w-full bg-white rounded-xl border shadow p-4 gap-6">
      
      {/* DATE BOX */}
      <div className="bg-[#2D2E83] text-white rounded-xl px-6 py-4 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold">{day}</span>
        <span className="uppercase text-sm">{month}</span>
        <span className="text-xs">{year}</span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1">
        
        {/* TITLE + HOURS */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">{log.title}</h2>
          <span className="text-gray-500 text-sm">• {log.hours} hours</span>
        </div>

        {/* USER + ANIMAL */}
        <p className="text-sm text-gray-500">
          {log.userName} • {log.animalBreed} • {log.animalName}
        </p>

        {/* DESCRIPTION */}
        <p className="mt-2 text-gray-700">{log.description}</p>
      </div>
    </div>
  );
}
