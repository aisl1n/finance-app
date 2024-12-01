"use client";

import { BadgeDollarSignIcon, ScanQrCodeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import NavbarLink from "./navbarLink";

const Navbar = () => {
  const pathname = usePathname();

  const isTransactions = pathname === "/transactions";
  const isScanner = pathname === "/scanner";

  return (
    <nav className="fixed bottom-0 z-20 flex w-full justify-evenly rounded bg-zinc-700 px-8 py-4 text-white opacity-80">
      <NavbarLink
        href="/transactions"
        className={`${isTransactions ? "text-primary" : ""}`}
      >
        <BadgeDollarSignIcon size={32} />
        <span className="text-sm">Transações</span>
      </NavbarLink>
      <NavbarLink href="/scanner" className={isScanner ? "text-primary" : ""}>
        <ScanQrCodeIcon size={32} />
        <span className="text-sm">Scanner</span>
      </NavbarLink>
    </nav>
  );
};

export default Navbar;
