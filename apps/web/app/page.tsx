"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId,setRoomId] = useState("");
  const router = useRouter();
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw"
    }}>
    <div className={styles.page}>
      <input style={{
        padding: 10
      }} type="text" placeholder="Room id" value={roomId} onChange={(e)=>{
        setRoomId(e.target.value);
      }} />
      <button style={{
        padding: 10
      }} onClick={()=>{
        router.push(`/room/${roomId}`)
      }}>Join Room</button>
    </div>
    /</div>
  );
}
