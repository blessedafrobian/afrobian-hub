"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/order";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { cn } from "@/components/ui/primitives";

const topics = ["Order / sizing", "Delivery", "Creator collab", "Press / partnership", "Other"];

/**
 * No backend: the form composes a WhatsApp message and opens the chat,
 * so the conversation lands directly with the team.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || message.trim().length < 5) {
      setError("Add your name and a short message.");
      return;
    }
    setError(null);
    const details = [`Name: ${name.trim()}`, ...(city.trim() ? [`City / country: ${city.trim()}`] : []), `Topic: ${topic}`];
    const text = [`Hi ${site.name} 👋`, "", ...details, "", message.trim()].join("\n");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  const field = "h-14 w-full border-b-2 border-ink/25 bg-transparent px-1 text-lg text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-blaze-deep";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="label text-ink/60">Name *</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} placeholder="Your name" required />
        </label>
        <label className="block">
          <span className="label text-ink/60">City / country</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" className={field} placeholder="Casablanca, Morocco" />
        </label>
      </div>
      <fieldset>
        <legend className="label mb-3 text-ink/60">Topic</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={cn("label h-10 border px-4 font-bold transition-colors", topic === t ? "border-ink bg-ink text-bone" : "border-ink/25 text-ink hover:border-ink")}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="label text-ink/60">Message *</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full resize-y border-b-2 border-ink/25 bg-transparent px-1 py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-blaze-deep"
          placeholder="Tell us what you need…"
          required
        />
      </label>
      {error && (
        <p role="alert" className="text-sm font-semibold text-blaze-deep">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="label inline-flex h-14 items-center justify-center gap-3 bg-ink px-8 font-bold text-bone transition-colors hover:bg-blaze hover:text-ink">
          <WhatsAppIcon size={18} /> Send via WhatsApp
        </button>
        <p className="text-sm text-ink/55">Opens WhatsApp with your message ready to send. Nothing is stored on this site.</p>
      </div>
    </form>
  );
}
