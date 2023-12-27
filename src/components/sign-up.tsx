import { signUp } from "@/actions";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";

//TODO, signUp using server actions, not client components

export default function SignUp() {
  return (
    <form action={signUp}>
      <div className="p-10 rounded bg-white flex flex-col gap-4 justify-center items-start">
        <h1 className="text-2xl">Sign up</h1>
        <p>Please fill in your information below.</p>
        <Input
          name="first-name"
          type="text"
          isRequired
          variant="flat"
          radius="sm"
          label="First Name"
        />
        <Input
          name="last-name"
          type="text"
          isRequired
          variant="flat"
          radius="sm"
          label="Last Name"
        />
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
        <Button
          type="submit"
          variant="solid"
          className="bg-[#17888F] text-white font-bold px-8 py-2 rounded self-center"
        >
          Sign In
        </Button>
        <div className="flex self-center gap-2">
          <span>Already a user?</span>
          <Link href="/sign-in" className="text-[#17888F] font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}
