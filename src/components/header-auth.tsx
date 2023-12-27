"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Avatar,
  Divider,
} from "@nextui-org/react";

export default function HeaderAuth() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/sign-in");
    }
  }, [sessionStatus, router]);

  return (
    <>
      {sessionStatus !== "loading" ? (
        session?.user ? (
          <Popover placement="left-start">
            <PopoverTrigger>
              <Avatar
                src={session.user.image || ""}
                className="cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-8 p-4">
              <div className="flex flex-col gap-2 items-center">
                <Avatar src={session.user.image || ""} />
                <span>{session.user.name}</span>
                <span className="text-gray-400">{session.user.email}</span>
                <Divider />
              </div>
              <button
                onClick={() => signOut()}
                className="text-[#17888F] font-bold"
              >
                Sign Out
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <Link href="/sign-in">Sign In</Link>
        )
      ) : null}
    </>
  );
}
