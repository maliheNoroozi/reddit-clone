import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/app/providers";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddit Clone",
  description: "This is a very simple clone of Redit website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="h-screen w-screen flex text-[rgb(17, 24, 28)] container mx-auto max-w-8xl">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
