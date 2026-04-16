import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bersih.in - Sistem Pelaporan Sampah Liar",
  description:
    "Platform modern untuk melaporkan dan mengelola sampah liar di lingkungan sekitar Anda",
  keywords: ["sampah", "lingkungan", "pelaporan", "kebersihan"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-br from-white via-gray-50 to-white">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
