"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-navy-950/98 backdrop-blur-sm shadow-lg shadow-navy-950/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-serif text-lg sm:text-xl font-bold text-cream-100 group-hover:text-gold-300 transition-colors leading-tight">
            Port Edward
          </span>
          <span className="text-gold-400 text-xs tracking-[0.2em] uppercase font-sans">
            Restaurant
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-sm tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-gold-400"
                  : "text-cream-200 hover:text-gold-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.opentable.com/r/port-edward-restaurant-algonquin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold text-sm px-5 py-2.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-gold-500/30"
          >
            Reserve a Table
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-cream-200 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-950/98 backdrop-blur-sm border-t border-navy-800/50 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-sans text-base py-2 border-b border-navy-800/30 transition-colors ${
                pathname === link.href
                  ? "text-gold-400"
                  : "text-cream-200 hover:text-gold-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.opentable.com/r/port-edward-restaurant-algonquin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold text-sm px-5 py-3 rounded text-center transition-colors mt-2"
          >
            Reserve a Table
          </a>
        </div>
      )}
    </nav>
  );
}
