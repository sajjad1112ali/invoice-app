"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
    className="flex items-center gap-x-2 font-semibold text-gray-500 hover:text-blue-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
    onClick={() => signOut()}
    >
     Logout
    </button>
  );
}
