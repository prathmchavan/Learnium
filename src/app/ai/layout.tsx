"use client"
import { AptiProvider } from "@/context/AptiContext";
import { OaProvider } from "@/context/OaContext";
import { SnackbarProvider } from "notistack";

export default function AiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SnackbarProvider>
    <AptiProvider>
      <OaProvider>
        {children}
      </OaProvider>
    </AptiProvider>
    </SnackbarProvider>


  );
}
