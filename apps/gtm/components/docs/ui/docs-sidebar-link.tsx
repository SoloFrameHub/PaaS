"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocsProvider } from "@/components/docs/docs-provider";

interface DocsSidebarLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function DocsSidebarLink({
  children,
  href,
}: DocsSidebarLinkProps) {
  const pathname = usePathname();
  const { setSidebarOpen } = useDocsProvider();

  return (
    <Link
      className={`flex items-center space-x-3 font-medium ${pathname === href ? "text-blue-600" : "text-slate-800 dark:text-slate-200"}`}
      href={href}
      onClick={() => setSidebarOpen(false)}
    >
      {children}
    </Link>
  );
}
