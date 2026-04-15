'use client'

import { useEffect, useState } from 'react'
import { Trash2, Eye, AlertCircle, Loader, CheckCircle, Clock, MapPin, User } from 'lucide-react'

interface Laporan {
  id: number
  nama_pelapor: string
  lokasi: string
  tanggal_laporan: string
  status: string
  foto_url?: string
}

export function LaporanTable() {
  const [laporans, setLaporans] = useState<Laporan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLaporans()
  }, [])

  const fetchLaporans = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/laporan')
      if (!response.ok) throw new Error('Gagal mengambil data')
      const data = await response.json()
      setLaporans(data)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (id: number) => {
    try {
      const response = await fetch(`/api/laporan/${id}`, {
        method: 'PUT',
      })
      if (!response.ok) throw new Error('Gagal mengubah status')
      fetchLaporans()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus laporan ini?')) return
    try {
      const response = await fetch(`/api/laporan/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Gagal menghapus')
      fetchLaporans()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-200 backdrop-blur-xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-10 bg-gradient-to-b from-primary-600 to-accent-teal rounded-full shadow-lg" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-900 to-primary-700 bg-clip-text text-transparent">
              Daftar Laporan
            </h2>
          </div>
          <span className="px-4 py-2 bg-gradient-to-r from-primary-600 to-accent-teal text-white rounded-full text-sm font-bold shadow-lg">
            {laporans.length} Laporan
          </span>
        </div>
        <p className="text-gray-600 ml-6">Pantau semua laporan sampah liar yang telah masuk</p>
      </div>

      {error && (
        <div className="flex gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl mb-6">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-gold rounded-full blur-xl opacity-30 animate-pulse" />
            <Loader className="w-16 h-16 text-primary-600 animate-spin relative" />
          </div>
          <p className="text-gray-500 font-medium">Memuat data laporan...</p>
        </div>
      ) : laporans.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-600 text-lg font-semibold">Belum ada laporan sampah</p>
          <p className="text-gray-400 text-sm mt-2">Silakan submit laporan baru menggunakan form di atas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laporans.map((laporan, index) => (
            <div
              key={laporan.id}
              className="group relative bg-white rounded-2xl shadow-soft hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-300 overflow-hidden hover:scale-105 transform animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-accent-gold" />

              <div className="p-6 space-y-5">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                      laporan.status === 'Menunggu'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {laporan.status === 'Menunggu' ? (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        Menunggu
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        Selesai
                      </>
                    )}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Pelapor */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <User className="w-3.5 h-3.5" />
                      <span>Pelapor</span>
                    </div>
                    <p className="text-base font-bold text-gray-900">{laporan.nama_pelapor}</p>
                  </div>

                  {/* Lokasi */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Lokasi</span>
                    </div>
                    <p className="text-sm text-gray-700">{laporan.lokasi}</p>
                  </div>

                  {/* Tanggal */}
                  <div>
                    <p className="text-xs text-gray-400">
                      {new Date(laporan.tanggal_laporan).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 flex gap-3">
                  {laporan.foto_url && (
                    <a
                      href={laporan.foto_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl font-medium hover:from-blue-100 hover:to-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Lihat Foto</span>
                    </a>
                  )}
                  <button
                    onClick={() => handleUpdateStatus(laporan.id)}
                    className="p-2.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-600 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 shadow-sm hover:shadow-md"
                    title="Ubah status"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(laporan.id)}
                    className="p-2.5 bg-gradient-to-r from-red-50 to-red-100 text-red-600 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-200 shadow-sm hover:shadow-md"
                    title="Hapus"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
