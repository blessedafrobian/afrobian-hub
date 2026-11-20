import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";
import { site, socials } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/ui/motion-provider";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { JsonLd } from "@/components/ui/json-ld";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Streetwear & Creator Culture`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["streetwear", "Morocco streetwear", "Maroc", "urban fashion", "creators", "hoodies", "cargo pants", "AFROBIAN HUB"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Streetwear & Creator Culture`,
    description: site.description,
    locale: "en_US",
    images: [{ url: "/media/editorial/hero-wide.svg", width: 2400, height: 1350, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
    <html lang="en" className={`${anton.variable} ${archivo.variable} antialiased`}>
      <body className="min-h-dvh bg-white text-ink">
        <a href="#main" className="sr-only z-[100] rounded-full bg-ink px-5 py-3 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
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
