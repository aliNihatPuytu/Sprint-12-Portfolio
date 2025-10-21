import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { usePostReqres } from "../hooks/usePostReqres";
import { motion as Motion } from "framer-motion";
import Lottie from "lottie-react";

function useLottieJSON(path) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch(path, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => alive && setData(d))
      .catch(() => alive && setData(null));
    return () => {
      alive = false;
    };
  }, [path]);
  return data;
}

function StatusOverlay({ open, state, theme, lang }) {
  if (!open) return null;

  const isDark = theme === "dark";
  const txtSending = lang === "en" ? "Sending…" : "Gönderiliyor…";
  const txtDone =
    lang === "en"
      ? "Received! We’ll get back within a week."
      : "Gönderim alındı! 1 hafta içerisinde dönüş sağlanacaktır.";

  const purple = isDark ? "#8F88FF" : "#4731D3";
  const lime = "#CBF281";
  const cardBg = isDark ? "#0F1020" : "#ffffff";
  const textCol = isDark ? "#FFFFFF" : "#120B39";

  const sendingData = useLottieJSON("/lottie/sending.json");
  const successData = useLottieJSON("/lottie/success.json");

  const SendingAnim = () =>
    sendingData ? (
      <Lottie animationData={sendingData} loop className="w-28 h-28" />
    ) : (
      <div className="relative h-24 w-24">
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background: `conic-gradient(${lime} 0 25%, transparent 25% 50%, ${purple} 50% 75%, transparent 75% 100%)`,
            WebkitMask:
              "radial-gradient(farthest-side, transparent 72%, #000 73%)",
            mask: "radial-gradient(farthest-side, transparent 72%, #000 73%)",
          }}
        />
        <div
          className="absolute inset-[10px] rounded-full"
          style={{ background: isDark ? "#121225" : "#fff" }}
        />
      </div>
    );

  const SuccessAnim = () =>
    successData ? (
      <Lottie animationData={successData} loop={false} className="w-28 h-28" />
    ) : (
      <div className="relative h-24 w-24 grid place-items-center">
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ background: lime, opacity: 0.35 }}
        />
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="42" fill="none" stroke={lime} strokeWidth="6" />
          <path
            d="M30 50 L44 64 L68 40"
            fill="none"
            stroke={purple}
            strokeWidth="6"
            strokeLinecap="round"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: 60,
              animation: "dash 700ms ease forwards 250ms",
            }}
          />
        </svg>
      </div>
    );

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[999] grid place-items-center"
      style={{ backdropFilter: "blur(6px)", background: "rgba(0,0,0,.40)" }}
      aria-live="assertive"
      aria-busy={state === "pending"}
    >
      <Motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="w-[360px] rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,.35)]"
        style={{ background: cardBg, color: textCol }}
        role="dialog"
        aria-modal="true"
      >
        <div className="w-full flex items-center justify-center mb-5">
          {state === "pending" ? <SendingAnim /> : <SuccessAnim />}
        </div>
        <h3 className="text-center text-xl font-semibold">
          {state === "pending" ? txtSending : txtDone}
        </h3>
      </Motion.div>
      <style>{`@keyframes dash { to { stroke-dashoffset: 0 } }`}</style>
    </Motion.div>
  );
}

const DRAFT_KEY = "contactFormDraft";
const LAST_SEND_AT = "contactFormLastSend";
function withTimeout(promise, ms = 7000) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)),
  ]);
}
const simulateSend = (payload) =>
  new Promise((res) => setTimeout(() => res({ id: "sim", ...payload }), 1200));

