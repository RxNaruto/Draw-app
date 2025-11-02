"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PenTool, Users, Zap, Palette, ArrowRight, Sparkles, Circle, Square, Triangle } from "lucide-react";
import { Appbar } from "../components/Appbar";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

   useEffect(() => {
    const updateLoginStatus = () => {
      const token = Cookies.get("jwt");
      setIsLoggedIn(!!token);
    };

    updateLoginStatus(); // Initial check
    window.addEventListener("authChange", updateLoginStatus); // 🔹 Listen for auth changes

    return () => {
      window.removeEventListener("authChange", updateLoginStatus);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fffef7] relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e3e8ef" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div className="relative z-10">
        <Appbar />

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 relative">
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#ffeaa7]/30 rounded-full blur-3xl"></div>
              <div className="absolute top-10 right-1/4 w-40 h-40 bg-[#a594f9]/20 rounded-full blur-3xl"></div>

              <div className="relative inline-block mb-6">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#6965db]/10 via-[#a594f9]/10 to-[#45aaf2]/10 rounded-3xl blur-xl"></div>
                <div className="relative flex items-center gap-3 px-6 py-3 bg-white border-2 border-[#6965db] rounded-full shadow-lg">
                  <Sparkles className="h-5 w-5 text-[#ffa502]" />
                  <span className="text-sm font-semibold text-[#2d3748]">Collaborative Drawing Made Simple</span>
                </div>
              </div>

              <h1 className="text-6xl md:text-7xl font-black text-[#2d3748] mb-6 leading-tight relative">
                <span className="inline-block transform -rotate-1">Create</span>{" "}
                <span className="inline-block transform rotate-2 text-[#6965db]">Together,</span>
                <br />
                <span className="inline-block transform -rotate-1">Draw</span>{" "}
                <span className="inline-block transform rotate-1 relative">
                  Better
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 2 150 2 198 10" stroke="#fc5c65" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-[#4a5568] mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
                The most intuitive collaborative whiteboard for teams who love to create.
                Sketch, brainstorm, and visualize ideas together in real-time.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button className="group px-8 py-4 bg-[#6965db] text-white font-bold rounded-xl hover:bg-[#5753c3] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2">
                  <span>Start Drawing Free</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white text-[#6965db] font-bold rounded-xl border-2 border-[#6965db] hover:bg-[#f7f7ff] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-[#718096]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fc5c65] to-[#fd79a8] border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#45aaf2] to-[#4bcffa] border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#26de81] to-[#20bf6b] border-2 border-white"></div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffa502] to-[#ff7979] border-2 border-white"></div>
                  </div>
                  <span className="font-semibold text-[#2d3748]">10k+ creators</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-[#cbd5e0]"></div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#ffa502]">★</span>
                    ))}
                  </div>
                  <span className="font-semibold text-[#2d3748]">5.0 rating</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-20">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6965db] to-[#a594f9] rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform"></div>
                <div className="relative bg-white border-3 border-[#2d3748] rounded-2xl p-8 transform -rotate-1 group-hover:rotate-0 transition-all shadow-xl hover:shadow-2xl">
                  <div className="inline-flex p-4 bg-gradient-to-br from-[#6965db]/10 to-[#a594f9]/10 rounded-2xl mb-6 border-2 border-[#6965db]">
                    <Users className="h-10 w-10 text-[#6965db]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2d3748] mb-3">
                    Real-time Magic
                  </h3>
                  <p className="text-[#4a5568] leading-relaxed font-medium">
                    See cursors, changes, and creativity flow in real-time. Collaborate like you're in the same room.
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#45aaf2] to-[#4bcffa] rounded-2xl transform -rotate-2 group-hover:-rotate-3 transition-transform"></div>
                <div className="relative bg-white border-3 border-[#2d3748] rounded-2xl p-8 transform rotate-1 group-hover:rotate-0 transition-all shadow-xl hover:shadow-2xl">
                  <div className="inline-flex p-4 bg-gradient-to-br from-[#45aaf2]/10 to-[#4bcffa]/10 rounded-2xl mb-6 border-2 border-[#45aaf2]">
                    <Zap className="h-10 w-10 text-[#45aaf2]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2d3748] mb-3">
                    Lightning Fast
                  </h3>
                  <p className="text-[#4a5568] leading-relaxed font-medium">
                    Zero lag, instant sync. Your ideas flow at the speed of thought with our optimized engine.
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#26de81] to-[#20bf6b] rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform"></div>
                <div className="relative bg-white border-3 border-[#2d3748] rounded-2xl p-8 transform -rotate-1 group-hover:rotate-0 transition-all shadow-xl hover:shadow-2xl">
                  <div className="inline-flex p-4 bg-gradient-to-br from-[#26de81]/10 to-[#20bf6b]/10 rounded-2xl mb-6 border-2 border-[#26de81]">
                    <Palette className="h-10 w-10 text-[#26de81]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2d3748] mb-3">
                    Infinite Canvas
                  </h3>
                  <p className="text-[#4a5568] leading-relaxed font-medium">
                    Unlimited space for unlimited ideas. Draw, sketch, and create without boundaries.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6965db] via-[#a594f9] to-[#45aaf2] rounded-3xl transform rotate-1"></div>
              <div className="relative bg-white border-4 border-[#2d3748] rounded-3xl p-12 md:p-16 shadow-2xl transform -rotate-1">
                <div className="absolute top-8 right-8 flex gap-2">
                  <Circle className="h-6 w-6 text-[#fc5c65] fill-[#fc5c65]" />
                  <Square className="h-6 w-6 text-[#ffa502] fill-[#ffa502]" />
                  <Triangle className="h-6 w-6 text-[#26de81] fill-[#26de81]" />
                </div>

                <div className="text-center max-w-3xl mx-auto">
                  {isLoggedIn ? (
                    <>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#26de81] text-white font-bold rounded-full mb-6 border-2 border-[#2d3748]">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm">YOU'RE LOGGED IN</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black text-[#2d3748] mb-6">
                        Ready to Create?
                      </h2>
                      <p className="text-xl text-[#4a5568] mb-8 font-medium">
                        Your canvas awaits. Jump into a room and start collaborating with your team right now.
                      </p>
                      <button
                        onClick={() => router.push("/roomSelect")}
                        className="group px-10 py-5 bg-[#6965db] text-white font-bold text-lg rounded-xl hover:bg-[#5753c3] transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center gap-3"
                      >
                        <span>Enter Room Selection</span>
                        <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fc5c65] text-white font-bold rounded-full mb-6 border-2 border-[#2d3748]">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-sm">AUTHENTICATION REQUIRED</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black text-[#2d3748] mb-6">
                        Join the Community
                      </h2>
                      <p className="text-xl text-[#4a5568] mb-8 font-medium">
                        Sign in to unlock collaborative rooms and start creating with teams around the world.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="group px-10 py-5 bg-[#6965db] text-white font-bold text-lg rounded-xl hover:bg-[#5753c3] transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center gap-3">
                          <span>Sign Up Free</span>
                          <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                        <button className="px-10 py-5 bg-white text-[#6965db] font-bold text-lg rounded-xl border-2 border-[#6965db] hover:bg-[#f7f7ff] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                          Sign In
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-12 pt-8 border-t-2 border-[#e2e8f0]">
                  <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                    <div className="flex items-center gap-2 text-[#4a5568] font-medium">
                      <div className="w-5 h-5 bg-[#26de81] rounded-full flex items-center justify-center border-2 border-[#2d3748]">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4a5568] font-medium">
                      <div className="w-5 h-5 bg-[#26de81] rounded-full flex items-center justify-center border-2 border-[#2d3748]">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span>Free forever plan</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4a5568] font-medium">
                      <div className="w-5 h-5 bg-[#26de81] rounded-full flex items-center justify-center border-2 border-[#2d3748]">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span>Unlimited boards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t-2 border-[#6965db] bg-white/80 backdrop-blur-sm mt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#6965db] to-[#a594f9] rounded-lg rotate-3 flex items-center justify-center">
                  <PenTool className="h-5 w-5 text-white -rotate-3" strokeWidth={2.5} />
                </div>
                <span className="text-[#4a5568] font-medium">Made by Rithk Chaudhary.</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-[#4a5568] font-medium">
                <button className="hover:text-[#6965db] transition-colors">Privacy</button>
                <button className="hover:text-[#6965db] transition-colors">Terms</button>
                <button className="hover:text-[#6965db] transition-colors">Contact</button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
