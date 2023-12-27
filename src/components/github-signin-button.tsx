"use client";

import { Button, Divider } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import githubIcon from "/public/github-logo.svg";
import Image from "next/image";

export default function GithubSignInButton() {
  return (
    <>
      <Button
        variant="solid"
        startContent={
          <>
            <Image src={githubIcon} alt="github-icon" width={20} height={20} />
            <Divider orientation="vertical" className="bg-white" />
          </>
        }
        className="bg-black/80 text-white font-bold px-8 py-2 rounded self-center w-full"
        onClick={() => {
          signIn("github");
        }}
      >
        Sign In with Github
      </Button>
    </>
  );
}
