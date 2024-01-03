"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";
import SearchIcon from "@/components/search-icon";
import * as actions from "@/actions";
import path from "@/path";
import { useState } from "react";

export default function Search({}) {
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("term"));
  const router = useRouter();

  return (
    <form action={actions.search}>
      <Input
        variant="flat"
        radius="sm"
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        classNames={{
          base: "hidden md:block max-w-full sm:max-w-[20rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        name="term"
        value={term || ""}
        isClearable
        onChange={(event) => setTerm(event.target.value)}
        onClear={() => {
          setTerm("");
          router.push(path.home());
        }}
      />
    </form>
  );
}
