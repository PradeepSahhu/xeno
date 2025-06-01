// "use client";
// import Query from "@/Components/Query";
// import { useUser } from "@/Components/userContext";
// import Link from "next/link";

// export default function Home() {
//   const user = useUser();

//   const googleAuthConnection = async () => {
//     window.location.href = "http://localhost:4000/auth/googles/";
//     console.log(user);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 relative overflow-hidden">
//       {/* Background grid pattern */}
//       <div className="absolute inset-0 bg-grid-small [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-10" />

//       {/* Content */}
//       <div className="relative z-10 flex items-center justify-start h-screen px-12">
//         <div className="max-w-lg w-full space-y-2 animate-fade-in">
//           <h1 className="text-4xl font-bold text-gray-800">
//             Welcome to the <span className="text-red-600">CRM</span>
//           </h1>

//           {!user ? (
//             <div>
//               <p className="text-lg text-gray-600">
//                 Sign in to continue using your Google account.
//               </p>
//               <button
//                 onClick={googleAuthConnection}
//                 className="bg-red-600 text-white text-lg px-8 py-4 rounded-2xl shadow-lg hover:bg-red-700 transition-all transform hover:scale-105 w-full max-w-sm text-left"
//               >
//                 Login with Google
//               </button>
//             </div>
//           ) : (
//             <button className="bg-green-600 text-white text-lg px-3 py-4 rounded-2xl shadow-lg w-full max-w-sm text-left">
//               Welcome Back
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import Query from "@/Components/Query";
import { useUser } from "@/Components/userContext";
import Link from "next/link";

export default function Home() {
  const user = useUser();

  const googleAuthConnection = async () => {
    window.location.href = "http://localhost:4000/auth/googles/";
    console.log(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-small [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-10" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-red-200 rounded-lg opacity-30 animate-bounce delay-100"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-red-300 rounded-full opacity-25 animate-ping delay-300"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-red-100 rounded-lg opacity-20 animate-pulse delay-500"></div>

        {/* Gradient orbs */}
        <div className="absolute top-1/3 right-10 w-40 h-40 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-30 blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 left-20 w-60 h-60 bg-gradient-to-r from-red-100 to-orange-100 rounded-full opacity-20 blur-2xl animate-float-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-start h-screen px-12">
        <div className="max-w-lg w-full space-y-8 animate-fade-in-up">
          {/* Logo/Brand section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg animate-bounce-gentle">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium text-gray-500 tracking-wider uppercase animate-fade-in delay-200">
                Business Suite
              </div>
            </div>

            <h1 className="text-5xl font-bold text-gray-800 leading-tight animate-fade-in-up delay-300">
              Welcome to the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 animate-gradient-shift">
                CRM
              </span>
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mt-4 animate-expand-width"></div>
          </div>

          {/* Auth section */}
          <div className="space-y-6 animate-fade-in-up delay-500">
            {!user ? (
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed animate-fade-in delay-700">
                  Sign in to continue using your Google account and unlock
                  powerful CRM features.
                </p>

                <button
                  onClick={googleAuthConnection}
                  className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full max-w-sm overflow-hidden animate-fade-in-up delay-900"
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shine"></div>

                  <div className="relative flex items-center justify-center space-x-3">
                    <svg
                      className="w-5 h-5 animate-bounce-gentle"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-semibold">Continue with Google</span>
                  </div>
                </button>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 animate-fade-in delay-1000">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Secure</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
                    <span>Fast</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                    <span>Reliable</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in-up delay-700">
                <Link href="./campaignCreation">
                  <button className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full max-w-sm overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:animate-shine"></div>

                    <div className="relative flex items-center justify-center space-x-3">
                      <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                      <span className="font-semibold">Welcome Back</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
