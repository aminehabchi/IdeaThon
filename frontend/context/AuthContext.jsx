"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetcher } from "@/lib/helpers"; // update this path if needed

const AuthContext = createContext({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }) => {    
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetcher({
          url: "http://localhost:8080/api/auth/me",
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
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
