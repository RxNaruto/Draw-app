"use client"
import { redirect } from "next/navigation";
import Cookies from "js-cookie";
import { Appbar } from "../components/Appbar";
export default function Home() {
      const token = Cookies.get("jwt");
      if (!token) {
            return <div>
                  <Appbar />
                  Home page
                  You are not signed in sign in first to Access the Room Section
            </div>
      }
      else {
            return <div>
                  Home Page
                  <Appbar />
                  <button onClick={() => {
                        redirect("/roomSelect");
                  }}>Room Section</button>
            </div>
      }

}
