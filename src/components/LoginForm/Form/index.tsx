"use client";
import React from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { LinkPreview } from "@/components/ui/link-preview";
import { usePathname } from "next/navigation";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useAuthContext } from "@/context/AuthContext";
import { getUser } from "@/hooks/get-user";
import { Spinner } from "@nextui-org/react";


export function Form() {
  const { login, signup, handleChange, isLoading } = useAuthContext();

  const path = usePathname();

  const isLogin = path === "/login";
  const isSignup = path === "/signup";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    if (isLogin) {
      login(e);
    } else if (isSignup) {
      signup(e);
    }
  };
  return (
    <>
      {isLoading && (
        <div className="text-center flex-col justify-center align-middle items-center flex"> <Spinner label="Working on it..." color="success" className='text-white' /></div>
      )}

      {isSignup && !isLoading && (
        <div className="flex justify-center ">
          <BackgroundGradient className="rounded-[22px] max-w-md p-4 sm:p-10 bg-zinc-900 md:w-[500px] md:rounded-2xl md:p-8 shadow-input" containerClassName=" w-auto">
            <h2 className="font-bold text-xl text-neutral-200">Welcome to Learnium</h2>
            <p className="text-sm max-w-sm mt-2 text-neutral-300">
              Already Have One{" "}
              <LinkPreview url="/login" className="font-bold text-lg" imageSrc="/images/login.png" isStatic={true}>
                Log In !
              </LinkPreview>
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" name="fullname" placeholder="Tyler Swift" type="text" onChange={handleChange} />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" onChange={handleChange} />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="phone">Mobile no</Label>
                <Input id="phone" name="phone" placeholder="9345677890" type="text" onChange={handleChange} />
              </LabelInputContainer>
              <LabelInputContainer className="mb-8">
                <Label htmlFor="password">Create Password</Label>
                <Input id="password" name="password" placeholder="••••••••" type="password" onChange={handleChange} />
              </LabelInputContainer>
              <button className="bg-gradient-to-br from-zinc-900 to-zinc-900 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] relative group" type="submit">
                Sign up &rarr;
                <BottomGradient />
              </button>
            </form>
          </BackgroundGradient>
        </div>
      )}

      {isLogin && !isLoading && (
        <div className="flex justify-center">
          <BackgroundGradient className="rounded-[22px] max-w-md p-4 sm:p-10 bg-zinc-900 w-full md:rounded-2xl md:p-8 shadow-input" containerClassName="max-w-md">
            <h2 className="font-bold text-xl text-neutral-200">Welcome to Learnium</h2>
            <p className="text-sm max-w-sm mt-2 text-neutral-300">
              If you don&apos;t have an account yet{" "}
              <LinkPreview url="/signup" className="font-bold text-lg" imageSrc="/images/signup.png" isStatic={true}>
                Create One!
              </LinkPreview>
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" onChange={handleChange} />
              </LabelInputContainer>
              <LabelInputContainer className="mb-8">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" placeholder="••••••••" type="password" onChange={handleChange} />
              </LabelInputContainer>
              <button className="bg-gradient-to-br from-zinc-900 to-zinc-900 block w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] relative group" type="submit">
                Log In &rarr;
                <BottomGradient />
              </button>
            </form>
          </BackgroundGradient>
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

