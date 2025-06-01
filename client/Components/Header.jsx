"use client";

import { useState, useEffect } from "react";
import { useUser } from "./userContext";
import Link from "next/link";

const Header = () => {
  const user = useUser();
  // const [user, setUser] = useState(null);

  useEffect(() => {
    //   fetch("http://localhost:4000/profile", {
    //     credentials: "include",
    //   })
    //     .then((res) => {
    //       if (!res.ok) throw new Error("Not logged in");
    //       return res.json();
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       setUser(data);
    //     })
    //     .catch((err) => console.error(err));
    // console.log(us.name);
    // setUser(us.name);
  }, []);
  return (
    <div className="bg-white border-b border-gray-200">
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
            <div className="flex gap-x-3 text-white">
              <Link
                href="./"
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
              >
                {/* Shine effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shine"></div>

                <div className="relative flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="font-semibold">Home</span>
                </div>
              </Link>

              {user && (
                <Link
                  href="./campaignCreation"
                  className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden animate-fade-in-up delay-100"
                >
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shine"></div>

                  <div className="relative flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="font-semibold">Creation</span>
                  </div>
                </Link>
              )}

              {user && (
                <Link
                  href={"./campaignHistory"}
                  className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden animate-fade-in-up delay-200"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shine"></div>

                  <div className="relative flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold">History</span>

                    <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse opacity-75"></div>
                  </div>
                </Link>
              )}
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <p>{user ? user.name : "Not Logged in"}</p>
            </button>
            <img
              className="w-8 h-8 bg-gray-300 rounded-full"
              src={user ? user.profileImage : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