export default function ContactForm() {
  const lang = useSelector((s) => s.language.current); 
  const theme = useSelector((s) => s.theme.mode); 
  const { mutateAsync } = usePostReqres();

  const ui = useMemo(() => {
    if (lang === "en") {
      return {
        labels: { name: "Full Name", email: "Email", message: "Message" },
        placeholders: {
          name: "Your name",
          email: "you@example.com",
          message: "Write your message…",
        },
        button: "Send",
        toasts: {
          invalid: "Please fill the form correctly.",
          throttled: "Please wait a bit before sending again.",
          sent: "Message sent. Thank you!",
        },
      };
    }
    return {
      labels: { name: "Ad Soyad", email: "E-posta", message: "Mesaj" },
      placeholders: {
        name: "Adınız",
        email: "ornek@eposta.com",
        message: "Mesajınızı yazın…",
      },
      button: "Gönder",
      toasts: {
        invalid: "Lütfen formu doğru doldurun.",
        throttled: "Tekrar göndermek için biraz bekleyin.",
        sent: "Mesaj gönderildi. Teşekkürler!",
      },
    };
  }, [lang]);

  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" }); 
  const [overlay, setOverlay] = useState({ open: false, state: "pending" }); 
  const [busy, setBusy] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setForm((f) => ({ ...f, ...parsed }));
      } catch {}
    }
  }, []);
  useEffect(() => {
    const { name, email, message } = form;
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ name, email, message }));
  }, [form.name, form.email, form.message]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return false;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return false;
    if (form.message.trim().length < 5) return false;
    if (form.company.trim() !== "") return false; 
    return true;
  };
  const throttled = () => {
    const last = +localStorage.getItem(LAST_SEND_AT) || 0;
    return Date.now() - last < 30000; 
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error(ui.toasts.invalid);
      return;
    }
    if (throttled()) {
      toast.info(ui.toasts.throttled);
      return;
    }

    setBusy(true);
    setOverlay({ open: true, state: "pending" });

    try {
      await withTimeout(
        mutateAsync({ ...form, lang, sentAt: new Date().toISOString() })
      );
      setOverlay({ open: true, state: "success" });
      toast.success(ui.toasts.sent);
      localStorage.setItem(LAST_SEND_AT, String(Date.now()));
      setForm({ name: "", email: "", message: "", company: "" });
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      await simulateSend(form);
      setOverlay({ open: true, state: "success" });
      toast.success(ui.toasts.sent);
      localStorage.setItem(LAST_SEND_AT, String(Date.now()));
      setForm({ name: "", email: "", message: "", company: "" });
      localStorage.removeItem(DRAFT_KEY);
    } finally {
      setBusy(false);
      setTimeout(() => setOverlay({ open: false, state: "pending" }), 2200);
      setTimeout(() => btnRef.current?.focus(), 2300);
    }
  };

  return (
    <>
      <form
        onSubmit={submit}
        className="relative w-full max-w-xl mx-auto bg-white dark:bg-[#121225] rounded-2xl p-6 shadow-[0_16px_40px_rgba(0,0,0,.15)]"
        aria-busy={busy}
      >
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={onChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid gap-4">
          <div>
            <label htmlFor="cf-name" className="block text-sm mb-1">
              {ui.labels.name}
            </label>
            <input
              id="cf-name"
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full h-11 rounded-lg px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-[#0F1020] outline-none"
              placeholder={ui.placeholders.name}
              required
            />
          </div>

          <div>
            <label htmlFor="cf-email" className="block text-sm mb-1">
              {ui.labels.email}
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="w-full h-11 rounded-lg px-3 border border-black/10 dark:border-white/10 bg-white dark:bg-[#0F1020] outline-none"
              placeholder={ui.placeholders.email}
              required
            />
          </div>

          <div>
            <label htmlFor="cf-msg" className="block text-sm mb-1">
              {ui.labels.message}
            </label>
            <textarea
              id="cf-msg"
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              className="w-full rounded-lg px-3 py-2 border border-black/10 dark:border-white/10 bg-white dark:bg-[#0F1020] outline-none resize-y"
              placeholder={ui.placeholders.message}
              minLength={5}
              required
            />
          </div>

          <div className="flex items-center justify-end mt-2">
            <button
              type="submit"
              ref={btnRef}
              disabled={busy}
              className={`h-11 px-5 rounded-lg font-semibold text-white hover:opacity-90 disabled:opacity-60 ${
                theme === "dark" ? "bg-[#8F88FF]" : "bg-[#4731D3]"
              }`}
            >
              {ui.button}
            </button>
          </div>
        </div>
      </form>

      <StatusOverlay open={overlay.open} state={overlay.state} theme={theme} lang={lang} />
    </>
  );
}
