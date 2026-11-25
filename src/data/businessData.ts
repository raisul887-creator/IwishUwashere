export type TierId = 'bronze' | 'silver' | 'gold';

export type PersonaFilterKey =
  | 'semua'
  | 'karyawan'
  | 'keluarga'
  | 'pengusaha'
  | 'driver';

export interface ProblemItem {
  id: string;
  index: string;
  title: string;
  description: string;
  metricNote: string;
  icon: 'queue' | 'price' | 'weather' | 'effort';
}

export interface BusinessAdvantageItem {
  index: string;
  title: string;
  summary: string;
  detail: string;
}

export interface MembershipTier {
  id: TierId;
  name: string;
  subtitle: string;
  monthlyPrice: number;
  priceFormatted: string;
  exteriorQuota: string;
  exteriorQuotaDetail: string;
  estimatedWashesForCalc: number;
  priorityQueue: boolean;
  priorityQueueLabel: string;
  interiorVacuum: boolean;
  interiorVacuumLabel: string;
  detailing: boolean;
  detailingLabel: string;
  bookingChannel: boolean;
  bookingChannelLabel: string;
  accentType: 'neutral' | 'teal' | 'bronze';
  highlightLabel?: string;
  bestFor: string;
  footnote?: string;
}

export interface CompetitorDifference {
  index: string;
  title: string;
  description: string;
  versus: string;
}

export interface PersonaItem {
  id: Exclude<PersonaFilterKey, 'semua'>;
  filterLabel: string;
  title: string;
  ageOrProfile: string;
  recommendedTierLabel: string;
  recommendedTierId: TierId;
  defaultVehicle: string;
  defaultSlot: string;
  context: string;
  primaryNeed: string;
  washFrequency: string;
}

export interface SwotQuadrant {
  letter: 'S' | 'W' | 'O' | 'T';
  title: string;
  indonesianTitle: string;
  accentColor: string;
  borderTopClass: string;
  points: string[];
}

export const HERO_IMAGE_PATH =
  '/src/assets/images/hero_automotive_wash_1795580360844.jpg';
export const DETAILING_IMAGE_PATH =
  '/src/assets/images/detailing_water_beading_1795580362578.jpg';

export const HERO_SPECS = [
  {
    index: '01',
    label: 'Harga Pasti Bulanan',
    detail: 'Biaya tetap terukur tanpa lonjakan tarif saat akhir pekan atau musim hujan.',
  },
  {
    index: '02',
    label: 'Antre Prioritas',
    detail: 'Jalur layanan terpisah bagi anggota agar waktu tunggu lebih singkat.',
  },
  {
    index: '03',
    label: 'Area Banda Aceh',
    detail: 'Dirancang untuk ritme berkendara harian pemilik mobil di perkotaan Banda Aceh.',
  },
];

export const PROBLEMS: ProblemItem[] = [
  {
    id: 'antre-panjang',
    index: '01',
    title: 'Antre Panjang',
    description:
      'Cuci satuan sering menghabiskan 30–60 menit hanya untuk menunggu giliran di akhir pekan atau seusai hujan.',
    metricNote: 'Estimasi 30–60 menit waktu tunggu',
    icon: 'queue',
  },
  {
    id: 'harga-tidak-pasti',
    index: '02',
    title: 'Harga Tidak Pasti',
    description:
      'Tarif cuci satuan berubah-ubah menurut lokasi cucian, dimensi mobil, hingga penyesuaian hari libur.',
    metricNote: 'Fluktuatif per tempat & jenis mobil',
    icon: 'price',
  },
  {
    id: 'kendaraan-kotor-rutin',
    index: '03',
    title: 'Kendaraan Kotor Rutin',
    description:
      'Debu jalanan pesisir dan hujan tropis di Banda Aceh membuat mobil perlu dicuci berkala tiap 1–2 minggu.',
    metricNote: 'Asumsi siklus cuci 1–2 minggu',
    icon: 'weather',
  },
  {
    id: 'buang-waktu-tenaga',
    index: '04',
    title: 'Buang Waktu & Tenaga',
    description:
      'Mencuci sendiri di rumah menyita waktu istirahat, boros air, dan tetap membutuhkan peralatan serta sampo khusus.',
    metricNote: 'Menyita waktu, air & perlengkapan',
    icon: 'effort',
  },
];

