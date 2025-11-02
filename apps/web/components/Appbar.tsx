"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { PenTool, LogOut, LogIn } from "lucide-react";

export const Appbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("jwt");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/auth/signin");
    window.dispatchEvent(new Event("authChange"));
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <nav className="border-b-2 border-[#6965db] bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6965db] to-[#a594f9] rounded-lg rotate-3 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <PenTool className="h-6 w-6 text-white -rotate-3" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#fc5c65] rounded-full border-2 border-white"></div>
            </div>
            <h1 className="text-2xl font-bold text-[#2d3748] group-hover:text-[#6965db] transition-colors">DrawBoard</h1>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* <button className="px-4 py-2 text-[#6965db] font-medium hover:bg-[#f7f7ff] rounded-lg transition-colors">
                  Dashboard
                </button> */}
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-[#6965db] text-white font-medium rounded-lg hover:bg-[#5753c3] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-[#6965db] font-medium hover:bg-[#f7f7ff] rounded-lg transition-colors"
                >
                  Sign In
                </button> */}
                <button 
                onClick={handleLogin}
                className="px-6 py-2 bg-[#6965db] text-white font-medium rounded-lg hover:bg-[#5753c3] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
