"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetcher } from "@/lib/helpers"; // update this path if needed
import { usePathname } from "next/navigation";

const AuthContext = createContext({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") return
    const loadUser = async () => {
      try {
        const data = await fetcher({
          url: "/api/auth/me",
          method: "GET",
          returned_status: 200,
        });
        setUser(data);
      } catch (err) {
        // fetcher handles toast and redirection already
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    console.log("user", user);

    loadUser();
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
