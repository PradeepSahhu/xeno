"use client";

import { useState, useEffect } from "react";
import { useUser } from "./userContext";

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
