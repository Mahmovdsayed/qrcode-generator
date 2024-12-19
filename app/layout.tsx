import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers/Providers";
import Header from "@/components/Layout/Header";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dynamic QR Code Generator",
  description: "Generate QR Codes easily for your URLs with customizable colors.",
  openGraph: {
    title: "Dynamic QR Code Generator",
    description: "Generate QR Codes for your URLs quickly and easily.",
    url: "https://dynamic-qrcode-generator.vercel.app/",
    images: [
      {
        url: "https://res.cloudinary.com/dtpsyi5am/image/upload/v1734574896/bq53vle11tng9h5scmew.jpg",
        alt: "QR Code Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic QR Code Generator",
    description: "Generate QR Codes for your URLs quickly and easily.",
    images: ["https://res.cloudinary.com/dtpsyi5am/image/upload/v1734574896/bq53vle11tng9h5scmew.jpg"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="ltr" className="light" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Providers>
          <Header />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
