import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Outfit Advisor",
  description: "AI-powered outfit recommendations based on your weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-navy-800 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
