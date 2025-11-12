'use client';

import Link from "next/link";
import { Suspense } from "react";
import AuthStatus from "./auth-status";
import { usePathname } from "next/navigation";

function  NavBar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Paperless <span className="text-emerald-500">Billing</span> {isHomePage}
          </div>
        </Link>
        {isHomePage && (<nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a
            href="#value-prop"
            className="text-gray-600 hover:text-emerald-500 transition duration-150"
          >
            Features
          </a>
          <a
            href="#benefits"
            className="text-gray-600 hover:text-emerald-500 transition duration-150"
          >
            Benefits
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-emerald-500 transition duration-150"
          >
            How It Works
          </a>
        </nav>)}
        <Suspense fallback="Loading...">
          <AuthStatus />
        </Suspense>
      </div>
    </header>
  );
}

export default NavBar;
