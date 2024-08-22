"use client";
import React from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { LinkPreview } from "@/components/ui/link-preview";
import { usePathname } from "next/navigation";


export function Form() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form handling logic here
    console.log("Form submitted");
  };

  const path = usePathname();

  const isLogin = path === '/login'
  const isSignup = path === '/signup'

  return (
    <>
    {isSignup &&(
      <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 shadow-input bg-black aspect-video rounded-xl bg-white/10 ring-1 ring-black/5">
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to Learnium
      </h2>
     
        <p className="text-sm max-w-sm mt-2 text-neutral-300">
         Already Have One{" "}
          <LinkPreview
            url="/login"
            className="font-bold text-purple-300"
            imageSrc="/images/login.png"
            isStatic={true}
          >
            Log In
          </LinkPreview>
        </p>


      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="mobile">Mobile no</Label>
          <Input id="mobile" placeholder="9345677890" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Create Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-zinc-900 to-zinc-900 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] relative group"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>  
    )}
    
    {isLogin &&(
      <div className="max-w-md w-full mx-auto md:rounded-2xl p-4 md:p-8 shadow-input bg-black aspect-video rounded-xl bg-white/10 ring-1 ring-black/5">
      <h2 className="font-bold text-xl text-neutral-200">
        Welcome to Learnium
      </h2>
     
        <p className="text-sm max-w-sm mt-2 text-neutral-300">
          If you don&apos;t have an account yet{" "}
          <LinkPreview
            url="/signup"
            className="font-bold text-purple-300"
            imageSrc="/images/signup.png"
            isStatic={true}
          >
            Create One
          </LinkPreview>
        </p>


      <form className="my-8" onSubmit={handleSubmit}>
      
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
     
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br from-zinc-900 to-zinc-900 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] relative group"
          type="submit"
        >
          Log In &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>  
    )}
    </>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

