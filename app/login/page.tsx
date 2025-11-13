import Image from "next/image";
import Form from "@/components/form";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <Form type="login" />
      </div>
    </div>
  );
}
