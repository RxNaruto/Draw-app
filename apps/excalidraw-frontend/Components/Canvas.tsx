"use client";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Slash, RectangleHorizontal, Circle, Triangle, Pencil, DoorClosed, DoorOpen } from "lucide-react";
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
      <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  const router = useRouter();
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
        right: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* --- Drawing Tools --- */}
      <div style={{ display: "flex", gap: "10px" }}>
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
      <button
        onClick={() => router.back()}
        className="pointer rounded-full border p-2 bg-white hover:bg-amber-100 flex items-center justify-center"
        title="Leave Room"
      >
        <DoorClosed className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
}

