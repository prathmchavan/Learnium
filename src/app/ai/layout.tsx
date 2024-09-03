"use client"
import { AptiProvider } from "@/context/AptiContext";
import { OaProvider } from "@/context/OaContext";

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
