'use client';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./component/Navigation";
import Footer from "./component/footer";

import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizWiz",
  description: "quiz wiz is best testing website of your knowledge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthContextProvider>
          <Navigation />
          <div>{children}</div>
        </AuthContextProvider>
        <div className="">
          <Footer />
        </div>
      </body>
    </html>
  );
}
