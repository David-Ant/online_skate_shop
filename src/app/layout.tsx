import "~/styles/globals.css";

import { type Metadata } from "next";
import { Oswald } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import { HydrateClient } from "~/trpc/server";
import { TopNav } from "./_components/TopNav";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
  title: "Online Skate Shop",
  description: "Personal project for learning purposes",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`font-sans ${oswald.variable}`}>
      <body className="flex flex-col min-h-screen">
        <TRPCReactProvider>
          <HydrateClient>
            <SessionProvider>
              <TopNav />
              <main className="flex-grow">
                {children}
              </main>
              <Footer/>
            </SessionProvider>
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
