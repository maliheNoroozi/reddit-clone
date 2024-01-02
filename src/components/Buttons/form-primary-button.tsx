"use client";

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FormPrimaryButtonProps {
  children: React.ReactNode;
}

export default function FormPrimaryButton({
  children,
}: FormPrimaryButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="solid"
      type="submit"
      isLoading={pending}
      className="bg-[#17888F] text-white font-bold py-2 rounded w-full"
    >
      {children}
    </Button>
  );
}
