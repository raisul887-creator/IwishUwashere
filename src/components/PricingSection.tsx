import React, { useState } from 'react';
import {
  COMPETITOR_DIFFERENCES,
  MEMBERSHIP_TIERS,
  MembershipTier,
  TierId,
} from '../data/businessData';
import {
  ArrowRightIcon,
  CheckMarkIcon,
  DashUnavailableIcon,
} from './Icons';

interface PricingSectionProps {
  onSelectTier: (tierId: TierId) => void;
}

const COMPARISON_ROWS: Array<{
  label: string;
  renderValue: (tier: MembershipTier) => { text: string; available: boolean };
}> = [
  {
    label: 'Kuota cuci eksterior / bulan',
    renderValue: (t) => ({ text: t.exteriorQuota, available: true }),
  },
  {
    label: 'Jalur antre prioritas',
    renderValue: (t) => ({ text: t.priorityQueueLabel, available: t.priorityQueue }),
  },
  {
    label: 'Vakum interior tiap cuci',
    renderValue: (t) => ({ text: t.interiorVacuumLabel, available: t.interiorVacuum }),
  },
  {
    label: 'Detailing / poles berkala',
    renderValue: (t) => ({ text: t.detailingLabel, available: t.detailing }),
  },
  {
    label: 'Booking via aplikasi / WhatsApp',
    renderValue: (t) => ({ text: t.bookingChannelLabel, available: t.bookingChannel }),
  },
];

