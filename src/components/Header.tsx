"use client";

import {
  Recycle,
  Leaf,
  Home,
  PlusCircle,
  List,
  LogOut,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/lapor", label: "Lapor", icon: PlusCircle },
    { href: "/daftar", label: "Daftar", icon: List },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-dark-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-teal rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative p-2 bg-gradient-to-br from-primary-700 to-primary-600 rounded-lg shadow-sm">
                <Recycle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-0">
              <h1 className="text-xl font-bold text-dark-900">Bersih.in</h1>
              <p className="text-xs text-dark-500 font-medium">
                Lapor Sampah Liar
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isActive(href)
                    ? "bg-primary-700 text-white shadow-sm"
                    : "text-dark-600 hover:bg-dark-50 hover:text-dark-900"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{label}</span>
              </Link>
            ))}

            <div className="h-6 w-px bg-dark-200 mx-2"></div>

            {session ? (
              <div className="flex items-center gap-4 ml-2">
                <span className="text-sm font-semibold text-dark-800">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  <span>Keluar</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-2.5 ml-2 bg-primary-700 text-white rounded-lg font-medium text-sm hover:bg-primary-800 shadow-sm transition-all duration-300"
              >
                <LogIn className="w-4.5 h-4.5" />
                <span>Masuk</span>
              </Link>
            )}
          </nav>

          {/* Mobile Settings */}
          <div className="md:hidden flex items-center gap-2">
            {navItems.slice(1).map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  isActive(href)
                    ? "bg-primary-700 text-white"
                    : "text-dark-600 hover:bg-dark-50"
                }`}
                title={label}
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
            {session ? (
              <button
                onClick={() => signOut()}
                className="p-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link
                href="/login"
                className="p-2.5 rounded-lg text-primary-700 hover:bg-primary-50 transition-all"
              >
                <LogIn className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
