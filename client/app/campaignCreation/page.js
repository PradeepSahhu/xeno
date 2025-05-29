"use client";
import Query from "@/Components/Query";

export default async function Home() {
  //   await Auth();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center px-5 py-2">
                  <span className="text-white font-bold text-sm ">CRM</span>
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  Customer Relationship Management
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <p>Profile</p>
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="">
        <Query />
      </div>

      <div className="bg-white h-[100vh] text-white">This is the home page</div>

      {/* form with drag and drop */}
    </div>
  );
}
