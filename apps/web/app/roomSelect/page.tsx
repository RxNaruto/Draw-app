"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Cookies from "js-cookie";

export default function Home() {
  const [roomId,setRoomId] = useState("");
  const router = useRouter();

  async function roomCreating(){
    console.log("button clicked")
    const token = Cookies.get("jwt");
    if(!token){
      alert("Not signed in");
            return;
    }

    const res = await axios.post(`${BACKEND_URL}/room`,{name: roomId},{
      headers: {
        'Authorization': token
      }
      
    })
    if(res.status===200){
      alert("Success");
      console.log(res);
    }
    
    
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw"
    }}>
    <div >
      <input style={{
        padding: 10
      }} type="text" placeholder="Room name" value={roomId} onChange={(e)=>{
        setRoomId(e.target.value);
      }} />
      <button style={{
        padding: 10
      }} onClick={()=>{
        router.push(`/room/${roomId}`)
      }}>Join Room</button>
    </div>

    <input type="text" placeholder="Room name" value={roomId} onChange={(e)=>{
      setRoomId(e.target.value)
    }}/>
    <button style={{
        padding: 10
      }} onClick={()=>{
        roomCreating()
      }}>Create Room</button>

    
    
    
    /</div>
  );
}
