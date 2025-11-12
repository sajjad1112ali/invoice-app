// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/NavBar";
import { headers } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Paperless Billing | Streamlined Paperless Invoicing";
const description =
  "Streamlined Paperless Invoicing for Modern Businesses - Simplify your billing process with our secure, eco-friendly solution.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "/"; // fallback to "/"
  console.log(headersList.get("x-invoke-path"))
  return (
    <html lang="en">
      <head>
        <script src="https://preline.co/assets/vendor/preline/preline.js"></script>
      </head>
      <body className={inter.variable}>
        <Toaster />
        <NavBar pathname={pathname} />
       
        {children}
      </body>
    </html>
  );
}
