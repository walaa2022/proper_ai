import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROP_AI | Real Estate for Everyone",
  description:
    "Find a home, rent, or invest — and run your real estate business on one platform. PROP_AI serves buyers, renters, investors, brokers, developers, agents, and property managers.",
};

import { LanguageProvider } from '@/context/LanguageContext';
import WhatsAppButton from '@/components/WhatsAppButton';
import ChatbotButton from '@/components/ChatbotButton';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <LanguageProvider>
          <main id="main-content">{children}</main>
          <WhatsAppButton />
          <ChatbotButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
