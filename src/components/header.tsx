import {
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import RedditLogo from "/public/reddit-logo.svg";
import SearchIcon from "@/components/search-icon";
import HeaderAuth from "@/components/header-auth";

export default async function Header() {
  return (
    <Navbar position="static" maxWidth="full" className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="flex gap-2 items-center">
          <Image alt="Reddit Logo" src={RedditLogo} width={50} height={50} />
          <span>Reddit</span>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input
            variant="flat"
            radius="sm"
            placeholder="Type to search..."
            type="search"
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
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
