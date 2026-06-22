import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CEO Dashboard | Andorra Park Hotel",
  description: "Executive Intelligence Dashboard – Andorra Park Hotel 5 Stars",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
