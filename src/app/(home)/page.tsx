import { GoogleGeminiEffectDemo } from "@/components/Global/Gemini";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import React from "react";

export default function Home() {

  return (
    <div className=" overflow-y-hidden overflow-hidden no-scrollbar">

      <Hero/>
      {/* <GoogleGeminiEffectDemo/> */}
      <Info/>
    </div>
  );
}
