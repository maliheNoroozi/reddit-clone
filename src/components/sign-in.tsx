"use client";

import { Input, Checkbox, Button } from "@nextui-org/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GithubSignInButton from "@/components/github-signin-button";
import GoogleSignInButton from "@/components/google-signin-button";
import Divider from "@/components/divider";

export default function SignIn() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (event: unknown) => {
    //   signIn("credentials", formData);
  };

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex flex-col gap-4 p-10 rounded justify-center items-start w-[400px] min-w-[300px] max-w-[400px]">
        <h1 className="text-2xl">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <GithubSignInButton />
          <GoogleSignInButton />
          <Divider>Or</Divider>
          <Input
            name="email"
            type="email"
            isRequired
            variant="flat"
            radius="sm"
            label="Email"
          />
          <Input
            name="password"
            type="password"
            isRequired
            variant="flat"
            radius="sm"
            label="Password"
          />
          <div className="w-full flex justify-between gap-2 flex-wrap">
            <Checkbox name="rememberMe" radius="sm" color="default">
              Remember Me
            </Checkbox>
            <Link href="" className="underline text-gray-600">
              Forgot Password?
            </Link>
          </div>
          <Button
            variant="solid"
            type="submit"
            className="bg-[#17888F] text-white font-bold px-8 py-2 rounded self-center"
          >
            Sign In
          </Button>
          <div className="flex self-center gap-2 flex-wrap">
            Don&apos;t have an account?
            <Link href="/sign-up" className="text-[#17888F] font-bold">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    )
  );
}
