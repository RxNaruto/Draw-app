"use client";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock, House } from "lucide-react";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signinData = async () => {
    try {
      const res = await axios.post("http://localhost:3005/signin", {
        username,
        password,
      });

      const token = res.data.token;
      if (!token) {
        alert("Invalid credentials");
        return;
      }

      Cookies.set("jwt", token);
      alert("Sign in success");
      router.push("/");
    } catch (err) {
      alert("Error signing in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffef7] relative flex items-center justify-center overflow-hidden">
      {/* 🌈 Background Pattern */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e3e8ef" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* 🏠 Back to Home */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-8 right-10 inline-flex items-center gap-2 px-5 py-2 border-2 border-[#6965db] rounded-xl text-[#6965db] font-bold hover:bg-[#f7f7ff] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 z-20"
      >
        <House className="h-5 w-5" />
        Home
      </button>

      {/* 💫 Main Card */}
      <div className="relative z-10 w-[95%] max-w-2xl bg-white border-4 border-[#2d3748] rounded-3xl shadow-2xl p-10 md:p-14 transform rotate-1">
        {/* Decorative Dots */}
        <div className="absolute top-6 right-6 flex gap-2">
          <div className="w-4 h-4 rounded-full bg-[#fc5c65]"></div>
          <div className="w-4 h-4 rounded-full bg-[#ffa502]"></div>
          <div className="w-4 h-4 rounded-full bg-[#26de81]"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-[#6965db]/10 to-[#a594f9]/10 border-2 border-[#6965db] shadow-md mb-4">
            <LogIn className="h-8 w-8 text-[#6965db]" />
          </div>
          <h1 className="text-5xl font-black text-[#2d3748] mb-3">
            Sign <span className="text-[#6965db]">In</span>
          </h1>
          <p className="text-[#4a5568] font-medium text-lg">
            Welcome back! Access your workspace below.
          </p>
        </div>

        {/* Input Fields (Reduced Width) */}
        <div className="flex flex-col gap-6 mb-8 items-center">
          <div className="w-[80%] flex items-center border-2 border-[#6965db] rounded-xl px-5 py-3 bg-white shadow-sm focus-within:ring-4 focus-within:ring-[#6965db]/20 transition-all">
            <Mail className="h-5 w-5 text-[#6965db] mr-3" />
            <input
              type="text"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent outline-none text-[#2d3748] font-medium"
            />
          </div>

          <div className="w-[80%] flex items-center border-2 border-[#6965db] rounded-xl px-5 py-3 bg-white shadow-sm focus-within:ring-4 focus-within:ring-[#6965db]/20 transition-all">
            <Lock className="h-5 w-5 text-[#6965db] mr-3" />
            <input
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-[#2d3748] font-medium"
            />
          </div>
        </div>

        {/* Sign In Button */}
        <div className="flex justify-center">
          <button
            onClick={signinData}
            className="w-[80%] py-4 bg-[#6965db] text-white font-bold rounded-xl hover:bg-[#5753c3] transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <LogIn className="h-5 w-5" />
            Sign In
          </button>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-[#e2e8f0] my-10"></div>

        {/* Signup redirect */}
        <div className="text-center">
          <p className="text-[#4a5568] font-medium mb-3">
            Don’t have an account?
          </p>
          <button
            onClick={() => router.push("/auth/signup")}
            className="px-6 py-3 border-2 border-[#6965db] rounded-xl text-[#6965db] font-bold hover:bg-[#f7f7ff] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
