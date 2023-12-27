"use client";

import { Button, Divider } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import googleIcon from "/public/google-logo.svg";
import Image from "next/image";

export default function GoogleSignInButton() {
  return (
    <>
      <Button
        variant="solid"
        startContent={
          <>
            <Image src={googleIcon} alt="github-icon" width={25} height={25} />
            <Divider orientation="vertical" className="bg-black" />
          </>
        }
        className="bg-white/80 text-black font-bold px-8 py-2 rounded self-center w-full"
        onClick={() => {
          signIn("google");
        }}
      >
        Sign In with Google
      </Button>
    </>
  );
}
