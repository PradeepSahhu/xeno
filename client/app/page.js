"use client";
import Query from "@/Components/Query";
import Link from "next/link";

export default function Home() {
  const googleAuthConnection = async () => {
    window.location.href = "http://localhost:4000/auth/googles/";
    console.log(user);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen flex justify-center ">
        <div className=" align-middle">
          <button
            className="bg-red-600 px-5 py-2 rounded-xl"
            onClick={googleAuthConnection}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
