import { initDraw } from "@/draw";
import { useEffect,useRef } from "react";

export function Canvas({roomId,socket}:{roomId: string; socket: WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(()=>{
        if(canvasRef.current){
            initDraw(canvasRef.current,roomId,socket);
    
        }


    },[canvasRef])
    return <div>
        <canvas width={2000} height={1000} ref={canvasRef}></canvas>
        <div className="absolute bottom-0 right-0">
            <button className="bg-white text-black">Rectangle</button>
            <button className="bg-white text-black">Circle</button>
        </div>
    </div>
} 