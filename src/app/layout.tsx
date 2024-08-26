import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import { AuthProvider } from "@/context/AuthContext";
import {Providers} from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learnium ",
  description: "Transforming Education For All Learners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
    <link rel="icon" href="/logo/log.svg" /> 
  </head>
      <body className={inter.className}>
        <Providers>

        <AuthProvider>

        <Navbar/>
        </AuthProvider>
       
        {children}
        <Footer/>
        </Providers>
        </body>
    </html>
  );
}
