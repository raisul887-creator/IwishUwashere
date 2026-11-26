import React, { useEffect, useRef, useState } from 'react';
import { ChatIcon, CloseIcon, RefreshIcon, SendIcon } from './Icons';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

interface N8nChatbotProps {
  onOpenEstimator: () => void;
}

const QUICK_PROMPTS = [
  'Beda paket Bronze, Silver, dan Gold?',
  'Bagaimana sistem jalur antre prioritas?',
  'Paket mana yang cocok untuk driver online?',
];

function createSessionId(): string {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `uw-${Date.now().toString(36)}-${randomPart}`;
}

function formatCurrentTime(): string {
  return new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function createInitialMessages(): ChatMessage[] {
  return [
    {
      id: 'welcome-1',
      role: 'assistant',
      text: 'Halo, selamat datang di I Wish U Wash Here Banda Aceh. Silakan tanyakan detail paket Bronze, Silver, Gold, antre prioritas, atau estimasi jadwal cuci kendaraan Anda.',
      time: formatCurrentTime(),
    },
  ];
}

export function N8nChatbot({ onOpenEstimator }: N8nChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => createSessionId());
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    createInitialMessages()
  );
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastFailedPrompt, setLastFailedPrompt] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendMessage = async (rawText: string, appendUserBubble = true) => {
    const trimmed = rawText.trim();
    if (!trimmed || isLoading) return;

    setErrorMessage(null);
    setLastFailedPrompt(null);

    if (appendUserBubble) {
      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        text: trimmed,
        time: formatCurrentTime(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message: trimmed,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        setErrorMessage(
          data.error ||
            'Layanan chat sedang tidak dapat dijangkau. Silakan coba beberapa saat lagi.'
        );
        setLastFailedPrompt(trimmed);
        return;
      }

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        text: data.reply,
        time: formatCurrentTime(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setErrorMessage(
        'Koneksi ke server chat terputus. Periksa jaringan Anda lalu coba lagi.'
      );
      setLastFailedPrompt(trimmed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input, true);
  };

  const handleResetChat = () => {
    setSessionId(createSessionId());
    setMessages(createInitialMessages());
    setInput('');
    setErrorMessage(null);
    setLastFailedPrompt(null);
  };

  const handleOpenRegistrationFromChat = () => {
    setIsOpen(false);
    onOpenEstimator();
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-4 py-2.5 bg-[#111619] hover:bg-[#0E6B7E] text-[#F7F6F2] border border-[#111619] text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Buka asisten chat I Wish U Wash Here"
          >
            <ChatIcon className="w-4 h-4 shrink-0" />
            <span>Tanya Asisten</span>
          </button>
        </div>
      )}

      {/* Chatbot Panel */}
      {isOpen && (
        <section
          role="dialog"
          aria-label="Asisten Chat I Wish U Wash Here"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[min(580px,calc(100vh-2rem))] bg-[#F7F6F2] border border-[#111619] flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#111619] text-[#F7F6F2] px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
            <div className="min-w-0">
              <h2 className="font-[var(--font-display)] text-sm font-bold tracking-[0.01em] truncate">
                Asisten I Wish U Wash Here
              </h2>
              <p className="text-[11px] text-[#B8C4C9] truncate">
                Layanan Informasi · Banda Aceh
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleResetChat}
                className="w-9 h-9 inline-flex items-center justify-center border border-white/15 text-[#D7DFE2] hover:text-white hover:border-white/40 transition-colors cursor-pointer"
                aria-label="Mulai ulang percakapan"
                title="Mulai ulang percakapan"
              >
                <RefreshIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 inline-flex items-center justify-center border border-white/15 text-[#D7DFE2] hover:text-white hover:border-white/40 transition-colors cursor-pointer"
                aria-label="Tutup jendela chat"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F7F6F2]"
            aria-live="polite"
          >
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] px-3.5 py-2.5 text-[13.5px] leading-[1.58] whitespace-pre-wrap break-words ${
                      isUser
                        ? 'bg-[#0E6B7E] text-[#F7F6F2]'
                        : 'bg-white border border-[#E2DFD7] text-[#111619]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 font-[var(--font-mono)] text-[10px] text-[#525C62] tabular-nums">
                    {isUser ? 'Anda' : 'Asisten'} · {msg.time}
                  </span>
                </div>
              );
            })}

            {/* Starter Quick Prompts (visible before first user turn) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 space-y-2">
                <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-wider text-[#525C62]">
                  Pertanyaan Cepat
                </p>
                <div className="flex flex-col gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt, true)}
                      className="text-left min-h-[38px] px-3 py-2 bg-white border border-[#E2DFD7] hover:border-[#0E6B7E] text-xs font-medium text-[#111619] hover:text-[#0E6B7E] transition-colors duration-150 cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="px-3.5 py-2.5 bg-white border border-[#E2DFD7] text-xs text-[#525C62]">
                  Memproses jawaban...
                </div>
              </div>
            )}

            {/* Error State with Retry */}
            {errorMessage && (
              <div
                role="alert"
                className="p-3 border border-[#D45D3B] bg-[#D45D3B]/[0.06] text-xs text-[#9D3B1F] space-y-2"
              >
                <p className="leading-relaxed">{errorMessage}</p>
                {lastFailedPrompt && (
                  <button
                    type="button"
                    onClick={() => void sendMessage(lastFailedPrompt, false)}
                    className="inline-flex items-center min-h-[32px] px-3 py-1 bg-[#D45D3B] text-[#F7F6F2] text-xs font-semibold hover:bg-[#B84A2B] transition-colors cursor-pointer"
                  >
                    Coba Kirim Ulang
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quiet Handoff Bar to Membership Estimator */}
          <div className="px-4 py-2 border-t border-[#E2DFD7] bg-[#EFECE5]/70 flex items-center justify-between gap-2 text-[11px] text-[#525C62] shrink-0">
            <span>Siap jadwalkan cuci pertama?</span>
            <button
              type="button"
              onClick={handleOpenRegistrationFromChat}
              className="font-semibold text-[#0E6B7E] hover:text-[#0A5362] underline underline-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Buka Formulir Daftar
            </button>
          </div>

          {/* Composer Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-[#E2DFD7] flex items-center gap-2 shrink-0"
          >
            <label htmlFor="n8n-chat-input" className="sr-only">
              Tulis pesan ke asisten I Wish U Wash Here
            </label>
            <input
              ref={inputRef}
              id="n8n-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              disabled={isLoading}
              placeholder="Tulis pertanyaan Anda..."
              className="flex-1 min-h-[42px] px-3 py-2 bg-[#F7F6F2] border border-[#D4D0C5] text-sm text-[#111619] placeholder:text-[#747E84] focus:border-[#0E6B7E] focus:bg-white focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="min-h-[42px] px-3.5 py-2 bg-[#111619] hover:bg-[#0E6B7E] disabled:bg-[#9DA5AA] text-[#F7F6F2] text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Kirim pesan"
            >
              <SendIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </form>
        </section>
      )}
    </>
  );
}
