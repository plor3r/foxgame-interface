import Image from "next/image";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { AptosConnect } from "./AptosConnect";
import {
  MODULE_URL
} from "../config/constants";

export function NavBar() {
  return (
    <nav className="navbar py-4 px-4">
      <div className="flex-1 text-lg font-semibold">
        <Link href="/">
          {/* <Image src="/logo.png" width={64} height={64} alt="logo" /> */}
          <div className="title cursor-pointer" style={{ fontSize: "24px" }}>Wolf Game</div>
        </Link>
        <ul className="menu menu-horizontal p-0 ml-5">
          <li className="font-sans text-lg">
            <Link href='/game'>Play</Link>
          </li>
          <li className="font-sans text-lg">
            <Link href={MODULE_URL} target="_blank">Risky Game</Link>
          </li>
        </ul>
      </div>
      <AptosConnect />
    </nav>
  );
}
