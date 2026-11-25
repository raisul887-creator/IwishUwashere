import React, { useState } from 'react';
import { BrandMarkIcon, CloseIcon, MenuIcon } from './Icons';

interface NavbarProps {
  onOpenEstimator: () => void;
}

const NAV_LINKS = [
  { href: '#masalah', label: 'Masalah' },
  { href: '#paket', label: 'Paket' },
  { href: '#target', label: 'Target' },
  { href: '#swot', label: 'SWOT' },
];

export function Navbar({ onOpenEstimator }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 border-b border-[#E2DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand mark + subtle unboxed location */}
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[#111619] whitespace-nowrap shrink-0 group"
          aria-label="I Wish UWash Here — Banda Aceh"
        >
          <BrandMarkIcon className="w-5 h-5 text-[#111619] shrink-0" />
          <span className="font-[var(--font-display)] font-extrabold tracking-[-0.02em] text-[15px] sm:text-base">
            I WISH UWASH HERE
          </span>
          <span
            className="hidden sm:inline text-[#E2DFD7] select-none"
            aria-hidden="true"
          >
            /
          </span>
          <span className="hidden sm:inline text-xs font-medium text-[#525C62]">
            Banda Aceh
          </span>
        </a>

        {/* Zone 2: 4 concise single-line anchor links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#525C62]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 whitespace-nowrap shrink-0 hover:text-[#111619] transition-colors duration-150 border-b border-transparent hover:border-[#0E6B7E]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenEstimator}
            className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold text-[#F7F6F2] bg-[#0E6B7E] hover:bg-[#0A5362] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Daftar Membership
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-[#E2DFD7] text-[#111619] hover:bg-[#EFECE5] transition-colors duration-150 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2DFD7] bg-[#F7F6F2]">
          <nav
            aria-label="Navigasi mobile"
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col divide-y divide-[#E2DFD7]"
          >
            <div className="pb-3 text-xs text-[#525C62]">
              Lokasi layanan: Banda Aceh, Indonesia
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-sm font-medium text-[#111619] hover:text-[#0E6B7E] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
