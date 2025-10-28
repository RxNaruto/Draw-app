"use client"

import { useState } from "react"
import axios from "axios";
import Cookies from "js-cookie"
export default function Signin(){

const[username,setUsername]= useState("");
const[password,setPassword] = useState("");

const signinData=async()=>{

 const res = await axios.post("http://localhost:3005/signin",{
    username,
    password
    
 })
 const token = res.data.token;
 Cookies.set("jwt",token);
 alert("Sign in success")
  console.log(res.data.token);
}
return <div>
    <input type="text" name="Username" placeholder="JhonDoe@mail.com" onChange={(e)=>{
        setUsername(e.target.value);
    }}/>
    <input type="password" name="password" onChange={(e)=>{
        setPassword(e.target.value);
    }} />

    <button onClick={signinData}>Sign In</button>

</div>
}