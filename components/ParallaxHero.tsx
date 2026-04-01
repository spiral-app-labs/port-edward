"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function ParallaxHero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden flex items-center justify-center">
      {/* Background with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-20 -bottom-20 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/40 via-transparent to-navy-950/40" />

      {/* Gold anchor decoration */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-20">
        <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.65-1.35-3-3-3S9 4.35 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H4v2h4.5l3.5-3.5 3.5 3.5H20v-2h-3z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <p className="font-sans text-gold-400 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 opacity-0 animate-[fadeInUp_0.6s_ease_0.2s_forwards]">
          Est. 1964 · Algonquin, Illinois
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream-100 leading-tight mb-4 opacity-0 animate-[fadeInUp_0.6s_ease_0.4s_forwards]">
          Port Edward
          <br />
          <span className="text-gradient-gold">Restaurant</span>
        </h1>
        <p className="font-serif text-lg sm:text-xl md:text-2xl text-cream-200/90 italic mb-10 opacity-0 animate-[fadeInUp_0.6s_ease_0.6s_forwards]">
          A Unique Dining Experience — Since 1964
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeInUp_0.6s_ease_0.8s_forwards]">
          <a
            href="https://www.opentable.com/r/port-edward-restaurant-algonquin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-sans font-semibold px-8 py-4 rounded transition-all duration-200 hover:shadow-xl hover:shadow-gold-500/30 hover:-translate-y-0.5"
          >
            Reserve a Table
          </a>
          <Link
            href="/menu"
            className="border border-cream-200/50 hover:border-gold-400 text-cream-200 hover:text-gold-400 font-sans font-semibold px-8 py-4 rounded transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
          >
            Explore the Menu
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
        <span className="font-sans text-xs text-cream-300/60 tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4 text-cream-300/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
