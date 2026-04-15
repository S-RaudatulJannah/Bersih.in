'use client'

import Link from 'next/link'
import { Leaf, Zap, Heart, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-white pointer-events-none" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl -z-10 animate-floating" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-accent-teal/10 rounded-full blur-3xl -z-10 animate-floating" />

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <div className="mb-8">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-dark-900 leading-tight pb-2">
                  Jaga Lingkungan Anda
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-dark-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                Laporkan sampah liar dengan mudah dan bantu kami membangun komunitas yang lebih bersih dan sehat
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link
                  href="/lapor"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white font-semibold rounded-xl hover:bg-primary-800 transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
                >
                  Lapor Sekarang
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/daftar"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl border-2 border-primary-700 hover:bg-primary-50 transition-all duration-300 shadow-sm active:scale-95"
                >
                  Lihat Laporan
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-primary-200 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-primary-700">100+</div>
                  <div className="text-xs text-dark-600 font-medium mt-1">Laporan</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-accent-teal/30 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-accent-teal">50+</div>
                  <div className="text-xs text-dark-600 font-medium mt-1">Dibersihkan</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-accent-green/30 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-accent-green">1K+</div>
                  <div className="text-xs text-dark-600 font-medium mt-1">Kontribusi</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 border border-primary-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-5 shadow-sm">
                  <Zap className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">Cepat & Mudah</h3>
                <p className="text-sm text-dark-600 leading-relaxed">Laporkan dalam hitungan detik dengan form yang sederhana</p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-accent-teal/30 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-accent-teal/10 rounded-xl flex items-center justify-center mb-5 shadow-sm">
                  <Leaf className="w-6 h-6 text-accent-teal" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">Ramah Lingkungan</h3>
                <p className="text-sm text-dark-600 leading-relaxed">Berkontribusi langsung menjaga kelestarian lingkungan</p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-accent-green/30 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-accent-green/10 rounded-xl flex items-center justify-center mb-5 shadow-sm">
                  <Heart className="w-6 h-6 text-accent-green" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-2">Bersama Kita Kuat</h3>
                <p className="text-sm text-dark-600 leading-relaxed">Bergabung dengan ribuan pengguna peduli lingkungan</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-200 bg-dark-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Bersih.in</h3>
              <p className="text-sm text-dark-300">Sistem pelaporan sampah liar untuk lingkungan lebih bersih</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Tautan</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-dark-300 hover:text-white transition-colors">Beranda</Link></li>
                <li><Link href="/lapor" className="text-dark-300 hover:text-white transition-colors">Lapor</Link></li>
                <li><Link href="/daftar" className="text-dark-300 hover:text-white transition-colors">Daftar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Info</h4>
              <p className="text-sm text-dark-300">Update terbaru tersedia di media sosial</p>
            </div>
          </div>
          <div className="border-t border-dark-700 pt-8">
            <p className="text-center text-sm text-dark-400">
              © 2026 Bersih.in. Bersama menjaga lingkungan.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
