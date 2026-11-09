import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Oswald } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import MobileCallBar from "@/components/MobileCallBar";
import { keywords, site } from "@/lib/site";
import { businessSchema } from "@/lib/schema";
import "./globals.css";

// Brand typography: Montserrat headlines, Oswald labels, Inter body
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["500", "600", "700", "800", "900"] });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400", "500", "600"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mobile Office & Modular Building Transportation | Southern California | Wills Way",
    template: "%s | Wills Way Transport Services",
  },
  description:
    "Wills Way Transport Services LLC moves mobile offices, construction trailers and modular buildings across Los Angeles, the San Fernando Valley and Southern California. Family-owned carrier, 24/7. USDOT 4578902.",
  keywords,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [{ url: "/images/og-share.jpg", width: 1200, height: 630, alt: "Wills Way Transport Services: A Legacy That Keeps Moving" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/og-share.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#010101" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${montserrat.variable} ${oswald.variable} ${inter.variable}`}>
      <body className="pb-16 md:pb-0">
        <JsonLd data={businessSchema} />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
