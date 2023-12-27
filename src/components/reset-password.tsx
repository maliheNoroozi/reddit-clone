import { resetPassword } from "@/actions";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";

//TODO, resetPassword using server actions, not client components

export default function ResetPassword() {
  return (
    <form action={resetPassword}>
      <div className="p-10 rounded bg-white flex flex-col gap-4 justify-center items-start">
        <h1 className="text-2xl">Reset your password</h1>
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
        <div>
          <Button
            type="submit"
            variant="solid"
            className="bg-[#17888F] text-white font-bold px-8 py-2 rounded self-center"
          >
            Sign In
          </Button>
          <Link href="" className="text-[#17888F] font-bold">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
