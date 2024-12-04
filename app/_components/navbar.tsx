"use client";

import { DollarSignIcon, HouseIcon, ScanQrCodeIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import NavbarLink from "./navbarLink";

const Navbar = () => {
  const pathname = usePathname();

  const isTransactions = pathname === "/transactions";
  const isScanner = pathname === "/scanner";
  const isHome = pathname === "/";

  return (
    <div className="flex justify-center">
      <nav className="fixed bottom-0 z-20 mb-4 flex w-[440px] justify-around rounded-full bg-zinc-900 px-8 py-4 text-white opacity-85">
        <NavbarLink href="/" className={`${isHome ? "text-primary" : ""}`}>
          <HouseIcon size={32} />
          <span className="text-sm font-bold">Home</span>
        </NavbarLink>
        <NavbarLink
          href="/transactions"
          className={`${isTransactions ? "text-green-500" : ""}`}
        >
          <DollarSignIcon size={32} />
          <span className="upp text-sm font-bold">Transações</span>
        </NavbarLink>
        <NavbarLink href="/scanner" className={isScanner ? "text-primary" : ""}>
          <ScanQrCodeIcon size={32} />
          <span className="text-sm font-bold">Scanner</span>
        </NavbarLink>
      </nav>
    </div>
  );
};

export default Navbar;
