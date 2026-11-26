interface VercelReq {
  method?: string;
  body?: unknown;
}

interface VercelRes {
  status: (code: number) => VercelRes;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const MAX_MESSAGE_LENGTH = 1000;
const WEBHOOK_TIMEOUT_MS = 25000;
const DEFAULT_N8N_WEBHOOK_URL = 'https://raisul887.app.n8n.cloud/webhook/ai-agent';

function isPrivateOrBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (
    host === 'localhost' ||
    host === '0.0.0.0' ||
    host === '::1' ||
    host.endsWith('.local') ||
    host.endsWith('.internal')
  ) {
    return true;
  }

  if (
    host.startsWith('fc') ||
    host.startsWith('fd') ||
    host.startsWith('fe80:') ||
    host.includes('::ffff:')
  ) {
    return true;
  }

  const ipv4Match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const a = Number(ipv4Match[1]);
    const b = Number(ipv4Match[2]);
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
  }

  return false;
}

function parseValidatedWebhookUrl(rawUrl: string | undefined): URL | null {
  if (!rawUrl || !rawUrl.trim()) return null;
  try {
    const parsed = new URL(rawUrl.trim());
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }
    if (isPrivateOrBlockedHost(parsed.hostname)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function extractReplyFromPayload(payload: unknown): string | null {
  if (typeof payload === 'string') {
    const trimmed = payload.trim();
    return trimmed.length > 0 ? trimmed.slice(0, 4000) : null;
  }

  if (Array.isArray(payload) && payload.length > 0) {
    return extractReplyFromPayload(payload[0]);
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    const candidateKeys = [
      'reply',
      'output',
      'message',
      'text',
      'response',
      'answer',
      'content',
    ];
    for (const key of candidateKeys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        return value.trim().slice(0, 4000);
      }
    }
    if (record.data && typeof record.data === 'object') {
      return extractReplyFromPayload(record.data);
    }
  }

  return null;
}

function buildLocalFallbackReply(message: string): string {
  const q = message.toLowerCase();

  if (q.includes('bronze') || q.includes('silver') || q.includes('gold') || q.includes('paket') || q.includes('harga')) {
    return [
      'Berikut ringkasan estimasi paket bulanan I Wish U Wash Here Banda Aceh:',
      '- Bronze (Rp 150.000/bln): 4x cuci eksterior/bulan, booking via aplikasi/WhatsApp.',
      '- Silver (Rp 280.000/bln): 8x cuci eksterior/bulan, jalur antre prioritas, vakum interior tiap cuci, dan detailing/poles 1x/bulan.',
      '- Gold (Rp 450.000/bln): cuci eksterior sepuasnya* (maks. 1x/hari), antre prioritas utama, vakum interior tiap cuci, serta detailing 2x/bulan + interior.',
      'Semua tarif bersifat estimasi perencanaan bisnis. Anda bisa membuka tombol "Simulasi Jadwal / Daftar" untuk membuat draf pesan WhatsApp.',
    ].join('\n');
  }

  if (q.includes('antre') || q.includes('prioritas') || q.includes('booking') || q.includes('jadwal')) {
    return 'Anggota paket Silver dan Gold memperoleh akses jalur antre prioritas dengan pemesanan slot lewat aplikasi atau WhatsApp, sehingga tidak perlu menunggu 30–60 menit seperti cuci satuan biasa. Paket Gold mendapat prioritas utama dengan batas maksimal 1x cuci eksterior per hari agar antrean tetap terkendali.';
  }

  if (q.includes('driver') || q.includes('online') || q.includes('taksi') || q.includes('umkm') || q.includes('corporate')) {
    return 'Untuk driver ojek/taksi online maupun pengusaha dan armada UMKM di Banda Aceh, Paket Gold (estimasi Rp 450.000/bln) paling sesuai karena mencakup cuci eksterior sepuasnya (maks. 1x/hari), vakum interior tiap kunjungan, prioritas utama, dan detailing 2x/bulan + interior.';
  }

  if (q.includes('lokasi') || q.includes('alamat') || q.includes('banda aceh')) {
    return 'I Wish U Wash Here dirancang khusus untuk pemilik kendaraan roda empat di area perkotaan Banda Aceh (termasuk Baiturrahman, Kuta Alam, Ulee Kareng, Syiah Kuala, Darussalam, dan Lueng Bata) dengan sistem booking terjadwal.';
  }

  return 'Halo, selamat datang di I Wish U Wash Here Banda Aceh. Saya dapat membantu menjelaskan pilihan paket Bronze (Rp 150.000), Silver (Rp 280.000), Gold (Rp 450.000), jalur antre prioritas, maupun rekomendasi paket sesuai kendaraan Anda. (Saat ini berjalan pada mode panduan lokal hingga N8N_WEBHOOK_URL dihubungkan di server.)';
}

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method === 'GET') {
    const validUrl = parseValidatedWebhookUrl(
      process.env.N8N_WEBHOOK_URL || DEFAULT_N8N_WEBHOOK_URL
    );
    res.status(200).json({ configured: Boolean(validUrl) });
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ error: 'Metode tidak diizinkan.' });
    return;
  }

  const body =
    typeof req.body === 'string'
      ? (() => {
          try {
            return JSON.parse(req.body) as Record<string, unknown>;
          } catch {
            return undefined;
          }
        })()
      : (req.body as Record<string, unknown> | undefined);

  const rawMessage = typeof body?.message === 'string' ? body.message.trim() : '';
  const rawSessionId =
    typeof body?.sessionId === 'string' ? body.sessionId.trim().slice(0, 80) : '';

  if (!rawMessage) {
    res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
    return;
  }

  if (rawMessage.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({
      error: `Pesan maksimal ${MAX_MESSAGE_LENGTH} karakter.`,
    });
    return;
  }

  const sessionId = rawSessionId || `uw-${Date.now()}`;
  const rawWebhookUrl =
    process.env.N8N_WEBHOOK_URL?.trim() || DEFAULT_N8N_WEBHOOK_URL;

  if (!rawWebhookUrl || !rawWebhookUrl.trim()) {
    res.status(200).json({
      reply: buildLocalFallbackReply(rawMessage),
      mode: 'local_fallback',
      configured: false,
    });
    return;
  }

  const validatedUrl = parseValidatedWebhookUrl(rawWebhookUrl);
  if (!validatedUrl) {
    res.status(500).json({
      error:
        'Konfigurasi N8N_WEBHOOK_URL pada server tidak valid. Pastikan menggunakan URL publik http(s) yang benar.',
    });
    return;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain',
    };

    const webhookSecret = process.env.N8N_WEBHOOK_SECRET?.trim();
    if (webhookSecret) {
      headers['X-Webhook-Secret'] = webhookSecret;
    }

    const upstream = await fetch(validatedUrl.toString(), {
      method: 'POST',
      headers,
      redirect: 'error',
      signal: controller.signal,
      body: JSON.stringify({
        sessionId,
        chatInput: rawMessage,
        message: rawMessage,
        source: 'iwish-uwash-here-web',
        location: 'Banda Aceh',
        timestamp: new Date().toISOString(),
      }),
    });

    const contentType = upstream.headers.get('content-type') || '';
    const rawText = await upstream.text();

    if (!upstream.ok) {
      res.status(502).json({
        error: `Webhook n8n merespons dengan status ${upstream.status}. Pastikan workflow aktif dan node Respond to Webhook terkonfigurasi.`,
      });
      return;
    }

    let parsedPayload: unknown = rawText;
    if (contentType.includes('application/json') || rawText.trim().startsWith('{') || rawText.trim().startsWith('[')) {
      try {
        parsedPayload = JSON.parse(rawText);
      } catch {
        parsedPayload = rawText;
      }
    }

    const reply = extractReplyFromPayload(parsedPayload);
    if (!reply) {
      res.status(502).json({
        error:
          'Webhook n8n berhasil dihubungi, namun tidak mengembalikan teks balasan (field reply/output/message/text).',
      });
      return;
    }

    res.status(200).json({
      reply,
      mode: 'n8n',
      configured: true,
    });
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    res.status(504).json({
      error: isAbort
        ? 'Permintaan ke webhook n8n melewati batas waktu (20 detik). Silakan coba lagi.'
        : 'Gagal terhubung ke webhook n8n. Periksa kembali URL webhook dan status aktif workflow Anda.',
    });
  } finally {
    clearTimeout(timer);
  }
}
