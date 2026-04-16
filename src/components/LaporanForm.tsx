"use client";

import { useState } from "react";
import { Upload, AlertCircle, CheckCircle2, MapPin, User } from "lucide-react";

interface LaporanFormProps {
  onSuccess?: () => void;
}

export function LaporanForm({ onSuccess }: LaporanFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("/api/laporan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Gagal mengirim laporan");

      setSuccess(true);
      setFileName(null);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSuccess(false), 3000);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 border border-dark-200">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-primary-700 rounded-full" />
          <h2 className="text-3xl font-bold text-dark-900">
            Laporkan Sampah Liar
          </h2>
        </div>
        <p className="text-dark-600 ml-6">
          Bantu kami menjaga kebersihan lingkungan dengan melaporkan lokasi
          sampah
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Pelapor */}
          <div className="space-y-2">
            <label
              htmlFor="nama"
              className="flex items-center gap-2 text-sm font-semibold text-dark-900"
            >
              <User className="w-4 h-4 text-primary-700" />
              Nama Pelapor
            </label>
            <input
              id="nama"
              name="nama_pelapor"
              type="text"
              required
              placeholder="Masukkan nama Anda"
              className="w-full px-4 py-3 rounded-lg border border-dark-200 bg-white focus:border-primary-700 focus:ring-2 focus:ring-primary-700/10 outline-none transition-all placeholder:text-dark-400"
            />
          </div>

          {/* Lokasi */}
          <div className="space-y-2">
            <label
              htmlFor="lokasi"
              className="flex items-center gap-2 text-sm font-semibold text-dark-900"
            >
              <MapPin className="w-4 h-4 text-primary-700" />
              Lokasi Sampah
            </label>
            <input
              id="lokasi"
              name="lokasi"
              type="text"
              required
              placeholder="Contoh: Jl. Merdeka No. 5"
              className="w-full px-4 py-3 rounded-lg border border-dark-200 bg-white focus:border-primary-700 focus:ring-2 focus:ring-primary-700/10 outline-none transition-all placeholder:text-dark-400"
            />
          </div>
        </div>

        {/* Deskripsi */}
        <div className="space-y-2">
          <label
            htmlFor="deskripsi"
            className="text-sm font-semibold text-dark-900"
          >
            Deskripsi Laporan (Opsional)
          </label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            rows={4}
            placeholder="Detail tambahan (misal: sampah sudah menumpuk 3 hari...)"
            className="w-full px-4 py-3 rounded-lg border border-dark-200 bg-white focus:border-primary-700 focus:ring-2 focus:ring-primary-700/10 outline-none transition-all placeholder:text-dark-400 resize-none"
          ></textarea>
        </div>

        {/* Foto */}
        <div className="space-y-2">
          <label
            htmlFor="foto"
            className="flex items-center gap-2 text-sm font-semibold text-dark-900"
          >
            <Upload className="w-4 h-4 text-primary-700" />
            Foto Sampah (Wajib)
          </label>
          <div className="relative">
            <input
              id="foto"
              name="foto"
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="foto"
              className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-dark-300 rounded-lg cursor-pointer hover:border-primary-700 hover:bg-primary-50 transition-all duration-300 group"
            >
              <div className="text-center">
                <Upload className="w-10 h-10 text-dark-400 mx-auto mb-3 group-hover:text-primary-700 transition-colors" />
                <span className="text-sm font-medium text-dark-700">
                  {fileName
                    ? `📷 ${fileName}`
                    : "Klik untuk upload atau drag & drop"}
                </span>
                <span className="text-xs text-dark-500 mt-2 block">
                  Max 16MB (JPG, PNG, GIF)
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex gap-3 p-4 bg-red-50 border border-red-300 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="flex gap-3 p-4 bg-accent-green/10 border border-accent-green/30 rounded-lg animate-slide-up">
            <div className="w-5 h-5 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-sm text-accent-green font-medium">
              Laporan berhasil dikirim! Terima kasih atas kontribusi Anda.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Mengirim...
            </span>
          ) : (
            "Kirim Laporan"
          )}
        </button>
      </form>
    </div>
  );
}
