"use client";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {
  Slash,
  RectangleHorizontal,
  Circle,
  Triangle,
  Pencil,
  DoorOpen,
} from "lucide-react";
import { Game } from "@/draw/Game";
import { useRouter } from "next/navigation";

export type Tool = "circle" | "rect" | "line" | "triangle" | "pencil";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");

  useEffect(() => {
    if (canvasRef.current && !gameRef.current) {
      gameRef.current = new Game(canvasRef.current, roomId, socket);
    }

    return () => {
      gameRef.current?.destroy();
      gameRef.current = null;
    };
  }, [roomId, socket]);

  useEffect(() => {
    gameRef.current?.setTool(selectedTool);
  }, [selectedTool]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
      />
      <Sidebar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
      <LeaveButton />
    </div>
  );
}

function Sidebar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div
      className="fixed top-1/2 left-6 -translate-y-1/2 flex flex-col items-center gap-4 p-4 
                 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg"
    >
      <IconButton
        Icon={<Slash />}
        onClick={() => setSelectedTool("line")}
        activated={selectedTool === "line"}
      />
      <IconButton
        Icon={<RectangleHorizontal />}
        onClick={() => setSelectedTool("rect")}
        activated={selectedTool === "rect"}
      />
      <IconButton
        Icon={<Circle />}
        onClick={() => setSelectedTool("circle")}
        activated={selectedTool === "circle"}
      />
      <IconButton
        Icon={<Triangle />}
        onClick={() => setSelectedTool("triangle")}
        activated={selectedTool === "triangle"}
      />
      <IconButton
        Icon={<Pencil />}
        onClick={() => setSelectedTool("pencil")}
        activated={selectedTool === "pencil"}
      />
    </div>
  );
}

function LeaveButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-8 right-10 inline-flex items-center gap-2 px-5 py-2 
                 border-2 border-[#6965db] rounded-xl text-[#6965db] font-bold 
                 hover:bg-[#f7f7ff] transition-all shadow-md hover:shadow-lg 
                 transform hover:-translate-y-0.5 backdrop-blur-md bg-white"
      title="Leave Room"
    >
      <DoorOpen className="h-5 w-5" />
      Leave
    </button>
  );
}
