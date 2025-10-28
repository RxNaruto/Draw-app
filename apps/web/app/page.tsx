"use client"
import { redirect } from "next/navigation";

export default function Home() {
 return <div>
       Home Page
       <button onClick={()=>{
        redirect("/roomSelect");
       }}>Room Section</button>
 </div>
}
