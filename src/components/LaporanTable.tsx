"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  AlertCircle,
  Loader,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Zap,
  Info,
  X,
} from "lucide-react";

type LaporanStatus = "Menunggu" | "Diproses" | "Selesai";

interface Laporan {
  id: string;
  nama_pelapor: string;
  lokasi: string;
  deskripsi?: string;
  tanggal_laporan: string;
  status: LaporanStatus;
  foto_url?: string;
}

interface StatusOption {
  value: LaporanStatus;
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "Menunggu",
    label: "Menunggu",
    color: "text-amber-800",
    bgColor: "bg-amber-100",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  {
    value: "Diproses",
    label: "Diproses",
    color: "text-blue-800",
    bgColor: "bg-blue-100",
    icon: <Zap className="w-3.5 h-3.5" />,
  },
  {
    value: "Selesai",
    label: "Selesai",
    color: "text-emerald-800",
    bgColor: "bg-emerald-100",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
];

export function LaporanTable() {
  const [laporans, setLaporans] = useState<Laporan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusModal, setStatusModal] = useState<{
    id: string;
    isOpen: boolean;
  }>({ id: "", isOpen: false });
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedLaporan, setSelectedLaporan] = useState<Laporan | null>(null);

  useEffect(() => {
    fetchLaporans();
  }, []);

  const fetchLaporans = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/laporan");
      if (!response.ok) throw new Error("Gagal mengambil data");
      const data = await response.json();
      setLaporans(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: LaporanStatus) => {
    try {
      setUpdatingId(id);
      const response = await fetch(`/api/laporan/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Gagal mengubah status");
      setStatusModal({ id: "", isOpen: false });
      fetchLaporans();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Gagal mengubah status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus laporan ini?")) return;
    try {
      const response = await fetch(`/api/laporan/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Gagal menghapus");
      fetchLaporans();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusOption = (status: LaporanStatus): StatusOption => {
    return (
      STATUS_OPTIONS.find((opt) => opt.value === status) || STATUS_OPTIONS[0]
    );
  };

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
        <p className="text-gray-600 ml-6">
          Pantau semua laporan sampah liar yang telah masuk
        </p>
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
          <p className="text-gray-600 text-lg font-semibold">
            Belum ada laporan sampah
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Silakan submit laporan baru menggunakan form di atas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {laporans.map((laporan, index) => (
            <div
              key={laporan.id}
              onClick={() => setSelectedLaporan(laporan)}
              className="group relative bg-white rounded-2xl shadow-soft hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-300 overflow-hidden hover:scale-105 transform animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-accent-gold" />

              <div className="p-6 space-y-5">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <select
                    value={laporan.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleUpdateStatus(
                        laporan.id,
                        e.target.value as LaporanStatus,
                      )
                    }
                    disabled={updatingId === laporan.id}
                    className={`outline-none cursor-pointer inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                      laporan.status === "Menunggu"
                        ? "bg-amber-100 text-amber-800"
                        : laporan.status === "Diproses"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                  {updatingId === laporan.id && (
                    <Loader className="w-4 h-4 text-gray-400 animate-spin" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Pelapor */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                      <User className="w-3.5 h-3.5" />
                      <span>Pelapor</span>
                    </div>
                    <p className="text-base font-bold text-gray-900">
                      {laporan.nama_pelapor}
                    </p>
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
                      {new Date(laporan.tanggal_laporan).toLocaleDateString(
                        "id-ID",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-100 flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLaporan(laporan);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl font-medium hover:from-blue-100 hover:to-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Info className="w-4 h-4" />
                    <span>Lihat Detail</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(laporan.id);
                    }}
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

      {/* Modal Detail Laporan */}
      {selectedLaporan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-dark-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedLaporan(null)}
          ></div>

          {/* Modal Content */}
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 animate-slide-up">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between z-20">
              <h3 className="text-xl font-bold text-gray-900">
                Detail Laporan
              </h3>
              <button
                onClick={() => setSelectedLaporan(null)}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Gambar Laporan */}
              <div className="w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner">
                {selectedLaporan.foto_url ? (
                  <img
                    src={selectedLaporan.foto_url}
                    alt="Foto laporan"
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Info className="w-12 h-12 mb-3 opacity-50" />
                    <p>Tidak ada foto yang dilampirkan</p>
                  </div>
                )}
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status Laporan
                    </span>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                          selectedLaporan.status === "Menunggu"
                            ? "bg-amber-100 text-amber-800"
                            : selectedLaporan.status === "Diproses"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {selectedLaporan.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      <User className="w-3.5 h-3.5" /> Pelapor
                    </span>
                    <p className="text-gray-900 font-medium">
                      {selectedLaporan.nama_pelapor}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      <Clock className="w-3.5 h-3.5" /> Waktu Pelaporan
                    </span>
                    <p className="text-gray-900 font-medium text-sm">
                      {new Date(selectedLaporan.tanggal_laporan).toLocaleString(
                        "id-ID",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      <MapPin className="w-3.5 h-3.5" /> Lokasi
                    </span>
                    <p className="text-gray-900 font-medium text-sm">
                      {selectedLaporan.lokasi}
                    </p>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div className="pt-4 border-t border-gray-100">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Deskripsi Detail
                </span>
                <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm whitespace-pre-wrap leading-relaxed shadow-inner">
                  {selectedLaporan.deskripsi ? (
                    selectedLaporan.deskripsi
                  ) : (
                    <span className="italic text-gray-400">
                      Tidak ada deskripsi tambahan..
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
              <button
                onClick={() => setSelectedLaporan(null)}
                className="w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
