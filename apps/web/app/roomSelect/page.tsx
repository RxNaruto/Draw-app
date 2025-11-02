"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Cookies from "js-cookie";
import { Plus, DoorOpen, ArrowRight, House, Users } from "lucide-react";

export default function Home() {
  const token = Cookies.get("jwt");
  const [roomId, setRoomId] = useState("");
  const [allroom, setAllRooms] = useState<{ id: number; slug: string }[]>([]);
  const router = useRouter();

  async function roomCreating() {
    console.log("button clicked");
    const token = Cookies.get("jwt");
    if (!token) {
      alert("Not signed in");
      return;
    }

    const res = await axios.post(
      `${BACKEND_URL}/room`,
      { name: roomId },
      {
        headers: {
          Authorization: token,
        },
        validateStatus: () => true,
      }
    );
    if (res.status === 200) {
      alert("Success");
      console.log(res);
    } else if (res.status === 411) {
      alert("Room with same name already exist");
    }
  }

  async function getAllRooms() {
    const token = await Cookies.get("jwt");
    const res = await axios.get(`${BACKEND_URL}/allRooms`, {
      headers: {
        Authorization: token,
      },
      validateStatus: () => true,
    });
    if (res.status === 200 && res.data.rooms?.length > 0) {
      setAllRooms(res.data.rooms[0].rooms);
    }
  }

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <div className="min-h-screen bg-[#fffef7] relative overflow-hidden flex flex-col items-center justify-center px-4 py-10">
      {/* 🌈 Background Pattern */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e3e8ef" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* 💫 Main Container */}
      <div className="relative z-10 max-w-4xl w-full bg-white border-4 border-[#2d3748] rounded-3xl shadow-2xl p-10 md:p-14 transform -rotate-1">
        <div className="absolute top-6 right-6 flex gap-2">
          <div className="w-4 h-4 rounded-full bg-[#fc5c65]"></div>
          <div className="w-4 h-4 rounded-full bg-[#ffa502]"></div>
          <div className="w-4 h-4 rounded-full bg-[#26de81]"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-[#2d3748] mb-4">
            Room <span className="text-[#6965db]">Selection</span>
          </h1>
          <p className="text-lg text-[#4a5568] font-medium">
            Choose an existing room or create your own collaborative space.
          </p>
        </div>

        {/* Room List */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#2d3748] mb-4 flex items-center gap-2">
            <Users className="h-6 w-6 text-[#6965db]" />
            All Rooms
          </h3>

          {allroom.length > 0 ? (
            <ul className="grid md:grid-cols-2 gap-4">
              {allroom.map((room: any) => (
                <li
                  key={room.id}
                  onClick={() => {
                    router.push(`/room/${room.slug}`);
                  }}
                  className="cursor-pointer bg-gradient-to-br from-[#6965db]/10 to-[#a594f9]/10 border-2 border-[#6965db] rounded-xl p-5 hover:bg-[#f7f7ff] hover:shadow-lg transition-all flex items-center justify-between group"
                >
                  <span className="font-semibold text-[#2d3748]">{room.slug}</span>
                  <ArrowRight className="h-5 w-5 text-[#6965db] group-hover:translate-x-1 transition-transform" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#718096] italic mt-4">No rooms found</p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t-2 border-[#e2e8f0] my-10"></div>

        {/* Room Input + Join/Create */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-center">
          <input
            type="text"
            placeholder="Enter room name..."
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            className="w-full md:w-1/2 px-6 py-4 border-2 border-[#6965db] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#6965db]/30 text-[#2d3748] font-medium"
          />

          <div className="flex gap-4">
            <button
              onClick={() => {
                router.push(`/room/${roomId}`);
              }}
              className="px-6 py-4 bg-[#26de81] text-white font-bold rounded-xl hover:bg-[#20bf6b] transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <DoorOpen className="h-5 w-5" />
              Join Room
            </button>

            <button
              onClick={() => {
                roomCreating();
              }}
              className="px-6 py-4 bg-[#6965db] text-white font-bold rounded-xl hover:bg-[#5753c3] transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Room
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#6965db] rounded-xl text-[#6965db] font-bold hover:bg-[#f7f7ff] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <House className="h-5 w-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
