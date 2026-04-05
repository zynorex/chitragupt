import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

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
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
