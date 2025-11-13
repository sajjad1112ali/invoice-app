import Link from "next/link";
import SignOut from "./sign-out";


export default function AuthStatus({loading, user}) {
  
  if (loading) {
    return <div className="w-10 h-10"></div>;
  }
  if (!user) {
    return (
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-700 transition duration-150 hidden sm:inline-block"
      >
        Log in
      </Link>
    );
  }

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase();

  return (
    <div className="relative group">
      <button className="flex items-center justify-center w-10 h-10 bg-emerald-500 text-white font-bold text-lg rounded-full shadow-md ring-2 ring-emerald-500 hover:ring-slate-900 transition duration-150 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span className="font-semibold">{userInitial}</span>
        )}
      </button>

      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <Link
          href="/dashboard"
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Dashboard
        </Link>

        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
        <div>
          <SignOut />
        </div>
      </div>
    </div>
  );
}
