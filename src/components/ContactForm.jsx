import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      toast.success("Mesajın gönderildi! Teşekkürler.");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      toast.error("Gönderim başarısız. Lütfen tekrar dene.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container-outer max-w-[600px]">
        <h2 className="font-bold mb-6" style={{ fontSize: "48px", lineHeight: "1.1", color: "#4731D3" }}>
          Send me a message!
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input name="name" required className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#1f1f2e]" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" name="email" required className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#1f1f2e]" />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea name="message" rows="6" required className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#1f1f2e]" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-md text-white"
            style={{ background: "#4731D3" }}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
