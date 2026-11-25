import React, { useState } from 'react';
import {
  BUSINESS_ADVANTAGES,
  DETAILING_IMAGE_PATH,
  PROBLEMS,
  ProblemItem,
} from '../data/businessData';
import {
  FluctuatingPriceIcon,
  HomeEffortIcon,
  QueueClockIcon,
  WeatherDustIcon,
} from './Icons';

function renderProblemIcon(icon: ProblemItem['icon']) {
  switch (icon) {
    case 'queue':
      return <QueueClockIcon className="w-5 h-5" />;
    case 'price':
      return <FluctuatingPriceIcon className="w-5 h-5" />;
    case 'weather':
      return <WeatherDustIcon className="w-5 h-5" />;
    case 'effort':
      return <HomeEffortIcon className="w-5 h-5" />;
  }
}

export function ProblemValueSection() {
  const [detailImgError, setDetailImgError] = useState(false);

  return (
    <section id="masalah" className="py-16 lg:py-24 border-b border-[#E2DFD7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <div className="max-w-3xl mb-12">
          <p className="font-[var(--font-mono)] text-xs font-medium text-[#D45D3B] tracking-wide mb-3">
            01 · LATAR BELAKANG &amp; MODEL BISNIS
          </p>
          <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-[-0.025em] text-[#111619] leading-[1.15]">
            Mengurai kendala cuci mobil satuan lewat sistem keanggotaan bulanan.
          </h2>
        </div>

        {/* Split Layout: Part A (Masalah) + Part B (Mengapa Menarik) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Part A: Masalah yang Diselesaikan */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-[#E2DFD7] p-6 sm:p-8 lg:p-10">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-6 border-b border-[#E2DFD7]">
                <h3 className="font-[var(--font-display)] text-xl font-bold text-[#111619]">
                  Masalah yang Diselesaikan
                </h3>
                <span className="font-[var(--font-mono)] text-xs text-[#D45D3B]">
                  4 KENDALA UTAMA PELANGGAN
                </span>
              </div>

              <div className="divide-y divide-[#E2DFD7]">
                {PROBLEMS.map((item) => (
                  <div
                    key={item.id}
                    className="py-6 first:pt-6 last:pb-2 grid grid-cols-[auto_1fr] gap-4 sm:gap-5 items-start"
                  >
                    <div className="w-10 h-10 flex items-center justify-center border border-[#D45D3B]/30 bg-[#D45D3B]/[0.05] text-[#D45D3B] shrink-0 mt-0.5">
                      {renderProblemIcon(item.icon)}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h4 className="font-[var(--font-display)] text-base sm:text-[17px] font-bold text-[#111619]">
                          {item.title}
                        </h4>
                        <span className="font-[var(--font-mono)] text-xs text-[#525C62] tabular-nums">
                          {item.metricNote}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm sm:text-[15px] leading-[1.6] text-[#454F55]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 pt-5 border-t border-[#E2DFD7] text-xs leading-relaxed text-[#525C62]">
              Catatan asumsi: Estimasi waktu antre 30–60 menit dan kebutuhan cuci rutin
              tiap 1–2 minggu merupakan asumsi studi kasus untuk perencanaan layanan.
            </p>
          </div>

          {/* Part B: Mengapa Usaha Ini Menarik (Dark Contrast Band) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#111619] text-[#F7F6F2] border border-[#111619] p-6 sm:p-8 lg:p-10">
            <div>
              <div className="pb-6 border-b border-white/15">
                <p className="font-[var(--font-mono)] text-xs text-[#69C4D6] tracking-wide mb-2">
                  NILAI KEBERLANJUTAN USAHA
                </p>
                <h3 className="font-[var(--font-display)] text-xl sm:text-2xl font-bold text-[#F7F6F2] tracking-[0.01em]">
                  Mengapa Usaha Ini Menarik
                </h3>
              </div>

              <ol className="divide-y divide-white/12">
                {BUSINESS_ADVANTAGES.map((adv) => (
                  <li key={adv.index} className="py-6 first:pt-6 last:pb-2">
                    <div className="flex items-baseline gap-3.5">
                      <span className="font-[var(--font-mono)] text-sm font-medium text-[#69C4D6] tabular-nums shrink-0">
                        {adv.index}
                      </span>
                      <div>
                        <h4 className="font-[var(--font-display)] text-base sm:text-[17px] font-bold text-[#F7F6F2] tracking-[0.01em]">
                          {adv.title}
                        </h4>
                        <p className="text-xs font-medium text-[#B8C4C9] mt-0.5">
                          {adv.summary}
                        </p>
                        <p className="mt-2.5 text-sm leading-[1.62] text-[#D7DFE2] tracking-[0.01em]">
                          {adv.detail}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 pt-5 border-t border-white/15">
              <p className="text-xs leading-relaxed text-[#A8B4BA] tracking-[0.01em]">
                Model langganan mengubah pola cuci yang sporadis menjadi jadwal operasi
                yang terukur di Banda Aceh.
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Media Rhythm Strip */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 border border-[#E2DFD7] bg-white overflow-hidden">
          <div className="lg:col-span-5 relative min-h-[200px] sm:min-h-[240px] bg-[#111619]">
            {!detailImgError ? (
              <img
                src={DETAILING_IMAGE_PATH}
                alt="Butiran air pada permukaan cat mobil gelap setelah proses cuci dan detailing berkala"
                referrerPolicy="no-referrer"
                onError={() => setDetailImgError(true)}
                className="w-full h-full object-cover object-[78%_72%]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-6 text-center text-[#D7DFE2] bg-[#111619]">
                <span className="font-[var(--font-mono)] text-xs">
                  STANDAR FINISHING EKSTERIOR &amp; DETAILING
                </span>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            <p className="font-[var(--font-mono)] text-xs text-[#0E6B7E] mb-2">
              STANDAR OPERASIONAL TERJADWAL
            </p>
            <h3 className="font-[var(--font-display)] text-lg sm:text-xl font-bold text-[#111619]">
              Bukan sekadar bilas cepat, melainkan rutinitas perawatan yang konsisten.
            </h3>
            <p className="mt-2.5 text-sm sm:text-[15px] leading-[1.62] text-[#454F55] max-w-[62ch]">
              Dengan slot booking via WhatsApp atau aplikasi, tim pencuci mengetahui
              volume kendaraan harian lebih awal. Hasilnya: tekanan air, takaran sampo,
              vakum kabin, hingga jadwal poles berkala tetap seragam meski sedang musim
              hujan di Banda Aceh.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
