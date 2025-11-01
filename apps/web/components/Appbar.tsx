"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const Appbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("jwt");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt");
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleLogin = () => {
    router.push("/auth/signin");
  };

  return (
    <div>
      <h2
        style={{
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
      </h2>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin} >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
