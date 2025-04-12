import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNzZjYTcyZi00OThlLTQ2ZTItOWU3OS03Y2RiNGMwMjBlMjMiLCJpYXQiOjE3NDQxMTgzNTB9.lTYVwIDZzVtwEneF58HdbIVuqhc88oHiWMyMQNCPahE`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}