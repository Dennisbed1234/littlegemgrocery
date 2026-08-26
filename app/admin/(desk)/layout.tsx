"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "../admin.css";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/hours", label: "Hours" },
  { href: "/admin/announcements", label: "Notice" },
];

export default function DeskLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="desk">
      <aside className="desk-side">
        <Link href="/admin" className="desk-brand">
          <span className="brand-mark">LG</span>
          Staff desk
        </Link>
        <nav className="desk-nav">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/">View shop site</Link>
        </nav>
        <button type="button" onClick={logout}>
          Sign out
        </button>
      </aside>
      <div className="desk-main">{children}</div>
    </div>
  );
}
