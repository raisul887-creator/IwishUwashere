import React, { useState } from 'react';
import {
  DEMOGRAPHICS_SUMMARY,
  PERSONAS,
  PersonaFilterKey,
  TierId,
} from '../data/businessData';
import { ArrowRightIcon } from './Icons';

interface TargetMarketSectionProps {
  onSelectPersona: (preset: {
    tierId: TierId;
    vehicle: string;
    slot: string;
  }) => void;
}

const FILTER_OPTIONS: Array<{ key: PersonaFilterKey; label: string }> = [
  { key: 'semua', label: 'Semua' },
  { key: 'karyawan', label: 'Karyawan & Profesional' },
  { key: 'keluarga', label: 'Keluarga' },
  { key: 'pengusaha', label: 'Pengusaha & UMKM' },
  { key: 'driver', label: 'Driver Online' },
];

export function TargetMarketSection({ onSelectPersona }: TargetMarketSectionProps) {
  const [activeFilter, setActiveFilter] = useState<PersonaFilterKey>('semua');

  const filteredPersonas =
    activeFilter === 'semua'
      ? PERSONAS
      : PERSONAS.filter((p) => p.id === activeFilter);

  return (
    <section id="target" className="py-16 lg:py-24 border-b border-[#E2DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <p className="font-[var(--font-mono)] text-xs font-medium text-[#0E6B7E] tracking-wide mb-3">
            03 · TARGET PASAR &amp; PERSONA PELANGGAN
          </p>
          <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-[-0.025em] text-[#111619] leading-[1.15]">
            Dirancang untuk pemilik kendaraan roda empat di area perkotaan Banda Aceh.
          </h2>
        </div>

        {/* Demographic Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#E2DFD7] bg-white divide-y md:divide-y-0 md:divide-x divide-[#E2DFD7] mb-10">
          {DEMOGRAPHICS_SUMMARY.map((item) => (
            <div key={item.label} className="p-6">
              <p className="font-[var(--font-mono)] text-xs text-[#525C62]">
                {item.label}
              </p>
              <p className="mt-1.5 font-[var(--font-display)] text-xl font-bold text-[#111619] tabular-nums">
                {item.value}
              </p>
              <p className="mt-1.5 text-sm text-[#454F55] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Persona Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFECE5] border border-[#E2DFD7]"
            role="group"
            aria-label="Filter persona pelanggan"
          >
            {FILTER_OPTIONS.map((opt) => {
              const isActive = activeFilter === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setActiveFilter(opt.key)}
                  aria-pressed={isActive}
                  className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#111619] text-[#F7F6F2]'
                      : 'text-[#525C62] hover:text-[#111619]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <span className="font-[var(--font-mono)] text-xs text-[#525C62] tabular-nums">
            Menampilkan {filteredPersonas.length} dari {PERSONAS.length} persona
          </span>
        </div>

        {/* Persona Grid (adapts cleanly when 1 filter is active vs all 4) */}
        <div
          className={`grid gap-6 ${
            filteredPersonas.length === 1
              ? 'grid-cols-1'
              : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {filteredPersonas.map((persona) => {
            const tierAccentText =
              persona.recommendedTierId === 'gold'
                ? 'text-[#9A6A1E]'
                : persona.recommendedTierId === 'silver'
                ? 'text-[#0E6B7E]'
                : 'text-[#111619]';

            const tierNameCap =
              persona.recommendedTierId.charAt(0).toUpperCase() +
              persona.recommendedTierId.slice(1);

            return (
              <article
                key={persona.id}
                className="bg-white border border-[#E2DFD7] p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Quiet unboxed metadata header with typographic separators */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#525C62] mb-3">
                    <span className="font-[var(--font-mono)] text-[#111619] tabular-nums">
                      0{PERSONAS.findIndex((p) => p.id === persona.id) + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{persona.ageOrProfile}</span>
                    <span aria-hidden="true">·</span>
                    <span className={`font-semibold ${tierAccentText}`}>
                      {persona.recommendedTierLabel}
                    </span>
                  </div>

                  <h3 className="font-[var(--font-display)] text-xl font-bold text-[#111619]">
                    {persona.title}
                  </h3>

                  <div
                    className={`mt-4 grid gap-4 ${
                      filteredPersonas.length === 1
                        ? 'grid-cols-1 md:grid-cols-2'
                        : 'grid-cols-1'
                    }`}
                  >
                    <div>
                      <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-wider text-[#525C62] mb-1">
                        Pola Aktivitas
                      </p>
                      <p className="text-sm leading-[1.62] text-[#454F55]">
                        {persona.context}
                      </p>
                    </div>

                    <div>
                      <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-wider text-[#525C62] mb-1">
                        Kebutuhan Utama
                      </p>
                      <p className="text-sm leading-[1.62] text-[#111619]">
                        {persona.primaryNeed}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Persona Footer Strip */}
                <div className="mt-6 pt-5 border-t border-[#E2DFD7] flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-[#525C62] flex items-center gap-2.5">
                    <span>Estimasi cuci:</span>
                    <span className="font-[var(--font-mono)] font-medium text-[#111619] tabular-nums">
                      {persona.washFrequency}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectPersona({
                        tierId: persona.recommendedTierId,
                        vehicle: persona.defaultVehicle,
                        slot: persona.defaultSlot,
                      })
                    }
                    className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 text-xs font-semibold text-[#111619] border border-[#111619]/25 hover:border-[#0E6B7E] hover:text-[#0E6B7E] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Simulasikan Paket {tierNameCap}</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Assumption Disclaimer */}
        <p className="mt-5 text-xs leading-relaxed text-[#525C62]">
          Catatan: Segmentasi demografis perkotaan Banda Aceh dan empat profil persona di
          atas merupakan asumsi ilustratif untuk perancangan layanan dan paket.
        </p>
      </div>
    </section>
  );
}
