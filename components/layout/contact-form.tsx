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

  const field = "mt-2 h-12 w-full rounded-lg border border-line bg-white px-4 text-ink outline-none transition-colors placeholder:text-mute focus:border-ink";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Name *</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} placeholder="Your name" required />
        </label>
        <label className="block">
          <span className="text-sm font-medium">City / country</span>
          <input value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" className={field} placeholder="Casablanca, Morocco" />
        </label>
      </div>
      <fieldset>
        <legend className="mb-2 text-sm font-medium">Topic</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={cn("h-10 rounded-full px-4 text-sm font-medium transition-colors", topic === t ? "bg-ink text-white" : "bg-mist hover:bg-line")}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="text-sm font-medium">Message *</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="mt-2 w-full resize-y rounded-lg border border-line bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-mute focus:border-ink"
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
        <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-medium text-white transition-colors hover:bg-ink/75">
          <WhatsAppIcon size={18} /> Send via WhatsApp
        </button>
        <p className="text-sm text-mute">Opens WhatsApp with your message ready to send. Nothing is stored on this site.</p>
      </div>
    </form>
  );
}
