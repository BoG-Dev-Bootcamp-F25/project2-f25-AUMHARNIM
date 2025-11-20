import Image from "next/image";

export default function TrainingCard() {
  return (
    <div className="w-full flex bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden p-4 items-center">

      {/* LEFT DATE BLOCK */}
      <div className="bg-[#2E317C] text-white w-24 h-24 rounded-lg flex flex-col items-center justify-center mr-6">
        <div className="text-3xl font-bold">20</div>
        <div className="text-sm -mt-1">Oct • 2023</div>
      </div>

      {/* MIDDLE CONTENT */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-lg text-black">Complete sit lessons</h2>
          <span className="text-gray-400 text-sm">• 20 hours</span>
        </div>

        <div className="text-sm text-gray-500">
          Long Lam • Golden Retriever • Lucy
        </div>

        <p className="text-sm text-gray-700 mt-1">
          Lucy finishes the sit lessons very well today. Should give her a treat
        </p>
      </div>

      {/* RIGHT EDIT BUTTON */}
      <div>
        <div className="h-12 w-12 bg-[#C43A2D] rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-[#A83226]">
          <Image src="/images/activeTrainingLogo.png" alt="" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}
