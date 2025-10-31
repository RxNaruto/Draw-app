"use client"
import { redirect } from "next/navigation";
import Cookies from "js-cookie"; "js-cookie"
export default function Home() {
      const token = Cookies.get("jwt");
      if (!token) {
            return <div>
                  Home page
                  You are not signed in sign in first to Access the Room Section
            </div>
      }
      else {
            return <div>
                  Home Page
                  <button onClick={() => {
                        redirect("/roomSelect");
                  }}>Room Section</button>
            </div>
      }

}
