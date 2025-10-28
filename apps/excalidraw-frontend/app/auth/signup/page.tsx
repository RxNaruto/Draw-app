"use client"

import { useState } from "react"
import axios, { Axios } from "axios";



export default function Signin(){

const[username,setUsername]= useState("");
const[password,setPassword] = useState("");
const[name,setName] = useState("");

const signUpData=async()=>{

 const res = await axios.post("http://localhost:3005/signup",{
    username,
    password,
    name
 })
  console.log(res);
}
return <div>
    <input type="text" name="Username" placeholder="JhonDoe@mail.com" onChange={(e)=>{
        setUsername(e.target.value);
    }}/>
    <input type="password" name="password" onChange={(e)=>{
        setPassword(e.target.value);
    }} />
    <input type="text" name="Name" placeholder="Jhon Doe" onChange={(e)=>{
        setName(e.target.value);
    }}/>

    <button onClick={signUpData}>Sign In</button>

</div>
}