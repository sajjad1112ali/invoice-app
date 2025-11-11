"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
    className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
    onClick={() => signOut()}
    >
     Logout
    </button>
  );
}
