"use client"
export function AuthPage({isSignin}: {
    isSignin: Boolean
 }){
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-10 m-2 bg-white rounded">
            <div>
            <input type="text" placeholder="Email"></input>
            </div>
            <div>
            <input type="password" placeholder="password" ></input>
            </div>
            <div className="pt-2">
            <button onClick={()=>{

            }}>{isSignin? "Sign in" : "Sign up"}</button>
            </div>
        </div>
    </div>
 }