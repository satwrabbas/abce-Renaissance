import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "400", "500", "700", "800"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "Our Home | مكتب هندسي عقاري",
  description: "تصميم، إكساء، وتنفيذ مشاريع هندسية في مصياف.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${tajawal.className} antialiased bg-slate-950 text-slate-50`}
      >
        <Navbar />

        {children}
      </body>
    </html>
  );
}