export function PricingSection({ onSelectTier }: PricingSectionProps) {
  const [showTable, setShowTable] = useState(false);

  return (
    <section id="paket" className="py-16 lg:py-24 border-b border-[#E2DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="font-[var(--font-mono)] text-xs font-medium text-[#0E6B7E] tracking-wide mb-3">
              02 · PAKET KEANGGOTAAN BULANAN
            </p>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-[-0.025em] text-[#111619] leading-[1.15]">
              Tiga pilihan paket sesuai intensitas pemakaian kendaraan.
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] text-[#525C62] leading-relaxed">
              Seluruh tarif, kuota cuci, dan rincian layanan di bawah ini merupakan{' '}
              <strong className="font-semibold text-[#111619]">
                estimasi / asumsi
              </strong>{' '}
              untuk tahap perencanaan bisnis di Banda Aceh.
            </p>
          </div>

          {/* Interactive view switcher: Kartu vs Tabel Perbandingan */}
          <div
            className="inline-flex items-center p-1 bg-[#EFECE5] border border-[#E2DFD7] self-start lg:self-auto shrink-0"
            role="group"
            aria-label="Mode tampilan paket"
          >
            <button
              type="button"
              onClick={() => setShowTable(false)}
              aria-pressed={!showTable}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                !showTable
                  ? 'bg-[#111619] text-[#F7F6F2]'
                  : 'text-[#525C62] hover:text-[#111619]'
              }`}
            >
              Ringkasan Paket
            </button>
            <button
              type="button"
              onClick={() => setShowTable(true)}
              aria-pressed={showTable}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                showTable
                  ? 'bg-[#111619] text-[#F7F6F2]'
                  : 'text-[#525C62] hover:text-[#111619]'
              }`}
            >
              Tabel Perbandingan
            </button>
          </div>
        </div>

        {/* 3-Column Pricing Architecture */}
        {!showTable ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {MEMBERSHIP_TIERS.map((tier) => {
              const isSilver = tier.accentType === 'teal';
              const isGold = tier.accentType === 'bronze';

              const cardSurfaceClass = isGold
                ? 'bg-[#FAF7F0] border-[#D8CCB4] border-t-2 border-t-[#C68B2C]'
                : isSilver
                ? 'bg-white border-[#E2DFD7] border-t-2 border-t-[#0E6B7E]'
                : 'bg-white border-[#E2DFD7] border-t-2 border-t-[#111619]/30';

              const buttonClass = isGold
                ? 'bg-[#111619] hover:bg-[#C68B2C] text-[#F7F6F2]'
                : isSilver
                ? 'bg-[#0E6B7E] hover:bg-[#0A5362] text-[#F7F6F2]'
                : 'bg-transparent border border-[#111619]/30 hover:border-[#111619] text-[#111619] hover:bg-[#111619] hover:text-[#F7F6F2]';

              const costPerWash = Math.round(
                tier.monthlyPrice / tier.estimatedWashesForCalc
              );

              return (
                <article
                  key={tier.id}
                  className={`flex flex-col justify-between border p-6 sm:p-8 ${cardSurfaceClass}`}
                >
                  <div>
                    {/* Quiet top kicker */}
                    <div className="flex items-baseline justify-between gap-2 min-h-[20px] mb-3">
                      <span
                        className={`font-[var(--font-mono)] text-xs font-medium tracking-wide ${
                          isGold
                            ? 'text-[#9A6A1E]'
                            : isSilver
                            ? 'text-[#0E6B7E]'
                            : 'text-[#525C62]'
                        }`}
                      >
                        {tier.highlightLabel
                          ? tier.highlightLabel.toUpperCase()
                          : 'PAKET DASAR'}
                      </span>
                      <span className="font-[var(--font-mono)] text-[11px] text-[#525C62]">
                        ESTIMASI
                      </span>
                    </div>

                    {/* Tier Name & Description */}
                    <h3 className="font-[var(--font-display)] text-2xl font-extrabold text-[#111619] tracking-[-0.02em]">
                      {tier.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#525C62] leading-relaxed min-h-[42px]">
                      {tier.subtitle}
                    </p>

                    {/* Price Block with tabular numerals */}
                    <div className="mt-6 pb-6 border-b border-[#E2DFD7]">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-[var(--font-display)] text-3xl sm:text-[34px] font-extrabold tracking-[-0.03em] text-[#111619] tabular-nums">
                          {tier.priceFormatted}
                        </span>
                        <span className="text-sm text-[#525C62]">/ bulan</span>
                      </div>
                      <p className="mt-1.5 font-[var(--font-mono)] text-xs text-[#525C62] tabular-nums">
                        {tier.id === 'gold'
                          ? `Setara ~Rp ${costPerWash.toLocaleString('id-ID')}/cuci (asumsi 16x/bln)`
                          : `Setara Rp ${costPerWash.toLocaleString('id-ID')} per cuci eksterior`}
                      </p>
                    </div>

                    {/* Feature List */}
                    <ul className="mt-6 space-y-4">
                      <li className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 shrink-0 ${
                            isGold ? 'text-[#9A6A1E]' : 'text-[#0E6B7E]'
                          }`}
                        >
                          <CheckMarkIcon className="w-4 h-4" />
                        </span>
                        <div className="text-sm">
                          <span className="font-semibold text-[#111619] tabular-nums">
                            {tier.exteriorQuota}
                          </span>{' '}
                          <span className="text-[#454F55]">cuci eksterior</span>
                          <p className="text-xs text-[#525C62] mt-0.5">
                            {tier.exteriorQuotaDetail}
                          </p>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 shrink-0 ${
                            tier.priorityQueue
                              ? isGold
                                ? 'text-[#9A6A1E]'
                                : 'text-[#0E6B7E]'
                              : 'text-[#8C9499]'
                          }`}
                        >
                          {tier.priorityQueue ? (
                            <CheckMarkIcon className="w-4 h-4" />
                          ) : (
                            <DashUnavailableIcon className="w-4 h-4" />
                          )}
                        </span>
                        <div className="text-sm flex-1 flex items-baseline justify-between gap-2">
                          <span
                            className={
                              tier.priorityQueue
                                ? 'text-[#111619]'
                                : 'text-[#747E84]'
                            }
                          >
                            Antre prioritas
                          </span>
                          <span
                            className={`font-[var(--font-mono)] text-xs shrink-0 ${
                              tier.priorityQueue
                                ? 'font-medium text-[#111619]'
                                : 'text-[#747E84]'
                            }`}
                          >
                            {tier.priorityQueueLabel}
                          </span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 shrink-0 ${
                            tier.interiorVacuum
                              ? isGold
                                ? 'text-[#9A6A1E]'
                                : 'text-[#0E6B7E]'
                              : 'text-[#8C9499]'
                          }`}
                        >
                          {tier.interiorVacuum ? (
                            <CheckMarkIcon className="w-4 h-4" />
                          ) : (
                            <DashUnavailableIcon className="w-4 h-4" />
                          )}
                        </span>
                        <div className="text-sm flex-1 flex items-baseline justify-between gap-2">
                          <span
                            className={
                              tier.interiorVacuum
                                ? 'text-[#111619]'
                                : 'text-[#747E84]'
                            }
                          >
                            Vakum interior tiap cuci
                          </span>
                          <span
                            className={`font-[var(--font-mono)] text-xs shrink-0 ${
                              tier.interiorVacuum
                                ? 'font-medium text-[#111619]'
                                : 'text-[#747E84]'
                            }`}
                          >
                            {tier.interiorVacuum ? 'Ya' : 'Tidak'}
                          </span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 shrink-0 ${
                            tier.detailing
                              ? isGold
                                ? 'text-[#9A6A1E]'
                                : 'text-[#0E6B7E]'
                              : 'text-[#8C9499]'
                          }`}
                        >
                          {tier.detailing ? (
                            <CheckMarkIcon className="w-4 h-4" />
                          ) : (
                            <DashUnavailableIcon className="w-4 h-4" />
                          )}
                        </span>
                        <div className="text-sm flex-1 flex items-baseline justify-between gap-2">
                          <span
                            className={
                              tier.detailing ? 'text-[#111619]' : 'text-[#747E84]'
                            }
                          >
                            Detailing / poles berkala
                          </span>
                          <span
                            className={`font-[var(--font-mono)] text-xs shrink-0 tabular-nums ${
                              tier.detailing
                                ? 'font-medium text-[#111619]'
                                : 'text-[#747E84]'
                            }`}
                          >
                            {tier.detailingLabel}
                          </span>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 shrink-0 ${
                            isGold ? 'text-[#9A6A1E]' : 'text-[#0E6B7E]'
                          }`}
                        >
                          <CheckMarkIcon className="w-4 h-4" />
                        </span>
                        <div className="text-sm flex-1 flex items-baseline justify-between gap-2">
                          <span className="text-[#111619]">
                            Booking aplikasi / WhatsApp
                          </span>
                          <span className="font-[var(--font-mono)] text-xs font-medium text-[#111619] shrink-0">
                            Ya
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Card Footer Action */}
                  <div className="mt-8 pt-6 border-t border-[#E2DFD7]">
                    <p className="text-xs text-[#525C62] mb-4">
                      Cocok untuk: <span className="text-[#111619]">{tier.bestFor}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelectTier(tier.id)}
                      className={`w-full min-h-[46px] px-5 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer ${buttonClass}`}
                    >
                      <span>Simulasi Paket {tier.name}</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Clean Tabular Comparison Matrix View */
          <div className="bg-white border border-[#E2DFD7] overflow-x-auto">
            <table className="w-full min-w-[680px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E2DFD7] bg-[#EFECE5]/60">
                  <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-[#525C62] w-[34%]">
                    Fitur &amp; Ketentuan (Estimasi)
                  </th>
                  {MEMBERSHIP_TIERS.map((tier) => (
                    <th
                      key={tier.id}
                      className={`py-4 px-5 border-l border-[#E2DFD7] ${
                        tier.id === 'gold'
                          ? 'bg-[#FAF7F0] border-t-2 border-t-[#C68B2C]'
                          : tier.id === 'silver'
                          ? 'border-t-2 border-t-[#0E6B7E]'
                          : ''
                      }`}
                    >
                      <div className="font-[var(--font-display)] text-base font-bold text-[#111619]">
                        {tier.name}
                      </div>
                      <div className="font-[var(--font-mono)] text-sm font-medium text-[#111619] tabular-nums mt-0.5">
                        {tier.priceFormatted}{' '}
                        <span className="text-xs font-normal text-[#525C62]">/bln</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DFD7] text-sm">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label} className="hover:bg-[#F7F6F2]/60">
                    <td className="py-4 px-6 font-medium text-[#111619]">
                      {row.label}
                    </td>
                    {MEMBERSHIP_TIERS.map((tier) => {
                      const val = row.renderValue(tier);
                      return (
                        <td
                          key={tier.id}
                          className={`py-4 px-5 border-l border-[#E2DFD7] tabular-nums ${
                            tier.id === 'gold' ? 'bg-[#FAF7F0]/60' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={
                                val.available
                                  ? tier.id === 'gold'
                                    ? 'text-[#9A6A1E]'
                                    : 'text-[#0E6B7E]'
                                  : 'text-[#8C9499]'
                              }
                            >
                              {val.available ? (
                                <CheckMarkIcon className="w-4 h-4" />
                              ) : (
                                <DashUnavailableIcon className="w-4 h-4" />
                              )}
                            </span>
                            <span
                              className={
                                val.available
                                  ? 'font-medium text-[#111619]'
                                  : 'text-[#747E84]'
                              }
                            >
                              {val.text}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="py-4 px-6 text-xs text-[#525C62]">
                    Pilih paket untuk simulasi jadwal &amp; pesan WhatsApp
                  </td>
                  {MEMBERSHIP_TIERS.map((tier) => (
                    <td
                      key={tier.id}
                      className={`py-4 px-5 border-l border-[#E2DFD7] ${
                        tier.id === 'gold' ? 'bg-[#FAF7F0]/60' : ''
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectTier(tier.id)}
                        className="w-full min-h-[40px] px-4 py-2 text-xs font-semibold bg-[#111619] hover:bg-[#0E6B7E] text-[#F7F6F2] transition-colors duration-150 cursor-pointer whitespace-nowrap"
                      >
                        Pilih {tier.name}
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Explicit Gold & Assumption Footnote */}
        <p className="mt-5 text-xs leading-relaxed text-[#525C62]">
          *Paket Gold berlaku cuci eksterior sepuasnya dengan batas maksimal 1x per hari
          agar operasional dan antrean prioritas tetap terkendali. Seluruh harga dan
          benefit di atas merupakan estimasi / asumsi perencanaan bisnis.
        </p>

        {/* Compact Strip: Beda dengan Kompetitor Cuci Satuan */}
        <div className="mt-12 border border-[#E2DFD7] bg-white">
          <div className="px-6 py-4 border-b border-[#E2DFD7] bg-[#EFECE5]/50 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-[var(--font-display)] text-sm sm:text-base font-bold text-[#111619]">
              Beda dengan Kompetitor Cuci Satuan
            </h3>
            <span className="font-[var(--font-mono)] text-xs text-[#0E6B7E]">
              KEUNGGULAN SKEMA KEANGGOTAAN
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2DFD7]">
            {COMPETITOR_DIFFERENCES.map((diff) => (
              <div key={diff.index} className="p-6">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-[var(--font-mono)] text-xs font-medium text-[#0E6B7E] tabular-nums">
                    {diff.index}
                  </span>
                  <h4 className="font-[var(--font-display)] text-base font-bold text-[#111619]">
                    {diff.title}
                  </h4>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#454F55]">
                  {diff.description}
                </p>
                <p className="mt-3 pt-3 border-t border-[#E2DFD7] text-xs text-[#525C62]">
                  {diff.versus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
