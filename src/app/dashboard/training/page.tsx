import TrainingCard from "../../../components/TrainingCard";

export default function TrainingDashboard() {
  return (
    <div>
      <h1 className="text-xl font-bold text-black mb-6">Training logs</h1>

      <div className="flex flex-col gap-6">
        <TrainingCard />
        <TrainingCard />
        <TrainingCard />
        <TrainingCard />
      </div>
    </div>
  );
}
