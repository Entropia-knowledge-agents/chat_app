import localFont from "next/font/local";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "RAGnasium",
  description: "A technology of entropía.ai",
  openGraph: {
    title: "RAGnasium: track your RAG Agents",
    description:
      "Herramienta de seguridad pública impulsada por IA para tu ciudad. Análisis y comparativas para decisiones informadas.",
    url: "https://pacifico-ai.vercel.app",
    siteName: "Pacífico.ai",
    images: [
      {
        url: "https://pacifico-ai.vercel.app/img/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
