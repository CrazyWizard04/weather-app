import "./globals.css";

import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "@/app/components/providers/Providers";

const dmSansItalic = localFont({
  src: "./fonts/DMSans-Italic-VF.ttf",
  variable: "--font-dmSans-italic",
});

const dmSans = localFont({
  src: "./fonts/DMSans-VF.ttf",
  variable: "--font-dmSans",
});

const bricolage = localFont({
  src: "./fonts/BricolageGrotesque-VF.ttf",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Weather App",
  description:
    "Stay ahead of the weather with real-time forecasts, live updates, and alerts—simple, accurate, and always at your fingertips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${dmSansItalic.variable} ${dmSans.variable} ${bricolage.variable}`}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