export const BUSINESS_ADVANTAGES: BusinessAdvantageItem[] = [
  {
    index: '01',
    title: 'Pendapatan Berulang',
    summary: 'Arus kas tetap dan terprediksi',
    detail:
      'Skema iuran bulanan menciptakan pemasukan berulang (recurring revenue) yang lebih stabil dibanding transaksi cuci satuan yang bergantung cuaca.',
  },
  {
    index: '02',
    title: 'Loyalitas Pelanggan',
    summary: 'Retensi lebih kuat dibanding cuci satuan',
    detail:
      'Pemilik kendaraan yang memiliki kuota cuci aktif dan poin perpanjangan cenderung bertahan di satu tempat yang konsisten.',
  },
  {
    index: '03',
    title: 'Perencanaan Operasi',
    summary: 'Jadwal terstruktur untuk staf, air, & stok sabun',
    detail:
      'Booking terjadwal lewat aplikasi atau WhatsApp membantu tim mengatur shift pencuci, kapasitas bay, penggunaan air, serta pengadaan sabun dan poles.',
  },
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    subtitle: 'Perawatan eksterior rutin untuk pemakaian harian ringan',
    monthlyPrice: 150000,
    priceFormatted: 'Rp 150.000',
    exteriorQuota: '4x / bulan',
    exteriorQuotaDetail: 'Cuci eksterior berkala 1x per minggu',
    estimatedWashesForCalc: 4,
    priorityQueue: false,
    priorityQueueLabel: 'Tidak',
    interiorVacuum: false,
    interiorVacuumLabel: 'Tidak',
    detailing: false,
    detailingLabel: 'Tidak',
    bookingChannel: true,
    bookingChannelLabel: 'Ya (Aplikasi / WhatsApp)',
    accentType: 'neutral',
    bestFor: 'Pemakaian rumah tangga & mobilitas akhir pekan',
  },
  {
    id: 'silver',
    name: 'Silver',
    subtitle: 'Keseimbangan kuota cuci, vakum rutin, dan jalur antre prioritas',
    monthlyPrice: 280000,
    priceFormatted: 'Rp 280.000',
    exteriorQuota: '8x / bulan',
    exteriorQuotaDetail: 'Cuci eksterior hingga 2x per minggu',
    estimatedWashesForCalc: 8,
    priorityQueue: true,
    priorityQueueLabel: 'Ya',
    interiorVacuum: true,
    interiorVacuumLabel: 'Ya (Tiap cuci)',
    detailing: true,
    detailingLabel: '1x / bulan',
    bookingChannel: true,
    bookingChannelLabel: 'Ya (Aplikasi / WhatsApp)',
    accentType: 'teal',
    highlightLabel: 'Pilihan Paling Seimbang',
    bestFor: 'Karyawan, profesional, dan mobil keluarga aktif',
  },
  {
    id: 'gold',
    name: 'Gold',
    subtitle: 'Kebersihan penuh tanpa ragu untuk kendaraan bermobilitas tinggi',
    monthlyPrice: 450000,
    priceFormatted: 'Rp 450.000',
    exteriorQuota: 'Sepuasnya*',
    exteriorQuotaDetail: 'Maks. 1x/hari agar operasional terkendali',
    estimatedWashesForCalc: 16,
    priorityQueue: true,
    priorityQueueLabel: 'Ya (Prioritas Utama)',
    interiorVacuum: true,
    interiorVacuumLabel: 'Ya (Tiap cuci)',
    detailing: true,
    detailingLabel: '2x / bulan + interior',
    bookingChannel: true,
    bookingChannelLabel: 'Ya (Aplikasi / WhatsApp)',
    accentType: 'bronze',
    highlightLabel: 'Prioritas Utama',
    bestFor: 'Pengusaha, UMKM, armada, dan driver taksi online',
    footnote:
      '*Kuota cuci eksterior sepuasnya dibatasi maksimal 1x per hari agar kapasitas bay dan mutu pengerjaan tetap terjaga.',
  },
];

