import React, { useEffect, useMemo, useState } from 'react';
import {
  BANDA_ACEH_AREAS,
  MEMBERSHIP_TIERS,
  TIME_SLOTS,
  TierId,
  VEHICLE_TYPES,
} from '../data/businessData';
import { CheckMarkIcon, CloseIcon, CopyIcon, WhatsAppLineIcon } from './Icons';

interface MembershipDrawerProps {
  isOpen: boolean;
  initialTierId: TierId;
  initialVehicle: string;
  initialSlot: string;
  onClose: () => void;
}

export function MembershipDrawer({
  isOpen,
  initialTierId,
  initialVehicle,
  initialSlot,
  onClose,
}: MembershipDrawerProps) {
  const [selectedTierId, setSelectedTierId] = useState<TierId>(initialTierId);
  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [vehicleType, setVehicleType] = useState(initialVehicle);
  const [preferredSlot, setPreferredSlot] = useState(initialSlot);
  const [area, setArea] = useState(BANDA_ACEH_AREAS[0]);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState(false);

  // Sync preset props when opened from a specific tier or persona card
  useEffect(() => {
    if (isOpen) {
      setSelectedTierId(initialTierId);
      setVehicleType(initialVehicle);
      setPreferredSlot(initialSlot);
      setValidationError(null);
      setSubmittedSummary(false);
    }
  }, [isOpen, initialTierId, initialVehicle, initialSlot]);

  // Escape key & body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const activeTier = useMemo(
    () =>
      MEMBERSHIP_TIERS.find((t) => t.id === selectedTierId) ?? MEMBERSHIP_TIERS[1],
    [selectedTierId]
  );

  const estimatedPerWash = Math.round(
    activeTier.monthlyPrice / activeTier.estimatedWashesForCalc
  );

  const whatsappMessage = useMemo(() => {
    const cleanName = customerName.trim() || '[Nama Anda]';
    const cleanPhone = whatsappNumber.trim() || '[Nomor WhatsApp Anda]';
    const cleanNotes = notes.trim();

    const lines = [
      'Halo tim I Wish U Wash Here Banda Aceh,',
      'Saya ingin mendaftar / simulasi membership carwash bulanan:',
      '',
      `• Nama: ${cleanName}`,
      `• No. WhatsApp: ${cleanPhone}`,
      `• Pilihan Paket: ${activeTier.name} (${activeTier.priceFormatted}/bulan — estimasi)`,
      `• Jenis Kendaraan: ${vehicleType}`,
      `• Area Domisili: ${area}, Banda Aceh`,
      `• Preferensi Jadwal Cuci: ${preferredSlot}`,
    ];

    if (cleanNotes) {
      lines.push(`• Catatan Tambahan: ${cleanNotes}`);
    }

    lines.push(
      '',
      'Mohon informasi jadwal aktivasi keanggotaan dan slot cuci pertama. Terima kasih.'
    );

    return lines.join('\n');
  }, [
    activeTier.name,
    activeTier.priceFormatted,
    area,
    customerName,
    notes,
    preferredSlot,
    vehicleType,
    whatsappNumber,
  ]);

  const whatsappHref = useMemo(() => {
    const encoded = encodeURIComponent(whatsappMessage);
    return `https://wa.me/6281100000000?text=${encoded}`;
  }, [whatsappMessage]);

  const validateForm = (): boolean => {
    const trimmedName = customerName.trim();
    const digitsOnly = whatsappNumber.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setValidationError('Mohon isi nama pemilik kendaraan terlebih dahulu.');
      return false;
    }

    if (digitsOnly.length < 9 || digitsOnly.length > 15) {
      setValidationError(
        'Mohon masukkan nomor WhatsApp aktif yang valid (contoh: 0812xxxxxxxx).'
      );
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setValidationError(
        'Browser membatasi salin otomatis. Silakan blok dan salin teks pratinjau secara manual.'
      );
    }
  };

  const handleConfirmInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmittedSummary(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#111619]/65"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-[#F7F6F2] h-full overflow-y-auto border-l border-[#E2DFD7] flex flex-col">
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 bg-[#F7F6F2] border-b border-[#E2DFD7] px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-[var(--font-mono)] text-xs text-[#0E6B7E]">
              SIMULASI JADWAL &amp; PENDAFTARAN · BANDA ACEH
            </p>
            <h2
              id="drawer-title"
              className="font-[var(--font-display)] text-xl font-bold text-[#111619] mt-1"
            >
              Formulir Minat Membership
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#E2DFD7] bg-white text-[#111619] hover:bg-[#EFECE5] transition-colors cursor-pointer shrink-0"
            aria-label="Tutup panel simulasi membership"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <form onSubmit={handleConfirmInquiry} className="p-6 space-y-6 flex-1">
          {/* Step 1: Tier Selector */}
          <div>
            <label className="block font-[var(--font-mono)] text-xs font-medium text-[#525C62] mb-2.5">
              01 · PILIH PAKET (ESTIMASI BULANAN)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {MEMBERSHIP_TIERS.map((tier) => {
                const active = tier.id === selectedTierId;
                const activeBorder =
                  tier.id === 'gold'
                    ? 'border-[#C68B2C] bg-[#FAF7F0]'
                    : 'border-[#0E6B7E] bg-white';
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTierId(tier.id);
                      setSubmittedSummary(false);
                    }}
                    aria-pressed={active}
                    className={`p-3 text-left border transition-colors duration-150 cursor-pointer ${
                      active
                        ? `${activeBorder} ring-1 ring-inset ${
                            tier.id === 'gold'
                              ? 'ring-[#C68B2C]'
                              : 'ring-[#0E6B7E]'
                          }`
                        : 'border-[#E2DFD7] bg-white hover:border-[#111619]/40'
                    }`}
                  >
                    <div className="font-[var(--font-display)] text-sm font-bold text-[#111619]">
                      {tier.name}
                    </div>
                    <div className="font-[var(--font-mono)] text-xs text-[#454F55] tabular-nums mt-0.5">
                      {tier.priceFormatted}
                    </div>
                    <div className="text-[11px] text-[#525C62] mt-1">
                      {tier.exteriorQuota}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Compact live cost-per-wash readout */}
            <div className="mt-3 p-3.5 bg-[#111619] text-[#F7F6F2] flex flex-wrap items-center justify-between gap-2 text-xs">
              <span>
                Estimasi biaya per cuci ({activeTier.name}):
              </span>
              <span className="font-[var(--font-mono)] font-medium text-[#69C4D6] tabular-nums">
                ~Rp {estimatedPerWash.toLocaleString('id-ID')} / cuci
              </span>
            </div>
          </div>

          {/* Step 2: Owner Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="member-name"
                className="block text-xs font-semibold text-[#111619] mb-1.5"
              >
                Nama Pemilik Kendaraan
              </label>
              <input
                id="member-name"
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setValidationError(null);
                  setSubmittedSummary(false);
                }}
                placeholder="Contoh: Teuku Farhan"
                className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-[#D4D0C5] text-sm text-[#111619] placeholder:text-[#8A9298] focus:border-[#0E6B7E] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="member-wa"
                className="block text-xs font-semibold text-[#111619] mb-1.5"
              >
                Nomor WhatsApp Aktif
              </label>
              <input
                id="member-wa"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => {
                  setWhatsappNumber(e.target.value);
                  setValidationError(null);
                  setSubmittedSummary(false);
                }}
                placeholder="0812 xxxx xxxx"
                className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-[#D4D0C5] text-sm text-[#111619] placeholder:text-[#8A9298] tabular-nums focus:border-[#0E6B7E] focus:outline-none"
              />
            </div>
          </div>

          {/* Step 3: Vehicle, Slot & Banda Aceh Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="vehicle-type"
                className="block text-xs font-semibold text-[#111619] mb-1.5"
              >
                Jenis Kendaraan Roda Empat
              </label>
              <select
                id="vehicle-type"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                  setSubmittedSummary(false);
                }}
                className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-[#D4D0C5] text-sm text-[#111619] focus:border-[#0E6B7E] focus:outline-none"
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="preferred-slot"
                className="block text-xs font-semibold text-[#111619] mb-1.5"
              >
                Preferensi Waktu Cuci
              </label>
              <select
                id="preferred-slot"
                value={preferredSlot}
                onChange={(e) => {
                  setPreferredSlot(e.target.value);
                  setSubmittedSummary(false);
                }}
                className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-[#D4D0C5] text-sm text-[#111619] focus:border-[#0E6B7E] focus:outline-none"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="area-banda-aceh"
                className="block text-xs font-semibold text-[#111619] mb-1.5"
              >
                Kecamatan / Area (Banda Aceh)
              </label>
              <select
                id="area-banda-aceh"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  setSubmittedSummary(false);
                }}
                className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-[#D4D0C5] text-sm text-[#111619] focus:border-[#0E6B7E] focus:outline-none"
              >
                {BANDA_ACEH_AREAS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="extra-notes"
                className="block text-xs font-semibold text-[#111619] mb-1.5"
              >
                Catatan (Opsional)
              </label>
              <input
                id="extra-notes"
                type="text"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setSubmittedSummary(false);
                }}
                placeholder="Mis. 2 unit mobil / corporate"
                className="w-full min-h-[44px] px-3.5 py-2 bg-white border border-[#D4D0C5] text-sm text-[#111619] placeholder:text-[#8A9298] focus:border-[#0E6B7E] focus:outline-none"
              />
            </div>
          </div>

          {/* Live WhatsApp Message Preview */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-[var(--font-mono)] text-xs font-medium text-[#525C62]">
                PRATINJAU PESAN WHATSAPP SIAP KIRIM
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E6B7E] hover:text-[#0A5362] cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckMarkIcon className="w-3.5 h-3.5" />
                    <span>Tersalin</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5" />
                    <span>Salin Teks</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 bg-white border border-[#E2DFD7] text-xs leading-relaxed text-[#2C353A] whitespace-pre-wrap font-[var(--font-sans)]">
              {whatsappMessage}
            </pre>
          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div
              role="alert"
              className="p-3.5 border border-[#D45D3B] bg-[#D45D3B]/[0.06] text-xs font-medium text-[#9D3B1F]"
            >
              {validationError}
            </div>
          )}

          {/* Confirmation State */}
          {submittedSummary && (
            <div
              role="status"
              className="p-4 border border-[#0E6B7E] bg-[#0E6B7E]/[0.06] space-y-2.5"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-[#0E6B7E]">
                <CheckMarkIcon className="w-4 h-4" />
                <span>Simulasi Pesan Pendaftaran Siap Dikirim</span>
              </div>
              <p className="text-xs leading-relaxed text-[#2C353A]">
                Data pendaftaran atas nama{' '}
                <strong className="text-[#111619]">{customerName}</strong> untuk paket{' '}
                <strong className="text-[#111619]">{activeTier.name}</strong> telah
                disiapkan. Gunakan tombol di bawah untuk langsung membuka WhatsApp atau
                menyalin pesan.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 bg-[#0E6B7E] hover:bg-[#0A5362] text-[#F7F6F2] text-xs font-semibold transition-colors"
              >
                <WhatsAppLineIcon className="w-4 h-4" />
                <span>Buka WhatsApp Sekarang</span>
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#E2DFD7] flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 min-h-[46px] px-5 py-3 bg-[#0E6B7E] hover:bg-[#0A5362] text-[#F7F6F2] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer"
            >
              <WhatsAppLineIcon className="w-4 h-4" />
              <span>Siapkan Pesan WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="min-h-[46px] px-5 py-3 border border-[#111619]/30 hover:border-[#111619] text-[#111619] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer whitespace-nowrap"
            >
              {copied ? (
                <>
                  <CheckMarkIcon className="w-4 h-4 text-[#0E6B7E]" />
                  <span>Pesan Tersalin</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] leading-relaxed text-[#525C62]">
            Formulir ini menghasilkan draf pesan WhatsApp untuk simulasi pendaftaran
            keanggotaan I Wish U Wash Here Banda Aceh. Tarif yang tertera bersifat
            estimasi perencanaan bisnis.
          </p>
        </form>
      </div>
    </div>
  );
}
