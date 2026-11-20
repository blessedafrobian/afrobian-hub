"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Info } from "lucide-react";
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

export function NewsletterForm({ tone = "dark", className }: { tone?: "dark" | "light" | "blaze"; className?: string }) {
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

  const styles = {
    dark: { field: "border-bone/30 text-bone placeholder:text-bone/40 focus:border-blaze", btn: "bg-blaze text-ink hover:bg-bone", note: "text-bone/60" },
    light: { field: "border-ink/30 text-ink placeholder:text-ink/40 focus:border-ink", btn: "bg-ink text-bone hover:bg-blaze hover:text-ink", note: "text-ink/60" },
    blaze: { field: "border-ink/40 text-ink placeholder:text-ink/50 focus:border-ink", btn: "bg-ink text-bone hover:bg-bone hover:text-ink", note: "text-ink/70" },
  }[tone];

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state.status !== "idle") setState({ status: "idle" });
          }}
          aria-invalid={state.status === "error"}
          aria-describedby={`${id}-msg`}
          className={cn("h-14 min-w-0 flex-1 border-b-2 bg-transparent px-1 font-mono text-sm outline-none transition-colors", styles.field)}
        />
        <button type="submit" className={cn("label inline-flex h-14 items-center justify-center gap-2 px-7 font-bold transition-colors", styles.btn)}>
          Get on the list <ArrowRight className="size-4" />
        </button>
      </div>
      <p id={`${id}-msg`} role="status" aria-live="polite" className={cn("mt-3 min-h-[2.5rem] text-sm", styles.note)}>
        {state.status === "error" && <span className="font-semibold">{state.message}</span>}
        {state.status === "pending-launch" && (
          <span className="flex items-start gap-2">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              Sign-ups open soon — we haven&apos;t saved your email. Until then, catch drops first on{" "}
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                Instagram
              </a>
              .
            </span>
          </span>
        )}
        {state.status === "idle" && "Drops, restocks and culture. No spam."}
      </p>
    </form>
  );
}
