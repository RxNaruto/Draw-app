"use client";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Pencil, RectangleHorizontal, Circle } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "pencil";

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
  return (
    <div style={{ position: "fixed", top: 10, left: 10, display: "flex", gap: "10px" }}>
      <IconButton
        Icon={<Pencil />}
        onClick={() => setSelectedTool("pencil")}
        activated={selectedTool === "pencil"}
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
    </div>
  );
}