export const COMPETITOR_DIFFERENCES: CompetitorDifference[] = [
  {
    index: '01',
    title: 'Harga Pasti',
    description:
      'Satu tagihan bulanan yang jelas sejak awal. Tidak ada kejutan tarif tambahan saat mobil lebih kotor atau saat hari libur.',
    versus: 'Vs. cuci satuan yang berubah menurut tempat & ukuran mobil',
  },
  {
    index: '02',
    title: 'Antre Prioritas',
    description:
      'Anggota Silver dan Gold memperoleh slot prioritas sehingga tidak perlu menghabiskan 30–60 menit menunggu di ruang tunggu.',
    versus: 'Vs. antrean konvensional tanpa kepastian giliran',
  },
  {
    index: '03',
    title: 'Loyalitas Poin Perpanjangan',
    description:
      'Setiap perpanjangan membership mengumpulkan poin yang dapat ditukar dengan bonus cuci atau perawatan tambahan.',
    versus: 'Vs. transaksi putus tanpa penghargaan bagi pelanggan rutin',
  },
];

export const DEMOGRAPHICS_SUMMARY = [
  {
    label: 'Usia & Profil',
    value: '20–50 Tahun',
    detail: 'Pria & wanita pemilik kendaraan roda empat aktif.',
  },
  {
    label: 'Wilayah Operasi',
    value: 'Banda Aceh',
    detail: 'Fokus area perkotaan dengan kepadatan mobilitas harian (asumsi urban).',
  },
  {
    label: 'Preferensi Layanan',
    value: 'Cepat & Rapi',
    detail: 'Mengutamakan kebersihan konsisten, hemat waktu, serta promo & loyalitas.',
  },
];

export const PERSONAS: PersonaItem[] = [
  {
    id: 'karyawan',
    filterLabel: 'Karyawan & Profesional',
    title: 'Karyawan & Profesional',
    ageOrProfile: 'Usia 25–45 tahun',
    recommendedTierLabel: 'Cocok Paket Silver',
    recommendedTierId: 'silver',
    defaultVehicle: 'City Car / Hatchback',
    defaultSlot: 'Sore (15.00–18.00)',
    context:
      'Menggunakan mobil setiap hari kerja menuju kantor dan pertemuan di pusat kota Banda Aceh, namun waktu luang di akhir pekan terbatas.',
    primaryNeed:
      'Jalur antre prioritas, vakum kabin tiap cuci, dan jadwal pasti sepulang kerja tanpa antre panjang.',
    washFrequency: '6–8x / bulan',
  },
  {
    id: 'keluarga',
    filterLabel: 'Keluarga',
    title: 'Ibu Rumah Tangga / Keluarga',
    ageOrProfile: 'Pengguna MPV & mobil keluarga',
    recommendedTierLabel: 'Cocok Paket Bronze – Silver',
    recommendedTierId: 'bronze',
    defaultVehicle: 'MPV / Mobil Keluarga',
    defaultSlot: 'Pagi (08.00–11.00)',
    context:
      'Rutin mengantar-jemput sekolah, belanja kebutuhan rumah tangga, dan perjalanan keluarga yang membuat bodi serta karpet cepat berdebu.',
    primaryNeed:
      'Anggaran perawatan mobil bulanan yang pasti dan booking praktis via WhatsApp di jam lengang pagi hari.',
    washFrequency: '4–6x / bulan',
  },
  {
    id: 'pengusaha',
    filterLabel: 'Pengusaha & UMKM',
    title: 'Pengusaha & UMKM',
    ageOrProfile: 'Pemilik usaha & operasional',
    recommendedTierLabel: 'Cocok Paket Gold / Corporate',
    recommendedTierId: 'gold',
    defaultVehicle: 'SUV / Crossover',
    defaultSlot: 'Pagi (08.00–11.00)',
    context:
      'Tampilan kendaraan yang selalu bersih menjadi bagian dari citra profesional saat bertemu relasi, klien, atau mengelola distribusi usaha.',
    primaryNeed:
      'Prioritas utama, detailing eksterior & interior 2x/bulan, serta fleksibilitas untuk kendaraan pribadi maupun armada usaha.',
    washFrequency: '10–15x / bulan',
  },
  {
    id: 'driver',
    filterLabel: 'Driver Online',
    title: 'Driver Ojek & Taksi Online',
    ageOrProfile: 'Mobilitas harian intensif',
    recommendedTierLabel: 'Cocok Paket Gold',
    recommendedTierId: 'gold',
    defaultVehicle: 'MPV / Mobil Keluarga',
    defaultSlot: 'Siang (11.00–15.00)',
    context:
      'Beroperasi dari pagi hingga malam melintasi jalan berdebu dan hujan; kebersihan eksterior dan kabin berpengaruh langsung pada penilaian penumpang.',
    primaryNeed:
      'Biaya bulanan tetap dengan akses cuci eksterior sepuasnya (maks. 1x/hari) dan vakum rutin tanpa menggerus pendapatan harian.',
    washFrequency: '15–25x / bulan',
  },
];

