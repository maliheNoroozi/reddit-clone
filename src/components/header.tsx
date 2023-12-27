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
    <Navbar position="static" className="py-2">
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
            isClearable
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <HeaderAuth />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
