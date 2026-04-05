import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono-google",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CHITRAGUPT | Decentralized Whistleblower Vault",
  description:
    "A decentralized censorship proof whistleblower platform. Upload encrypted evidence that gets sharded and stored on chain forever. Truth cannot be deleted.",
  keywords: [
    "whistleblower",
    "decentralized",
    "blockchain",
    "encryption",
    "IPFS",
    "Arweave",
    "dead man switch",
    "anonymous",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} min-h-screen flex flex-col antialiased`}>
        {/* Background Base */}
        <div className="fixed inset-0 dot-grid pointer-events-none -z-10 bg-yellow-400" />
        
        <Navbar />
        <main className="flex-1 flex flex-col pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
