import Image from "next/image";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { AptosConnect } from "./AptosConnect";
import {
  MODULE_URL,
  NETWORK,
} from "../config/constants";

export function NavBar() {
  return (
    <nav className="navbar py-4 px-4">
      <div className="flex-1 text-lg font-semibold">
        <Link href="/">
          <div className="title cursor-pointer" style={{ fontSize: "24px" }}>Wolf Game</div>
        </Link>
        {NETWORK == "mainnet" ?
          <div className="cursor-pointer ml-2 text-red title-upper" style={{ fontSize: "14px" }}>Aptos</div>
          : <div className="cursor-pointer ml-2 text-red title-upper" style={{ fontSize: "14px" }}>{NETWORK}</div>}
        <ul className="menu menu-horizontal p-0 ml-5">
          <li className="font-sans text-lg">
            <Link href='/game'>Play</Link>
          </li>
          <li className="font-sans text-lg">
            <Link href="/riskygame" target="_blank">Risky Game</Link>
          </li>
          <li className="font-sans text-lg">
            <Link href="/whitepapers" target="_blank">Whitepapers</Link>
          </li>
          <li className="font-sans text-lg">
            <Link href="https://test.wolfgameaptos.xyz" target="_blank">Testnet</Link>
          </li>
          <li className="font-sans text-lg">
            <Link href="https://github.com/AptosWolfGame" target="_blank">Source Code</Link>
          </li>
        </ul>
      </div>
      <AptosConnect />
    </nav>
  );
}
