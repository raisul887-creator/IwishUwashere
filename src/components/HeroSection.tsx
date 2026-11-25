import React, { useState } from 'react';
import { HERO_IMAGE_PATH, HERO_SPECS } from '../data/businessData';
import { ArrowRightIcon, BrandMarkIcon } from './Icons';

interface HeroSectionProps {
  onOpenEstimator: () => void;
}

export function HeroSection({ onOpenEstimator }: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="top" className="border-b border-[#E2DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
        {/* Asymmetric 2-Column Editorial Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between py-1 lg:pr-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#0E6B7E] mb-5">
                Carwash Berbasis Keanggotaan · Banda Aceh
              </p>

              <h1 className="font-[var(--font-display)] font-extrabold text-[clamp(2.45rem,4.6vw,4.15rem)] leading-[1.06] tracking-[-0.03em] text-[#111619] max-w-xl">
                Wish Bersih? Wash di Sini.
              </h1>

              <p className="mt-6 text-base sm:text-[17px] leading-[1.68] text-[#454F55] max-w-[54ch]">
                Skema keanggotaan cuci mobil bulanan untuk pemilik kendaraan roda empat
                di Banda Aceh. Satu tarif tetap setiap bulan, akses jalur antre
                prioritas, serta perawatan rutin terjadwal agar mobil selalu siap
                dipakai menghadapi debu jalanan dan hujan.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href="#paket"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[46px] px-6 py-3 bg-[#111619] hover:bg-[#0E6B7E] text-[#F7F6F2] text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Lihat Paket Bulanan</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onOpenEstimator}
                  className="inline-flex items-center justify-center min-h-[46px] px-6 py-3 border border-[#111619]/30 hover:border-[#0E6B7E] hover:text-[#0E6B7E] bg-transparent text-[#111619] text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Simulasi Jadwal / Daftar
                </button>
              </div>
            </div>

            {/* Quiet operational metadata footer inside left column */}
            <div className="mt-10 pt-6 border-t border-[#E2DFD7] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#525C62]">
              <span className="font-medium text-[#111619]">
                Mulai Rp 150.000 / bulan (estimasi)
              </span>
              <span aria-hidden="true">·</span>
              <span>Booking via Aplikasi &amp; WhatsApp</span>
              <span aria-hidden="true">·</span>
              <span>Khusus Kendaraan Roda Empat</span>
            </div>
          </div>

          {/* Right Column (6 cols): High-contrast editorial visual frame */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] lg:h-full bg-[#111619] border border-[#111619] overflow-hidden">
              {!imageError ? (
                <img
                  src={HERO_IMAGE_PATH}
                  alt="Kendaraan roda empat menjalani pencucian snow foam bertekanan di studio carwash modern I Wish UWash Here Banda Aceh"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#111619] via-[#19262C] to-[#0E6B7E]/40 text-[#F7F6F2]">
                  <BrandMarkIcon className="w-10 h-10 text-[#F7F6F2] mb-4" />
                  <p className="font-[var(--font-display)] text-lg font-bold tracking-tight">
                    I Wish UWash Here
                  </p>
                  <p className="text-xs text-[#C7D0D5] mt-1">
                    Studio Carwash Keanggotaan · Banda Aceh
                  </p>
                </div>
              )}

              {/* Measured bottom contrast scrim for quiet editorial caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111619]/90 via-[#111619]/45 to-transparent px-5 pt-14 pb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="font-[var(--font-mono)] text-[11px] text-[#C8D4D8] tracking-wide">
                    PERAWATAN RODA EMPAT · BANDA ACEH
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-[#F7F6F2] mt-0.5 tracking-[0.01em]">
                    Cuci eksterior terukur, vakum kabin, dan jalur prioritas anggota.
                  </p>
                </div>
                <span className="hidden sm:inline font-[var(--font-mono)] text-xs text-[#F7F6F2]/80 tabular-nums shrink-0">
                  3 TIER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Structured Spec Strip directly below Hero 2-column split */}
      <div className="border-t border-[#E2DFD7] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2DFD7]">
            {HERO_SPECS.map((spec) => (
              <div key={spec.index} className="py-5 md:py-6 md:px-6 first:md:pl-0 last:md:pr-0">
                <div className="flex items-baseline gap-3">
                  <span className="font-[var(--font-mono)] text-xs font-medium text-[#0E6B7E] tabular-nums">
                    {spec.index}
                  </span>
                  <h2 className="font-[var(--font-display)] text-sm sm:text-[15px] font-bold text-[#111619] tracking-[-0.01em]">
                    {spec.label}
                  </h2>
                </div>
                <p className="mt-1.5 pl-7 text-xs sm:text-[13px] leading-relaxed text-[#525C62]">
                  {spec.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
