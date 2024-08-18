import { AptiProvider } from "@/context/AptiContext";
import { OaProvider } from "@/context/OaContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AptiProvider>

      <OaProvider>

        {children}
      </OaProvider>
    </AptiProvider>


  );
}
