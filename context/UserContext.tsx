"use client";

import { UserContextType } from "@/lib/customTypes";
import useUser from "hooks/useUser";
import { createContext, useContext } from "react";

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, refreshUser } = useUser();

  return (
    <UserContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
