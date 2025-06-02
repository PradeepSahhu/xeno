"use client";
import Query from "@/Components/Query";

export default function Home() {
  //   await Auth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="">
        <Query path={`./campaignHistory`} />
      </div>

      <div className="bg-white h-[100vh] text-white">This is the home page</div>

      {/* form with drag and drop */}
    </div>
  );
}
