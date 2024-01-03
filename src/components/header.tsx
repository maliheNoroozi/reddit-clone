import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import RedditLogo from "/public/reddit-logo.svg";
import HeaderAuth from "@/components/header-auth";
import Search from "@/components/search";

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
          <Search />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
