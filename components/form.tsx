"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "context/UserContext";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
const { refreshUser } = useUserContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              toast.error(error);
            } else {
              refreshUser();
              router.refresh();
              router.push("/dashboard");
            }
          });
        } else {
          fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              toast.success("Account created! Redirecting to login...");
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            } else {
              const { error } = await res.json();
              toast.error(error);
            }
          });
        }
      }}
      className="max-w-md w-full mx-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-green-600 text-center capitalize">{type}</h2>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          className="block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:outline-none transition-all sm:text-sm"
        />
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="block w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:outline-none transition-all sm:text-sm"
        />
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed bg-gray-200 dark:bg-gray-700 text-gray-400"
            : "bg-green-600 hover:bg-green-500 text-white"
        } flex h-11 w-full items-center justify-center rounded-lg font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900`}
      >
        {loading ? (
          <LoadingDots color="#ffffff" />
        ) : (
          <p>{type === "login" ? "Sign In" : "Sign Up"}</p>
        )}
      </button>

      {/* Toggle Text */}
      {type === "login" ? (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign up
          </Link>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign in
          </Link>{" "}
          instead.
        </p>
      )}
    </form>
  );
}
