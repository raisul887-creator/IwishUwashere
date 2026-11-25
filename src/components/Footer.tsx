import React from 'react';
import { BrandMarkIcon } from './Icons';

interface FooterProps {
  onOpenEstimator: () => void;
}

export function Footer({ onOpenEstimator }: FooterProps) {
  return (
    <footer className="bg-[#111619] text-[#F7F6F2] border-t border-[#111619]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/12">
          {/* Brand Identity */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-2.5">
              <BrandMarkIcon className="w-5 h-5 text-[#F7F6F2]" />
              <span className="font-[var(--font-display)] text-base font-extrabold tracking-[-0.02em]">
                I WISH UWASH HERE
              </span>
            </div>
            <p className="mt-3 font-[var(--font-display)] text-xl font-bold text-[#F7F6F2] tracking-[0.01em]">
              Wish Bersih? Wash di Sini.
            </p>
            <p className="mt-2.5 text-sm text-[#B8C4C9] max-w-md leading-relaxed tracking-[0.01em]">
              Konsep layanan cuci mobil berbasis keanggotaan bulanan di Banda Aceh,
              Indonesia. Dirancang untuk efisiensi waktu, kepastian biaya, dan
              perawatan rutin kendaraan roda empat.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <p className="font-[var(--font-mono)] text-xs text-[#69C4D6] tracking-wide mb-4">
              NAVIGASI
            </p>
            <ul className="space-y-2.5 text-sm text-[#D7DFE2]">
              <li>
                <a
                  href="#masalah"
                  className="hover:text-white transition-colors"
                >
                  Masalah &amp; Nilai Usaha
                </a>
              </li>
              <li>
                <a href="#paket" className="hover:text-white transition-colors">
                  Paket Membership
                </a>
              </li>
              <li>
                <a href="#target" className="hover:text-white transition-colors">
                  Target Pasar &amp; Persona
                </a>
              </li>
              <li>
                <a href="#swot" className="hover:text-white transition-colors">
                  Analisis SWOT
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Direct Action */}
          <div className="md:col-span-3">
            <p className="font-[var(--font-mono)] text-xs text-[#69C4D6] tracking-wide mb-4">
              OPERASIONAL
            </p>
            <p className="text-sm font-medium text-[#F7F6F2]">
              Banda Aceh, Indonesia
            </p>
            <p className="mt-1.5 text-xs text-[#A8B4BA] leading-relaxed">
              Booking layanan via aplikasi &amp; WhatsApp untuk pemilik mobil di area
              perkotaan Banda Aceh.
            </p>
            <button
              type="button"
              onClick={onOpenEstimator}
              className="mt-5 inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-xs font-semibold bg-[#0E6B7E] hover:bg-[#128299] text-[#F7F6F2] transition-colors cursor-pointer"
            >
              Simulasi Jadwal / Daftar
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs text-[#98A4AA] leading-relaxed">
          <p className="max-w-3xl">
            Disclaimer Perencanaan Bisnis: Seluruh angka harga paket, kuota cuci,
            estimasi waktu antre (30–60 menit), siklus pencucian (1–2 minggu), profil
            persona, serta poin analisis SWOT pada halaman ini merupakan asumsi studi
            perencanaan usaha I Wish UWash Here.
          </p>
          <p className="whitespace-nowrap shrink-0 text-[#B8C4C9]">
            &copy; {new Date().getFullYear()} I Wish UWash Here · Banda Aceh
          </p>
        </div>
      </div>
    </footer>
  );
}
