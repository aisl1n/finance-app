import Link from "next/link";

interface NavbarLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavbarLink = ({ href, children, className }: NavbarLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center font-bold ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavbarLink;
