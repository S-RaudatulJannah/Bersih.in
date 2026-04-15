'use client'

import { useState } from 'react'
import { LaporanForm } from '@/components/LaporanForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LaporPage() {
  const handleLaporanAdded = () => {
    // Optional: You can add redirect or notification here
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Breadcrumb */}
      <div className="border-b border-primary-200 bg-gradient-to-r from-white/80 to-primary-100/40 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="animate-slide-up">
          <LaporanForm onSuccess={handleLaporanAdded} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-300/30 bg-gradient-to-b from-primary-900 to-primary-800 mt-20 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-3">Bersih.in</h3>
              <p className="text-gray-400 text-sm">Sistem pelaporan sampah liar untuk lingkungan yang lebih bersih</p>
            </div>
            <div>
              <h4 className="text-gray-300 font-semibold text-sm mb-3">Tautan Cepat</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-400 hover:text-gray-200 transition-colors">Beranda</Link></li>
                <li><Link href="/lapor" className="text-gray-400 hover:text-gray-200 transition-colors">Lapor</Link></li>
                <li><Link href="/daftar" className="text-gray-400 hover:text-gray-200 transition-colors">Daftar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-300 font-semibold text-sm mb-3">Ikuti Kami</h4>
              <p className="text-gray-400 text-sm">Tersedia di media sosial untuk update terbaru</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400 text-sm">
              © 2026 Bersih.in. Bersama menjaga lingkungan. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
