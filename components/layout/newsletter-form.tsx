"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { socials } from "@/lib/site";
import { cn } from "@/components/ui/primitives";

/**
 * Newsletter interface — UI ONLY.
 * No email provider is connected yet, so nothing is sent or stored. When a
 * provider (Klaviyo, Mailchimp, Brevo…) is chosen, implement the request in
 * `handleSubmit` (ideally through a Server Action or Route Handler) and flip
 * NEWSLETTER_LIVE to true.
 */
const NEWSLETTER_LIVE = false;

type State = { status: "idle" } | { status: "error"; message: string } | { status: "pending-launch" };

export function NewsletterForm({ className }: { className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState({ status: "error", message: "That email doesn't look right — check and try again." });
      return;
    }
    if (!NEWSLETTER_LIVE) {
      setState({ status: "pending-launch" });
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex h-12 items-center rounded-full bg-white/10 pl-5 pr-1.5 focus-within:ring-2 focus-within:ring-white/40">
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state.status !== "idle") setState({ status: "idle" });
          }}
          aria-invalid={state.status === "error"}
          aria-describedby={`${id}-msg`}
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
        />
        <button type="submit" aria-label="Get on the list" className="grid size-9 shrink-0 place-items-center rounded-full bg-bone text-ink transition-colors hover:bg-blaze">
          <ArrowRight className="size-4" />
        </button>
      </div>
      <p id={`${id}-msg`} role="status" aria-live="polite" className="mt-3 min-h-[2.5rem] text-sm text-white/60">
        {state.status === "error" && <span className="text-blaze">{state.message}</span>}
        {state.status === "pending-launch" && (
          <span>
            Sign-ups open soon — we haven&apos;t saved your email. Until then, catch drops first on{" "}
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4">
              Instagram
            </a>
            .
          </span>
        )}
      </p>
    </form>
  );
}