export const SWOT_MATRIX: SwotQuadrant[] = [
  {
    letter: 'S',
    title: 'Strength',
    indonesianTitle: 'Kekuatan',
    accentColor: '#0E6B7E',
    borderTopClass: 'border-t-2 border-t-[#0E6B7E]',
    points: [
      'Pendapatan berulang bulanan memberikan arus kas yang lebih stabil dibanding cuci satuan.',
      'Diferensiasi layanan yang jelas: harga pasti, jalur antre prioritas, dan booking via aplikasi atau WhatsApp.',
      'Retensi pelanggan lebih tinggi berkat kuota bulanan aktif dan program poin perpanjangan.',
      'Jadwal kedatangan lebih terukur sehingga pengaturan staf, air, dan stok sabun lebih efisien.',
    ],
  },
  {
    letter: 'W',
    title: 'Weakness',
    indonesianTitle: 'Kelemahan',
    accentColor: '#D45D3B',
    borderTopClass: 'border-t-2 border-t-[#D45D3B]',
    points: [
      'Potensi lonjakan pemakaian pada paket Gold (over-utilization) apabila batas maks. 1x/hari tidak dikelola disiplin.',
      'Memerlukan investasi awal untuk kesiapan bay, peralatan vakum/detailing, serta sistem pencatatan keanggotaan.',
      'Perlu edukasi pasar agar pemilik kendaraan terbiasa beralih dari bayar per datang ke skema langganan bulanan.',
    ],
  },
  {
    letter: 'O',
    title: 'Opportunity',
    indonesianTitle: 'Peluang',
    accentColor: '#111619',
    borderTopClass: 'border-t-2 border-t-[#111619]',
    points: [
      'Populasi kendaraan roda empat pribadi, keluarga, dan transportasi online di Banda Aceh terus bertumbuh.',
      'Belum banyak carwash lokal yang menawarkan model membership terstruktur dengan jalur antre prioritas.',
      'Potensi perluasan ke paket corporate untuk armada UMKM, instansi, serta bundling perawatan detailing berkala.',
    ],
  },
  {
    letter: 'T',
    title: 'Threat',
    indonesianTitle: 'Ancaman',
    accentColor: '#C68B2C',
    borderTopClass: 'border-t-2 border-t-[#C68B2C]',
    points: [
      'Persaingan harga murah dari usaha cuci mobil satuan konvensional di sekitar area perkotaan.',
      'Faktor cuaca musiman: musim hujan memicu penumpukan kedatangan di jam yang sama, sedangkan kemarau panjang bisa menurunkan frekuensi cuci.',
      'Risiko pelanggan berhenti berlangganan (churn) jika standar kebersihan atau janji antre prioritas tidak konsisten.',
    ],
  },
];

export const VEHICLE_TYPES = [
  'City Car / Hatchback',
  'MPV / Mobil Keluarga',
  'SUV / Crossover',
  'Sedan',
  'Armada UMKM / Corporate',
];

export const TIME_SLOTS = [
  'Pagi (08.00–11.00)',
  'Siang (11.00–15.00)',
  'Sore (15.00–18.00)',
  'Akhir Pekan (Sabtu–Minggu)',
];

export const BANDA_ACEH_AREAS = [
  'Baiturrahman',
  'Kuta Alam',
  'Ulee Kareng',
  'Syiah Kuala',
  'Darussalam',
  'Lueng Bata',
  'Banda Raya',
  'Meuraxa / Lainnya',
];
