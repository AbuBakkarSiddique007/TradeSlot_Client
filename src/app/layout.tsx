import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradeSlot - Smart Buffer Booking for Tradespeople",
  description: "Automated booking engine with 30-minute travel buffer scheduling, dual WhatsApp & Web Chatbot intake, and direct Stripe Connect payouts.",
  keywords: ["tradesman booking", "travel buffer scheduling", "stripe connect payouts", "whatsapp booking bot", "electrician booking", "plumber diary"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#080c14] text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

