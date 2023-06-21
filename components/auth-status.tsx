import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

import Link from "next/link";
import SignOut from "./sign-out";

export default async function AuthStatus() {
   const session = await getServerSession(authOptions);
  return (
    <>
      {session && (
        <>
        <Link
          className="flex items-center gap-x-2 font-semibold text-gray-500 hover:text-blue-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
          href={'dashboard'}
        >
          Dashboard
        </Link>
        <SignOut />
        </>
      )}
      <Link
        className="flex items-center gap-x-2 font-semibold text-gray-500 hover:text-blue-600 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500"
        href={session ? `/dashboard/profile` : `login`}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
        </svg>
        {session ? `Welcome ${session.user?.email}` : "Log in"}
      </Link>
    </>
  );
}
