"use client"
import { GoogleGeminiEffectDemo } from "@/components/Global/Gemini";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { useScroll, useTransform } from "framer-motion";
import React from "react";



export default function Home() {

  return (
    <>
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <BackgroundBeams />
      <h1 className="text-6xl font-bold text-center text-gray-200">
        Hello, something is coming soon!
      </h1>

    </div>
    <GoogleGeminiEffectDemo/>


    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
    
      <h1 className="text-6xl font-bold text-center text-gray-200">
        Hello, something is coming soon!
      </h1>

    </div>
    </>

  );
}
