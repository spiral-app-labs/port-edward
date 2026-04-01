import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const siteUrl = "https://port-edward-redesign.vercel.app";

export const metadata: Metadata = {
  title: "Port Edward Restaurant | Fine Seafood & Steaks Since 1964 — Algonquin, IL",
  description:
    "A unique dining experience since 1964. Award-winning lobster rolls, signature Shrimp DeJonghe, fresh seafood, prime steaks, and Sunday Champagne Brunch on the Fox River. Algonquin, IL.",
  keywords: [
    "Port Edward Restaurant",
    "Algonquin IL restaurant",
    "seafood restaurant Algonquin",
    "lobster roll Fox River",
    "Sunday brunch Algonquin",
    "fine dining McHenry County",
    "steakhouse Algonquin",
    "champagne brunch Illinois",
  ],
  openGraph: {
    title: "Port Edward Restaurant — Fine Seafood & Steaks Since 1964",
    description:
      "Port Edward Restaurant · 20 W Algonquin Rd, Algonquin, IL · 4.4★ (410 reviews) · Seafood, Steaks & Sunday Champagne Brunch since 1964.",
    url: siteUrl,
    siteName: "Port Edward Restaurant",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Port Edward Restaurant — Fine Seafood & Steaks Since 1964, Algonquin IL. 4.4★",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Port Edward Restaurant — Fine Seafood & Steaks Since 1964",
    description:
      "Port Edward Restaurant · 20 W Algonquin Rd, Algonquin, IL · 4.4★ · Seafood & Sunday Champagne Brunch since 1964.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Port Edward Restaurant",
              image: `${siteUrl}/og-image.jpg`,
              url: siteUrl,
              telephone: "+18476585441",
              address: {
                "@type": "PostalAddress",
                streetAddress: "20 W Algonquin Rd",
                addressLocality: "Algonquin",
                addressRegion: "IL",
                postalCode: "60102",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 42.1564,
                longitude: -88.2882,
              },
              servesCuisine: ["Seafood", "American", "Steakhouse"],
              priceRange: "$$-$$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.4",
                reviewCount: "410",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
                  opens: "15:00",
                  closes: "22:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Friday",
                  opens: "15:00",
                  closes: "23:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "11:00",
                  closes: "23:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "09:30",
                  closes: "22:00",
                },
              ],
              menu: `${siteUrl}/menu`,
              acceptsReservations: "True",
              hasMap: "https://maps.google.com/?q=Port+Edward+Restaurant+Algonquin+IL",
              description:
                "A unique dining experience since 1964. Award-winning lobster rolls, signature Shrimp DeJonghe, fresh seafood & steaks on the Fox River.",
            }),
          }}
        />
      </head>
      <body className={`${inter.className} bg-navy-950 text-cream-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
