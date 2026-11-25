import React from 'react';
import { SWOT_MATRIX } from '../data/businessData';

export function SwotSection() {
  return (
    <section id="swot" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <p className="font-[var(--font-mono)] text-xs font-medium text-[#0E6B7E] tracking-wide mb-3">
            04 · ANALISIS SWOT
          </p>
          <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-[-0.025em] text-[#111619] leading-[1.15]">
            Pemetaan kekuatan, keterbatasan, peluang, dan risiko operasional.
          </h2>
          <p className="mt-3 text-sm sm:text-[15px] text-[#525C62] leading-relaxed">
            Kerangka evaluasi internal dan eksternal untuk menjaga kualitas antre
            prioritas sekaligus profitabilitas model membership di Banda Aceh.
          </p>
        </div>

        {/* Crisp 2x2 Editorial Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SWOT_MATRIX.map((quadrant) => (
            <article
              key={quadrant.letter}
              className={`bg-white border border-[#E2DFD7] ${quadrant.borderTopClass} p-6 sm:p-8`}
            >
              <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-[#E2DFD7]">
                <div>
                  <h3 className="font-[var(--font-display)] text-xl font-bold text-[#111619]">
                    {quadrant.title}
                  </h3>
                  <p className="text-xs font-medium text-[#525C62] mt-0.5">
                    {quadrant.indonesianTitle}
                  </p>
                </div>

                <span
                  className="font-[var(--font-display)] text-3xl font-extrabold leading-none select-none"
                  style={{ color: quadrant.accentColor }}
                  aria-hidden="true"
                >
                  {quadrant.letter}
                </span>
              </div>

              <ul className="mt-5 space-y-3.5">
                {quadrant.points.map((point, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-[16px_1fr] gap-3 text-sm sm:text-[15px] leading-[1.6] text-[#3B444A]"
                  >
                    <span
                      className="font-[var(--font-mono)] text-xs mt-0.5 select-none"
                      style={{ color: quadrant.accentColor }}
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Study Assumption Note */}
        <p className="mt-5 text-xs leading-relaxed text-[#525C62]">
          Catatan: Seluruh poin analisis SWOT di atas disusun sebagai asumsi studi dan
          dasar perencanaan bisnis I Wish UWash Here.
        </p>
      </div>
    </section>
  );
}
