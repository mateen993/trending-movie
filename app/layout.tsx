import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies",
  description: "The website is created using nextjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="px-10 pt-5 text-3xl " >
          <Link prefetch href="/" className="font-bold">
            Movie <span className="text-teal-500 font-extrabold"> DB </span>
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
