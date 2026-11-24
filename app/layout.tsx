import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { site, socials } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/ui/motion-provider";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { JsonLd } from "@/components/ui/json-ld";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const kufi = Noto_Kufi_Arabic({ subsets: ["arabic"], weight: ["500", "800"], variable: "--font-kufi", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Protect Your Peace. Streetwear from Morocco`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["streetwear", "Morocco streetwear", "Maroc", "urban fashion", "creators", "hoodies", "cargo pants", "AFROBIAN HUB"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Protect Your Peace`,
    description: site.description,
    locale: "en_US",
    images: [{ url: "/media/editorial/hero-wide.svg", width: 2400, height: 1350, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  sameAs: [socials.instagram, socials.tiktok],
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", telephone: `+${site.whatsappNumber}`, availableLanguage: ["English", "French", "Arabic"] }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable} ${kufi.variable} antialiased`}>
      <body className="min-h-dvh bg-ink text-bone">
        <a href="#main" className="sr-only z-[100] rounded-full bg-blaze px-5 py-3 text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </MotionProvider>
        <JsonLd data={orgJsonLd} />
      </body>
    </html>
  );
}
