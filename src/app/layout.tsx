import "~/styles/globals.css";

import { type Metadata } from "next";
import { Oswald } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { TopNav } from "./_components/TopNav";

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
    <html lang="en" className={`font-sans ${oswald.variable} flex flex-col`}>
      <body>
        <TRPCReactProvider>
          <TopNav />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
