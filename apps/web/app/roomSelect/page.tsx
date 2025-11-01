"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Cookies from "js-cookie";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [allroom, setAllRooms] = useState<{
    id: number;
    slug: string;
  }[]>([])
  const router = useRouter();

  async function roomCreating() {
    console.log("button clicked")
    const token = Cookies.get("jwt");
    if (!token) {
      alert("Not signed in");
      return;
    }

    const res = await axios.post(`${BACKEND_URL}/room`, { name: roomId }, {
      headers: {
        'Authorization': token
      },
      validateStatus: () => true

    })
    if (res.status === 200) {
      alert("Success");
      console.log(res);

    }
    else if (res.status === 411) {
      alert("Room with same name already exist");
    }


  }
  async function getAllRooms() {
    const token = await Cookies.get("jwt");
    const res = await axios.get(`${BACKEND_URL}/allRooms`, {
      headers: {
        'Authorization': token
      },
      validateStatus: () => true

    })
    if (res.status===200 && res.data.rooms?.length>0) {
      setAllRooms(res.data.rooms[0].rooms);
    }
  }

  useEffect(() => {
    getAllRooms();
  }, [])

  return (
    <div>
      <div>
        <h3>All rooms</h3>
        {allroom.length>0?(
<ul>
          {allroom.map((room:any)=>(
            <li key={room.id} onClick={()=>{
              router.push(`/room/${room.slug}`)
            }}>
              {room.slug}
            </li>
          ))}
        </ul>
        ):(
         <p>No rooms found</p>
        )}
      
      </div>
      <div>

        <input style={{
          padding: 10
        }} type="text" placeholder="Room name" value={roomId} onChange={(e) => {
          setRoomId(e.target.value);
        }} />
        <button style={{
          padding: 10
        }} onClick={() => {
          router.push(`/room/${roomId}`)
        }}>Join Room</button>
      </div>

      <input type="text" placeholder="Room name" value={roomId} onChange={(e) => {
        setRoomId(e.target.value)
      }} />
      <button style={{
        padding: 10
      }} onClick={() => {
        roomCreating()
      }}>Create Room</button>




      /</div>
  );
}
