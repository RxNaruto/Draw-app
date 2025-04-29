"use client"
import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
export function RoomCanvas({roomId}: {roomId: string}){
    const [socket,setSocket] = useState<WebSocket | null>(null);
    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZDBhMzU0ZS1hNGE5LTRhNDAtYmM3NC0zM2QxOGRlNDZjYjEiLCJpYXQiOjE3NDU5MzE5MjB9.pDs11fyBR74x0K200mHZsH0BrrxRf5H-HmX6SzwtpqY`)


        ws.onopen=()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId
            }))
        }
    },[])

    if(!socket){
        return <div>
            connecting to the server...
        </div>
    }
    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}