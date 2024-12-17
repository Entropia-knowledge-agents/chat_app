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
  title: "RAG Lab",
  description: "A technology of entropía.ai",
  openGraph: {
    title: "RAG Lab: Test, Track & Improve your Knowledge Agents",
    description:
      "Herramienta de entropía.ai para probar e interacturar con tus RAG Agents",
    url: "https://rag-agent-dgcda0ekcphcgcc8.eastus-01.azurewebsites.net/login?callbackUrl=%2F",
    siteName: "RAG Lab",
    images: [
      {
        url: "https://www.entropia.ai/sections/assets/ENT_Logotipo_Negro.png",
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
